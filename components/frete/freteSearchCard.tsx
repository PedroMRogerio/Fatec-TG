import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native"
import { Picker } from "@react-native-picker/picker"
import FreteQuery from "@/components/firestore-query/frete"
import { Timestamp } from "firebase/firestore"
import { Dimensions } from "react-native"
import { getEndereco } from "@/components/maps/address-name"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { CardColor, CardColor2 } from "./cardColor"
import { freteCardsStyle } from "../styles/colorStyles"
import VehicleQuery from "@/components/firestore-query/vehicle"
import { useUser } from "@/contexts/userContext"

const { width } = Dimensions.get("window")

interface FreteItem {
    id: string
    date?: Timestamp
    [key: string]: any
}

interface VehicleItem {
    id: string
    [key: string]: any
}

export function FreteSearchCard() {
    const [fretes, setFretes] = useState<FreteItem[]>([])
    const [loading, setLoading] = useState(true)
    const [vehicles, setVehicles] = useState<VehicleItem[]>([])
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null)
    const [vehicleLoading, setVehicleLoading] = useState(true)
    const router = useRouter()
    const { user } = useUser() // pega o usuário logado

    useEffect(() => {
        const fetchVehicles = async () => {
            if (!user?.uid) return
            try {
                const results = await VehicleQuery.getVehicle(user.uid)
                setVehicles(results)
            } catch (err) {
                console.error("Erro ao buscar veículos:", err)
            } finally {
                setVehicleLoading(false)
            }
        }

        fetchVehicles()
    }, [user])

    useEffect(() => {
        const fetchFretes = async () => {
            if (!selectedVehicle) return
            setLoading(true)
            try {
                const results = await FreteQuery.getFreteAll(selectedVehicle.type)

                const fretesComEndereco = await Promise.all(
                    results.map(async (frete: FreteItem) => {
                        let endereco = "Coordenadas não disponíveis"
                        if (frete.dst && Array.isArray(frete.dst) && frete.dst.length >= 2) {
                            endereco = await getEndereco(frete.dst[0], frete.dst[1])
                        }
                        return { ...frete, endereco }
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
    }, [selectedVehicle])

    function statusName(status: string) {
        switch (status) {
            case "closed":
                return "Concluído"
            case "ok":
                return "Preparado"
            case "open":
                return "Procurando provedor..."
            case "cancel":
                return "Cancelado"
            case "overdue":
                return "Vencido"
            default:
                return "Indefinido"
        }
    }

    function formatDate(date: Timestamp | string | undefined): string {
        try {
            if (!date) return "Data inválida"
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

    if (vehicleLoading) {
        return <ActivityIndicator style={{ marginTop: 20 }} />
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Selecione um veículo:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedVehicle?.id || ""}
                    onValueChange={(itemValue) => {
                        const vehicle = vehicles.find(v => v.id === itemValue)
                        setSelectedVehicle(vehicle || null)
                    }}
                >
                    <Picker.Item label="-- Escolha um veículo --" value="" />
                    {vehicles.map(vehicle => (
                        <Picker.Item
                            key={vehicle.id}
                            label={vehicle?.plate || "Veículo"}
                            value={vehicle.id}
                        />
                    ))}
                </Picker>
            </View>

            {loading && selectedVehicle && <ActivityIndicator style={{ marginTop: 20 }} />}

            {!loading && selectedVehicle && fretes.map((frete) => (
                <Pressable
                    key={frete.id}
                    onPress={() =>
                        router.push({
                            pathname: "/content/frete-view",
                            params: {
                                ...frete,
                                date: frete.date?.toDate().toISOString(),
                                veiculoSelecionado: JSON.stringify(selectedVehicle),
                            },
                        })
                        
                    }
                >
                    <View style={freteCardsStyle.default}>
                        <LinearGradient
                            colors={CardColor2(frete.status)}
                            locations={[0, 0.02, 0.98, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[StyleSheet.absoluteFillObject]}
                        />

                        <LinearGradient
                            colors={CardColor(frete.status)}
                            locations={[0, 0.1, 0.9, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[StyleSheet.absoluteFillObject]}
                        />

                        <Text style={styles.title}>{frete.endereco}</Text>
                        <Text style={styles.date}>{formatDate(frete.date)}</Text>
                        <Text style={[styles.date, { fontWeight: "bold" }]}>
                            {statusName(frete.status)}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 1,
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        fontSize: 15,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
    },
    pickerContainer: {
        marginBottom: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        overflow: "hidden",
    },
})
