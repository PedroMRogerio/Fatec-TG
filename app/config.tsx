import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signOutUser } from "@/components/login-functions/logout";
import { useUser } from "@/contexts/userContext";
import { auth } from "@/helpers/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Config() {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signOutUser();
      setUser(null);
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deslogar.");
    } finally{
      setLoading(false)
  }
  };

  const handlePasswordReset = async () => {
    const email = auth.currentUser?.email;
    if (!email) {
      Alert.alert("Erro", "Não foi possível obter o email do usuário.");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Email enviado", "Verifique sua caixa de entrada para redefinir sua senha.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o email de redefinição.");
    } finally{
      setLoading(false)
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.resetButton} onPress={handlePasswordReset}>
          <Text style={styles.resetButtonText}>Redefinir Senha</Text>
        </Pressable>

        <Pressable style={styles.outButton} onPress={handleSignOut}>
          <Text style={styles.outButtonText}>Sair da Conta</Text>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    width: 200,
    marginBottom: 20,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  outButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: 200,
    marginBottom: 20,
  },
  outButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    width: 200,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
