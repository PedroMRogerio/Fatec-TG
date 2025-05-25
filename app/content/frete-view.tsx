import RouteMap from "@/components/maps/route-map"
import React, { useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { IAddress } from "@/components/interfaces/schedule"
import { useUser } from "@/contexts/userContext"
import FreteQuery from "@/components/firestore-query/frete"

export default function FreteView() {
    const params = useLocalSearchParams()
    const router = useRouter()
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const [distance, setDistance] = useState<number | null>(null)

    // Desserializar valores básicos
    const id = typeof params.id === 'string' ? params.id : ''
    const status = typeof params.status === 'string' ? params.status : ''
    const dateString = typeof params.date === 'string' ? params.date : ''
    const date = dateString ? new Date(dateString) : undefined
    const price = typeof params.price === 'string' ? params.price : ''

    // Coordenadas de origem e destino
    const org = typeof params.org === 'string' ? params.org.split(',') : []
    const dst = typeof params.dst === 'string' ? params.dst.split(',') : []

    const origin: IAddress = {
        lat: Number(org[0]) || 0,
        lng: Number(org[1]) || 0,
    }

    const destination: IAddress = {
        lat: Number(dst[0]) || 0,
        lng: Number(dst[1]) || 0,
    }

    interface IVeiculo {
        id: string
        uid: string
        [key: string]: any
    }

    let veiculoSelecionado: IVeiculo | null = null
    try {
        if (typeof params.veiculoSelecionado === 'string') {
            veiculoSelecionado = JSON.parse(params.veiculoSelecionado) as IVeiculo
        }
    } catch (error) {
        console.warn("Erro ao desserializar veículo:", error)
    }
    try {
        if (typeof params.veiculoSelecionado === 'string') {
            veiculoSelecionado = JSON.parse(params.veiculoSelecionado)
        }
    } catch (error) {
        console.warn("Erro ao desserializar veículo:", error)
    }

    const { height } = Dimensions.get('window')
    const mapHeight = height * 0.65

    async function CancelFrete() {
        if (loading) return
        setLoading(true)
        try {
            await FreteQuery.updateFreteStatus(id, 'cancel')
            alert('Frete Cancelado!')
            router.push('/content/home')
        } catch (e) {
            console.log('ERRO: ' + e)
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmFrete = () => {

        Alert.alert(
            "Confirmar Frete",
            "Distância: " + (distance ? distance : 1).toFixed(1) + "km\n" +
            "Preço: R$" + (veiculoSelecionado?.fixedPrice + (veiculoSelecionado?.variablePrice * (distance ? distance : 1))).toFixed(2),
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Confirmar", onPress: ProvConfirmFrete },
            ]
        )
    }
    async function ProvConfirmFrete() {
        if (loading) return
        setLoading(true)
        let cost: number = (veiculoSelecionado?.fixedPrice + (veiculoSelecionado?.variablePrice * (distance ? distance : 1))).toFixed(2)
        try {
            await FreteQuery.ConfirmFreteProv(id, user?.uid ? user.uid : '', veiculoSelecionado?.plate, cost)

            alert('Frete Confirmado!')
            router.push('/content/home')
        } catch (e) {
            console.log('ERRO: ' + e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mapContainer, { height: mapHeight }]}>
                <RouteMap
                    origin={origin}
                    destination={destination}
                    onDistanceChange={setDistance}
                />
            </View>
            {price == null && (
            <View style={styles.infoContainer}>
                <Text style={styles.priceLabel}>Preço do Frete: R$</Text>
                <Text style={styles.priceText}>{price}</Text>
            </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => {router.back()}}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>

                {user?.uType === 'prov' && status === 'open' && (
                    <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirmFrete}>
                        <Text style={styles.confirmButtonText}>Confirmar Frete</Text>
                    </TouchableOpacity>
                )}

                {user?.uType === 'cli' && status !== 'cancel' && status !== 'overdue' && status !== 'closed' &&(
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={CancelFrete}>
                        <Text style={styles.confirmButtonText}>Cancelar Frete</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
    mapContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 3,
    },
    infoContainer: {
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    backButton: {
        backgroundColor: '#eee',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    cancelButton: {
        backgroundColor: '#E83256',
    },
    backButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    priceText: {
        fontSize:18,
        fontWeight:'bold',
        marginLeft:5,
    },
    priceLabel: {
        fontSize:15,
        marginLeft:5,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})
