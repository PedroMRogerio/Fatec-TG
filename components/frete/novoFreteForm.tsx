import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import AddressInput from "../maps/address-input";
import React, { useState } from "react";
import 'react-native-get-random-values';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Timestamp } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NovoFreteForm() {
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

                <Pressable style={styles.backButton} onPress={() => {
                    console.log({
                        origem: selectedAddress1,
                        destino: selectedAddress2,
                        coordenadasOrigem: location1,
                        coordenadasDestino: location2,
                        tamanho: selectedSize,
                        data: timestamp,
                    });
                }}>
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
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
        alignItems: "center",
    },
    dateText: {
        fontSize: 16,
    },
    backButton: {
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
