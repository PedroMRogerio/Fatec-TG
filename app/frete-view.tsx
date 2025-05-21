import RouteMap from "@/components/maps/route-map";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { IEnd } from '@/components/maps/mockup-endereco/endereco'

export default function FreteView() {
    const params = useLocalSearchParams();

    const org = typeof params.org === 'string' ? params.org.split(',') : []
    const dst = typeof params.dst === 'string' ? params.dst.split(',') : []

    const origin: IEnd = {
        lat: Number(org[0]),
        lng: Number(org[1]),
    }
    const destination: IEnd = {
        lat: Number(dst[0]),
        lng: Number(dst[1]),
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>ID: {params.id}</Text>
                <Text>Endereço: {params.endereco}</Text>
                <Text>Data: {params.date}</Text>
            </View>
            <RouteMap origin={origin} destination={destination} />
        </SafeAreaView>
    );
};