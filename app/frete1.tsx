import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AddressInput from "@/components/maps/address-input";
import 'react-native-get-random-values';

export default function Frete1() {
    const [selectedAddress1, setSelectedAddress1] = useState<string | null>(null);
    const [location1, setLocation1] = useState<{ lat: number; lng: number } | null>(null);

    const [selectedAddress2, setSelectedAddress2] = useState<string | null>(null);
    const [location2, setLocation2] = useState<{ lat: number; lng: number } | null>(null);

    return (
        <View style={styles.container}>
            <AddressInput
                onAddressSelected={(address, loc) => {
                    setSelectedAddress1(address)
                    setLocation1(loc)
                }}
            />
            <AddressInput
                onAddressSelected={(address, loc) => {
                    setSelectedAddress2(address)
                    setLocation2(loc)
                }}
            />
            {selectedAddress1 && location1 && (
                <View style={styles.result}>
                    <Text>📍 Endereço: {selectedAddress1}</Text>
                    <Text>🌍 Latitude: {location1.lat}</Text>
                    <Text>🌍 Longitude: {location1.lng}</Text>
                </View>
            )}
            {selectedAddress2 && location2 && (
                <View style={styles.result}>
                    <Text>📍 Endereço: {selectedAddress2}</Text>
                    <Text>🌍 Latitude: {location2.lat}</Text>
                    <Text>🌍 Longitude: {location2.lng}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    result: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#eee",
        borderRadius: 5,
    },
});

