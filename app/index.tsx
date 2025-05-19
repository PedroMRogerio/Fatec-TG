import { signIn } from "@/components/login-functions/login";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View, Image, TextInput, StyleSheet, Pressable } from "react-native";
import UserCliQuery from "@/components/firestore-query/userCli";
import UserProvQuery from "@/components/firestore-query/userProv";
import { useUser } from "@/contexts/userContext";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useUser();

  const handleLoginClient = async () => {
    try {
      const uid = await signIn(email, password);
      const user = await UserCliQuery.getUser(uid);

      if (user) {
        setUser({ uid, email, uType:'cli', ...user });
        router.push('/home');
      } else {
        //router.push('/create-user');
      }
    } catch (e: any) {
      setError('Erro ao fazer login: ' + e.message);
    }
  };

  const handleLoginProvider = async () => {
    try {
      const uid = await signIn(email, password);
      const user = await UserProvQuery.getUser(uid);

      if (user) {
        setUser({ uid, email, uType:'prov', ...user });
        router.push('/home');
      } else {
        //router.push('/create-user');
      }
    } catch (e: any) {
      setError('Erro ao fazer login: ' + e.message);
    }
  };

  return (
    <View style={styles.view}>
      <Image source={require('@/assets/images/teste.png')} style={{ alignSelf: 'center', height: 75, width: 75 }} />
      <View>
        <Text style={styles.titulo}>Faça o login para continuar</Text>
        <Text style={styles.texto}>Login</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Text style={styles.texto}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
        />
        {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
        <View>
          <Pressable style={styles.botao} onPress={handleLoginClient}>
            <Text style={styles.textoBotao}>Entrar como Cliente</Text>
          </Pressable>
          <Pressable style={styles.botao} onPress={handleLoginProvider}>
            <Text style={styles.textoBotao}>Entrar como Provedor</Text>
          </Pressable>
        </View>
      </View>
      <Link href="./forgotPassword" asChild>
        <Pressable>
          <Text style={[styles.texto, { fontSize: 15 }]}>Esqueci a senha!</Text>
        </Pressable>
      </Link>
    </View>
  );
}

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  input: {
    alignSelf: 'center',
    width: "90%",
    fontSize: 15,
    borderWidth: 1,
    paddingTop: 1,
    paddingLeft: 8,
    backgroundColor: "#E4E4E4",
  },
  botao: {
    paddingTop: 20,
    alignSelf: 'center',
  },
  textoBotao: {
    fontSize: 18,
    textAlign: 'center',
    width: 75,
    backgroundColor: "#41ABE9",
    borderRadius: 5,
    fontWeight: 'bold',
  },
});
