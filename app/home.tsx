import { Link } from "expo-router";
import { View, StyleSheet, Text, Pressable, ScrollView, Image, Dimensions } from "react-native";
import { useUser } from "@/contexts/userContext";
import FreteCardList from "@/components/frete/freteCard";
import ProvCardList from "@/components/frete/provCard";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";

import userButton from "@/assets/images/userButton.png";
import newFreteButton from "@/assets/images/newFreteButton.png";
import searchButton from "@/assets/images/searchButton.png"
import configButton from "@/assets/images/configButton.png";

const { width } = Dimensions.get("window");

export default function Home() {
    const { user } = useUser();
    const [refreshKey, setRefreshKey] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setRefreshKey(prev => prev + 1);
        }, [])
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titulo}>
                    Bem vindo{user?.name ? `, ${user.name}` : ' Usuário'}!
                </Text>

                <View style={styles.sublinha}></View>
                <Text style={styles.subtitulo}>Fretes:</Text>

                {user?.uType === 'prov' && (
                    <ProvCardList uid={user?.uid ? user.uid : ''} refreshKey={refreshKey} />
                )}
                {user?.uType === 'cli' && (
                    <FreteCardList uid={user?.uid ? user.uid : ''} refreshKey={refreshKey} />
                )}

                <View style={styles.separador2}></View>
            </ScrollView>

            <View style={styles.view2}>
                <Link href="/usuario" asChild>
                    <Pressable style={styles.botoes}>
                        <Image source={userButton} style={styles.icon} />
                    </Pressable>
                </Link>
                {user?.uType === 'prov' && (
                <Link href="/frete-buscar" asChild>
                    <Pressable style={styles.botoes2}>
                        <Image source={searchButton} style={styles.icon} />
                    </Pressable>
                </Link>
                )}
                {user?.uType === 'cli' && (
                <Link href="/novoFrete" asChild>
                    <Pressable style={styles.botoes2}>
                        <Image source={newFreteButton} style={styles.icon} />
                    </Pressable>
                </Link>
                )}
                <Link href="/config" asChild>
                    <Pressable style={styles.botoes}>
                        <Image source={configButton} style={styles.icon} />
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#EBF5FF'
    },
    scrollContent: {
        padding: 10,
        paddingBottom: 100,
    },
    titulo: {
        fontSize: 22,
        paddingBottom: 8,
    },
    subtitulo: {
        fontSize: 18,
        paddingBottom: 4
    },
    sublinha: {
        borderWidth: 0.25,
        borderColor: '#808080',
        width: '100%'
    },
    separador2: {
        height: 20,
    },
    view2: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#808080',
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    botoes: {
        //borderWidth: 1,
        width: width*0.12,
        height: width*0.12,
        //borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    botoes2: {
        //borderWidth: 1,
        width: width*0.15,
        height: width*0.18,
        //borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
