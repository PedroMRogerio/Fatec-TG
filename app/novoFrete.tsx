import NovoFreteForm from "@/components/frete/novoFreteForm";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";

export default function NovoFrete() {
    return (
        <View style={styles.container}>
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
