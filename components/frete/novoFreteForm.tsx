import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import AddressInput from "../maps/address-input";
import React, { useState } from "react";
import 'react-native-get-random-values';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/contexts/userContext";
import { db } from "@/helpers/firebaseConfig";
import { router } from "expo-router";

export default function NovoFreteForm() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false)

    const [selectedAddress1, setSelectedAddress1] = useState<string | null>(null);
    const [location1, setLocation1] = useState<{ lat: number; lng: number } | null>(null);

    const [selectedAddress2, setSelectedAddress2] = useState<string | null>(null);
    const [location2, setLocation2] = useState<{ lat: number; lng: number } | null>(null);

    const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large" | null>(null);
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (selectedDate: Date) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const timestamp = Timestamp.fromDate(date);

    const handleCreateFrete = async () => {
        if (!location1 || !location2 || !selectedSize || !user) {
            Alert.alert("Erro", "Preencha todos os campos antes de criar o frete.");
            return;
        }

        const freteData = {
            org: [location1.lat, location1.lng],
            dst: [location2.lat, location2.lng],
            type: selectedSize,
            date: timestamp,
            uid: user.uid,
            status: 'open',
            crtDate: Timestamp.now()
        };
        if (loading) return;
        setLoading(true);
        try {
            await addDoc(collection(db, "Frete"), freteData);
            Alert.alert("Sucesso", "Frete criado com sucesso!");
            router.push('/content/home')
        } catch (error) {
            console.error("Erro ao criar frete: ", error);
            Alert.alert("Erro", "Não foi possível criar o frete.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={[styles.section, { overflow: 'visible' }]}>
                    <Text style={styles.label}>Selecione a origem:</Text>
                    <AddressInput onAddressSelected={(address, loc) => {
                        setSelectedAddress1(address);
                        setLocation1(loc);
                    }} />
                </View>

                <View style={[styles.section, { overflow: 'visible' }]}>
                    <Text style={styles.label}>Selecione o destino:</Text>
                    <AddressInput onAddressSelected={(address, loc) => {
                        setSelectedAddress2(address);
                        setLocation2(loc);
                    }} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Selecione o tamanho do frete:</Text>
                    <View style={styles.sizeContainer}>
                        {["small", "medium", "large"].map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    styles.sizeOption,
                                    selectedSize === size && styles.selectedSizeOption
                                ]}
                                onPress={() => setSelectedSize(size as "small" | "medium" | "large")}
                            >
                                <Image
                                    source={
                                        size === "small"
                                            ? require("@/assets/images/small.png")
                                            : size === "medium"
                                                ? require("@/assets/images/medium.png")
                                                : require("@/assets/images/large.png")
                                    }
                                    style={styles.sizeImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.sizeLabel}>
                                    {size === "small" ? "Pequeno" : size === "medium" ? "Médio" : "Grande"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Selecione a data e hora:</Text>
                    <Pressable onPress={showDatePicker} style={styles.dateButton}>
                        <Text style={styles.dateText}>{date.toLocaleString("pt-BR")}</Text>
                    </Pressable>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>

                <Pressable style={styles.backButton} onPress={handleCreateFrete}>
                    <Text style={styles.backButtonText}>Criar Frete</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    sizeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sizeOption: {
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        backgroundColor:'#fff',
        borderColor: "#ccc",
        borderRadius: 8,
        width: "30%",
    },
    selectedSizeOption: {
        borderColor: "#007AFF",
        backgroundColor: "#e0f0ff",
    },
    sizeImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    sizeLabel: {
        fontSize: 14,
        fontWeight: "600",
    },
    dateButton: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 6,
        alignItems: "center",
    },
    dateText: {
        fontSize: 16,
    },
    backButton: {
        padding: 12,
        backgroundColor: "white",
        borderRadius: 6,
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});
