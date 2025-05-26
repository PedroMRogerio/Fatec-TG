import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native"
import FreteQuery from "@/components/firestore-query/frete"
import { Timestamp } from "firebase/firestore"
import { Dimensions } from "react-native"
import { getEndereco } from "@/components/maps/address-name"
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router"
import { CardColor, CardColor2 } from "./cardColor"
import { freteCardsStyle } from "../styles/CardColorStyles"

const { width, height } = Dimensions.get("window")

interface FreteItem {
    id: string
    date?: Timestamp // ou string
    [key: string]: any
}

interface ProvCardListProps {
    uid: string
    refreshKey: number
}

export default function ProvCardList({ uid, refreshKey }: ProvCardListProps) {
    const [fretes, setFretes] = useState<FreteItem[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    function statusName(status: string) {
        switch (status) {
            case 'closed':
                return 'Concluído'
            case 'ok':
                return 'Preparado'
            case 'open':
                return 'Procurando provedor...'
            case 'cancel':
                return 'Cancelado'
            case 'overdue':
                return 'Vencido'
            case 'route':
                return 'A caminho'
            default:
                return 'Indefinido'
        }
    }

    useEffect(() => {
        const fetchFretes = async () => {
            setLoading(true)
            try {
                const results = await FreteQuery.getFreteProv(uid)

                const fretesComEndereco = await Promise.all(
                    results.map(async (frete: FreteItem) => {
                        let endereco = "Coordenadas não disponíveis"
                        if (frete.dst && Array.isArray(frete.dst) && frete.dst.length >= 2) {
                            endereco = await getEndereco(frete.dst[0], frete.dst[1])
                        }

                        let updatedStatus = frete.status
                        if (frete.date) {
                            const freteDate = frete.date instanceof Timestamp
                                ? frete.date.toDate()
                                : new Date(frete.date)

                            const now = new Date()

                            if (now > freteDate && frete.status !== 'overdue' && frete.status !== 'closed' && frete.status !== 'cancel' && frete.status !== 'route') {
                                updatedStatus = 'overdue'
                                await FreteQuery.updateFreteStatus(frete.id, 'overdue')
                            }
                        }

                        return { ...frete, endereco, status: updatedStatus }
                    })
                )

                fretesComEndereco.sort((a, b) => {
                    const statusOrder = (status: string) => {
                        if (status === 'ok' || status === 'open' || status === 'route') return 1
                        return 0
                    }

                    const aStatus = statusOrder(a.status)
                    const bStatus = statusOrder(b.status)

                    if (aStatus !== bStatus) {
                        return bStatus - aStatus
                    } else {
                        const aDate = a.date
                            ? (a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date))
                            : new Date(0)

                        const bDate = b.date
                            ? (b.date instanceof Timestamp ? b.date.toDate() : new Date(b.date))
                            : new Date(0)

                        return bDate.getTime() - aDate.getTime()
                    }
                })


                setFretes(fretesComEndereco)
            } catch (err) {
                console.error("Erro ao buscar fretes:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchFretes()
    }, [uid, refreshKey])

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 20 }} />
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {fretes.map((frete) => (
                <Pressable key={frete.id} onPress={() =>
                    router.push({
                        pathname: "/content/frete-view",
                        params: { ...frete },
                    })
                }>
                    <View style={freteCardsStyle.default}>
                        {/* Gradiente horizontal */}
                        <LinearGradient
                            colors={CardColor2(frete.status)}
                            locations={[0, 0.02, 0.98, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[StyleSheet.absoluteFillObject]}
                        />

                        {/* Gradiente vertical */}
                        <LinearGradient
                            colors={CardColor(frete.status)}
                            locations={[0, 0.1, 0.9, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[StyleSheet.absoluteFillObject]}
                        />
                        <Text style={styles.title}>{frete.endereco}</Text>
                        <Text style={styles.date}>{formatDate(frete.date ? frete.date : '')}</Text>
                        <Text style={[styles.date, { fontWeight: 'bold' }]}>{statusName(frete.status)}</Text>
                    </View>
                </Pressable>
            ))
            }
        </ScrollView >
    )
}

function formatDate(date: Timestamp | string): string {
    try {
        const jsDate = typeof date === "string" ? new Date(date) : date.toDate()
        return jsDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    } catch {
        return "Data inválida"
    }
}

const styles = StyleSheet.create({
    container: {
        width: width * 1,
        padding: 10,
    },
    card: {
        padding: 15,
        width: width * 0.90,
        borderWidth: 0.85,
        borderRadius: 5,
        borderColor: '#808080',
        marginBottom: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        fontSize: 15,
        marginBottom: 10,
    }
})
