import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/helpers/firebaseConfig";
import { Picker } from "@react-native-picker/picker";

export default function EditarVeiculo() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, plate, size, type, fixedPrice, variablePrice } = params as any;
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    size,
    type,
    fixedPrice: parseFloat(fixedPrice),
    variablePrice: parseFloat(variablePrice),
  });

  const handleConfirmSave = () => {
    Alert.alert(
      "Confirmar alteração",
      "Tem certeza que deseja salvar as alterações?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Salvar", onPress: handleSave },
      ]
    );
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const ref = doc(db, "Vehicle", id);
      await updateDoc(ref, {
        size: form.size,
        type: form.type,
        fixedPrice: form.fixedPrice,
        variablePrice: form.variablePrice,
      });
      Alert.alert("Sucesso", "Veículo atualizado!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar veículo.");
    } finally{
      setLoading(false)
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Veículo</Text>

      <Text style={styles.label}>Placa:</Text>
      <Text style={styles.readOnly}>{plate}</Text>

      <Text style={styles.label}>Tipo:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.type}
          onValueChange={(value) => setForm({ ...form, type: value })}
        >
          <Picker.Item label="Pequeno" value="small" />
          <Picker.Item label="Médio" value="medium" />
          <Picker.Item label="Grande" value="large" />
        </Picker>
      </View>

      <Text style={styles.label}>Dimensão (m):</Text>
      <TextInput
        style={styles.input}
        value={form.size}
        onChangeText={(text) => setForm({ ...form, size: text })}
      />

      <Text style={styles.label}>Preço Fixo:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.fixedPrice)}
        onChangeText={(text) =>
          setForm({ ...form, fixedPrice: parseFloat(text) || 0 })
        }
      />

      <Text style={styles.label}>Preço por Km:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.variablePrice)}
        onChangeText={(text) =>
          setForm({ ...form, variablePrice: parseFloat(text) || 0 })
        }
      />

      <Pressable style={styles.button} onPress={handleConfirmSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 0.3,
    borderColor: '#808080',
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  readOnly: {
    fontSize: 16,
    paddingVertical: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  button: {
    marginTop: 60,
    backgroundColor: "#808080",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
