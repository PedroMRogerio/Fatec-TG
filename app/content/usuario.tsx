import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { useUser } from "@/contexts/userContext"
import VehicleQuery from "@/components/firestore-query/vehicle"
import { useRouter } from "expo-router"

interface IVehicle {
    id: string
    [key: string]: any
}

export default function Usuario() {
    const { user } = useUser()
    const [vehicles, setVehicles] = useState<IVehicle[]>([])
    const router = useRouter()

    function vType(type: string) {
        switch (type) {
            case "large":
                return "Grande"
            case "medium":
                return "Médio"
            case "small":
                return "Pequeno"
            default:
                return "???"
        }
    }

    useEffect(() => {
        const fetchVehicles = async () => {
            if (user?.uid) {
                const result = await VehicleQuery.getVehicle(user.uid)
                setVehicles(result)
            }
        }
        fetchVehicles()
    }, [user])

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Usuário não encontrado no contexto.</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Informações do Usuário</Text>

            <View style={styles.infoBlock}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{user.name}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>

                <Text style={styles.label}>CPF:</Text>
                <Text style={styles.value}>{user.cpf}</Text>

                {user.uType === 'prov' && (
                    <>
                        <Text style={styles.label}>CNH:</Text>
                        <Text style={styles.value}>{user.cnh}</Text>
                    </>
                )}
            </View>
            {user.uType === 'prov' && (
                <View>
                    <Text style={styles.subtitle}>Veículos</Text>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <Pressable
                                key={vehicle.id}
                                style={styles.vehicleCard}
                                onPress={() =>
                                    router.push({
                                        pathname: "/content/editarVeiculo",
                                        params: { ...vehicle },
                                    })
                                }
                            >
                                <Text style={styles.label}>Placa: <Text style={styles.value}>{vehicle.plate}</Text></Text>
                                <Text style={styles.label}>Tipo: <Text style={styles.value}>{vType(vehicle.type)}</Text></Text>
                                <Text style={styles.label}>Dimensão (m): <Text style={styles.value}>{vehicle.size}</Text></Text>
                                <Text style={styles.label}>Preço Fixo: <Text style={styles.value}>{vehicle.fixedPrice.toFixed(2)}</Text></Text>
                                <Text style={styles.label}>Preço por Km: <Text style={styles.value}>{vehicle.variablePrice.toFixed(2)}</Text></Text>
                            </Pressable>
                        ))
                    ) : (
                        <Text style={styles.value}>Nenhum veículo encontrado.</Text>
                    )}
                    <Pressable style={styles.backButton} onPress={() => router.push({pathname:'/content/criarVeiculo'})}>
                        <Text style={styles.backButtonText}>Adicionar Veículo</Text>
                    </Pressable>

                </View>
            )}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
    },
    infoBlock: {
        borderWidth: 0.3,
        borderColor: '#808080',
        backgroundColor: "#f2f2f2",
        padding: 15,
        borderRadius: 8,
    },
    label: {
        fontWeight: "600",
        fontSize: 16,
        marginTop: 8,
    },
    value: {
        fontWeight: "400",
        fontSize: 16,
    },
    vehicleCard: {
        borderWidth: 0.3,
        borderColor: '#808080',
        padding: 12,
        borderRadius: 6,
        marginBottom: 10,
    },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
    backButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: "#ccc",
        borderRadius: 6,
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
})
