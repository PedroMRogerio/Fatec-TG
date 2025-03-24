import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AddressInput from "@/components/maps/address-input";
import 'react-native-get-random-values';

export default function Frete1() {
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    return (
        <View style={styles.container}>
            <AddressInput
                onAddressSelected={(address, loc) => {
                    setSelectedAddress(address);
                    setLocation(loc);
                }}
            />
            {selectedAddress && location && (
                <View style={styles.result}>
                    <Text>📍 Endereço: {selectedAddress}</Text>
                    <Text>🌍 Latitude: {location.lat}</Text>
                    <Text>🌍 Longitude: {location.lng}</Text>
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

