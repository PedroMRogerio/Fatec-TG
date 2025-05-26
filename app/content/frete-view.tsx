import RouteMap from "@/components/maps/route-map"
import React, { useEffect, useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { IAddress } from "@/components/interfaces/schedule"
import { useUser } from "@/contexts/userContext"
import FreteQuery from "@/components/firestore-query/frete"
import UserCliQuery from "@/components/firestore-query/userCli"
import UserProvQuery from "@/components/firestore-query/userProv"
import { clientStyle, providerStyle } from "@/components/styles/PageStyles"

export default function FreteView() {
    const params = useLocalSearchParams()
    const router = useRouter()
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const [distance, setDistance] = useState<number | null>(null)
    const userStyle = user?.uType === 'prov' ? providerStyle : clientStyle

    const [getUser, setGetUser] = useState<IUser | null>(null)

    const id = typeof params.id === 'string' ? params.id : ''
    const status = typeof params.status === 'string' ? params.status : ''

    let date: Date | undefined = undefined
    if (typeof params.date === 'string') {
        const match = params.date.match(/Timestamp\(seconds=(\d+), nanoseconds=\d+\)/)
        if (match && match[1]) {
            const seconds = Number(match[1])
            date = new Date(seconds * 1000)
        }
    }

    const price = typeof params.price === 'string' ? params.price : ''
    const uid = typeof params.uid === 'string' ? params.uid : ''
    const uidProv = typeof params.uidProv === 'string' ? params.uidProv : ''


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

    interface IUser {
        id: string
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
    const mapHeight = height * 0.55

    useEffect(() => {
        const fetchUserData = async () => {
            let results
            try {
                if (user?.uType === 'prov') {results = await UserCliQuery.getUser(uid)}
                else {results = await UserProvQuery.getUser(uidProv)}
                setGetUser(results)
            } catch (err) {
                console.error("Erro ao buscar veículos:", err)
            }
        }

        fetchUserData()
    }, [])


    const handleCloseFrete = () => {

        Alert.alert(
            "Frete Entregue",
            "O frete chegou ao destino?",

            [
                { text: "Sim", onPress: CloseFrete },
                { text: "Não", style: "cancel" },
            ]
        )
    }
    async function CloseFrete() {
        if (loading) return
        setLoading(true)
        try {
            await FreteQuery.updateFreteStatus(id, 'closed')
            alert('Frete Entregue!')
            router.push('/content/home')
        } catch (e) {
            console.log('ERRO: ' + e)
        } finally {
            setLoading(false)
        }
    }

    const handleCancelFrete = () => {

        Alert.alert(
            "Cancelar Frete",
            "Tem certeza que deseja cancelar o frete?",

            [
                { text: "Sim", onPress: CancelFrete },
                { text: "Não", style: "cancel" },
            ]
        )
    }
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

    const handleProvCancelFrete = () => {

        Alert.alert(
            "Cancelar Frete",
            "Tem certeza que deseja cancelar o frete?",

            [
                { text: "Sim", onPress: ProvCancelFrete },
                { text: "Não", style: "cancel" },
            ]
        )
    }
    async function ProvCancelFrete() {
        if (loading) return
        setLoading(true)
        try {
            await FreteQuery.CancelFreteProv(id)
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
                { text: "Confirmar", onPress: ProvConfirmFrete },
                { text: "Cancelar", style: "cancel" },
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

    const handleBeginFrete = () => {

        Alert.alert(
            "Iniciar viagem",
            "Estamos com a carga! Podemos partir?",
            [
                { text: "Confirmar", onPress: ProvBeginFrete },
                { text: "Cancelar", style: "cancel" },
            ]
        )
    }
    async function ProvBeginFrete() {
        if (loading) return
        setLoading(true)
        let cost: number = (veiculoSelecionado?.fixedPrice + (veiculoSelecionado?.variablePrice * (distance ? distance : 1))).toFixed(2)
        try {
            await FreteQuery.updateFreteStatus(id, 'route')

            alert('Frete Confirmado!')
            router.push('/content/home')
        } catch (e) {
            console.log('ERRO: ' + e)
        } finally {
            setLoading(false)
        }
    }


    return (
        <SafeAreaView style={[styles.container, userStyle.container]}>
            <View style={[styles.mapContainer, { height: mapHeight }]}>
                <RouteMap
                    origin={origin}
                    destination={destination}
                    onDistanceChange={setDistance}
                />
            </View>
            {(price !== '' || user?.uType === 'prov') && (
                <View style={styles.infoContainer}>
                    {user?.uType !== 'prov' && (
                        <View style={styles.infoRow}>
                            <Text style={styles.priceLabel}>Preço do Frete: R$</Text>
                            <Text style={styles.priceText}>{price}</Text>
                        </View>
                    )}

                    <View style={styles.infoRow}>
                        <Text style={styles.priceLabel}>Data: </Text>
                        <Text style={styles.priceText}>
                            {date ? date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                        </Text>

                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.priceLabel}>Nome: </Text>
                        <Text style={styles.priceText}>{getUser?.name}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.priceLabel}>Telefone: </Text>
                        <Text style={styles.priceText}>{getUser?.celNumb}</Text>
                    </View>

                </View>
            )}
            <View style={styles.buttonContainer}>

                {/*PROVEDOR ACEITA FRETE*/}
                {user?.uType === 'prov' && status === 'open' && (
                    <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirmFrete}>
                        <Text style={styles.confirmButtonText}>Confirmar Frete</Text>
                    </TouchableOpacity>
                )}

                {/*PROVEDOR CANCELA FRETE*/}
                {user?.uType === 'prov' && status === 'ok' && (
                    <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleProvCancelFrete}>
                        <Text style={styles.confirmButtonText}>Cancelar Frete</Text>
                    </TouchableOpacity>
                )}

                {/*PROVEDOR INICIA VIAGEM ORIGEM -> DESTINO*/}
                {user?.uType === 'prov' && status === 'ok' && (
                    <TouchableOpacity style={[styles.button, styles.routeButton]} onPress={handleBeginFrete}>
                        <Text style={styles.confirmButtonText}>Iniciar Viagem</Text>
                    </TouchableOpacity>
                )}

                {/*CLIENTE CANCELA FRETE*/}
                {user?.uType === 'cli' && status !== 'cancel' && status !== 'overdue' && status !== 'closed' && status !== 'route' && (
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelFrete}>
                        <Text style={styles.confirmButtonText}>Cancelar Frete</Text>
                    </TouchableOpacity>
                )}

                {/*CLIENTE CONFIRMA CONCLUSAO FRETE*/}
                {user?.uType === 'cli' && status === 'route' && (
                    <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleCloseFrete}>
                        <Text style={styles.confirmButtonText}>Confirmar Entrega</Text>
                    </TouchableOpacity>
                )}

                {/*<TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => console.log('params.date:', params.date)}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>*/}

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
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderWidth: 2,
    },
    infoRow: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
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
    routeButton: {
        backgroundColor: '#0050E5',
    },
    cancelButton: {
        backgroundColor: '#E83256',
    },
    backButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    priceLabel: {
        fontSize: 15,
        marginLeft: 5,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})