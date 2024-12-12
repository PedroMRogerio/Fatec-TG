import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import CurrentMaps from '@/components/maps';

export default function TesteMapa() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de acesso à localização foi negada.');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{errorMsg}</Text>
            </View>
        );
    }

    if (!location) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando localização...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CurrentMaps location={location} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});
