import { signInWithGoogle } from "@/helpers/auth";
import React, { useState } from "react";
import { View, Button, Text, Image } from "react-native";


export default function LoginGoogle() {
  const [user, setUser] = useState<any>(null);

  async function handleLogin() {
    const userInfo = await signInWithGoogle();
    setUser(userInfo);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Image source={{ uri: user.photoURL }} style={{ width: 50, height: 50, borderRadius: 25 }} />
          <Text>Bem-vindo, {user.displayName}</Text>
        </>
      ) : (
        <Button title="Entrar com Google" onPress={handleLogin} />
      )}
    </View>
  );
}
