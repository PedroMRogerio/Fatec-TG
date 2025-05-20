import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useUser } from "@/contexts/userContext"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { db } from "@/helpers/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

export default function CriarVeiculo() {
  const router = useRouter();
  const {user} = useUser()
  const [form, setForm] = useState({
    plate: "",
    size: "",
    type: "small",
    fixedPrice: 0,
    variablePrice: 0,
    uid: user?.uid
  });
  const handleConfirmSave = () => {
    Alert.alert(
      "Confirmar cadastro",
      "Tem certeza que deseja cadastrar esse veículo?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: handleSave },
      ]
    );
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "Vehicle"), {
        plate: form.plate,
        size: form.size,
        type: form.type,
        fixedPrice: form.fixedPrice,
        variablePrice: form.variablePrice,
        uid: form.uid
      });
      Alert.alert("Sucesso", "Veículo cadastrado!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar veículo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Veículo</Text>

      <Text style={styles.label}>Placa:</Text>
      <TextInput
        style={styles.input}
        value={form.plate}
        onChangeText={(text) => setForm({ ...form, plate: text })}
        placeholder="Digite a placa"
      />

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
        placeholder="Digite o tamanho"
      />

      <Text style={styles.label}>Preço Fixo:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.fixedPrice)}
        onChangeText={(text) =>
          setForm({ ...form, fixedPrice: parseFloat(text) || 0 })
        }
        placeholder="Ex: 50.00"
      />

      <Text style={styles.label}>Preço por Km:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.variablePrice)}
        onChangeText={(text) =>
          setForm({ ...form, variablePrice: parseFloat(text) || 0 })
        }
        placeholder="Ex: 1.50"
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: "#fff",
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
