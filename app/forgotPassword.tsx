import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/helpers/firebaseConfig";
import { useRouter } from "expo-router";

export default function esqueciSenha() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Erro", "Digite um email válido.");
      return;
    }

    if (loading) return;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Sucesso", "Email de redefinição enviado. Verifique sua caixa de entrada.");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível enviar o email de redefinição.");
    }  finally{
      setLoading(false)
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <Text style={styles.label}>Digite seu email para receber um link de redefinição:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#808080",
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#808080",
    padding: 12,
    borderRadius: 6,
    width: 200,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#808080",
    padding: 12,
    borderRadius: 6,
    width: 200,
    alignItems: "center",
  },
  backButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
});
