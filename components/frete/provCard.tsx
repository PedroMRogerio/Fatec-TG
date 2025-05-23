import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native"
import FreteQuery from "@/components/firestore-query/frete"
import { Timestamp } from "firebase/firestore"
import { Dimensions } from "react-native"
import { getEndereco } from "@/components/maps/address-name"
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router"
import { CardColor, CardColor2 } from "./cardColor"
import { freteCardsStyle } from "../styles/colorStyles"

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

    useEffect(() => {
        const fetchFretes = async () => {
            setLoading(true)
            try {
                const results = await FreteQuery.getFreteProv(uid)

                const fretesComEndereco = await Promise.all(
                    results.map(async (frete: FreteItem) => {
                        if (frete.dst && Array.isArray(frete.dst) && frete.dst.length >= 2) {
                            const endereco = await getEndereco(frete.dst[0], frete.dst[1])
                            return { ...frete, endereco }
                        }
                        return { ...frete, endereco: "Coordenadas não disponíveis" }
                    })
                )

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
                        pathname: "/frete-view",
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
