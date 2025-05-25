import RouteMap from "@/components/maps/route-map"
import React from "react"
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { IAddress } from "@/components/interfaces/schedule"
import { useUser } from "@/contexts/userContext"

export default function FreteView() {
    const params = useLocalSearchParams()
    const router = useRouter()
    const { user } = useUser();

    const org = typeof params.org === 'string' ? params.org.split(',') : []
    const dst = typeof params.dst === 'string' ? params.dst.split(',') : []

    const origin: IAddress = {
        lat: Number(org[0]),
        lng: Number(org[1]),
    }
    const destination: IAddress = {
        lat: Number(dst[0]),
        lng: Number(dst[1]),
    }

    const { height } = Dimensions.get('window')
    const mapHeight = height * 0.75

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.mapContainer, { height: mapHeight }]}>
                <RouteMap origin={origin} destination={destination} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
                {user?.uType === 'prov' && (
                    <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={() => alert('Frete confirmado!')}>
                        <Text style={styles.confirmButtonText}>Confirmar Frete</Text>
                    </TouchableOpacity>
                )}
                {user?.uType === 'cli' && (
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => alert('Frete confirmado!')}>
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
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})
