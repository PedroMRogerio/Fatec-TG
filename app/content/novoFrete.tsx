import NovoFreteForm from "@/components/frete/novoFreteForm";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { clientStyle, providerStyle } from "@/components/styles/PageStyles"
import { useUser } from "@/contexts/userContext";

export default function NovoFrete() {
    const { user } = useUser()
    const userStyle = user?.uType==='prov'? providerStyle : clientStyle
    return (
        <View style={[styles.container, userStyle.container]}>
            <NovoFreteForm />
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 16,
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
});
