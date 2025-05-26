import { signIn } from "@/components/login-functions/login";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View, Image, TextInput, StyleSheet, Pressable } from "react-native";
import UserCliQuery from "@/components/firestore-query/userCli";
import UserProvQuery from "@/components/firestore-query/userProv";
import { useUser } from "@/contexts/userContext";

interface UserData {
  [key: string]: any
}

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false)

  const handleLoginClient = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const uid = await signIn(email, password);
      let user = await UserCliQuery.getUser(uid);

      if (user) {
        setUser({ uid, email, uType: 'cli', ...user });
        router.push('/content/home');
      } else {
        const provUser = await UserProvQuery.getUser(uid) as UserData
        if (provUser) {
          router.push({
            pathname: '/criarusuario',
            params: {
              uid,
              email,
              name: provUser.name,
              cpf: provUser.cpf,
              cnh: provUser.cnh,
              existingUType: 'prov',
              targetUType: 'cli',
            },
          });
        } else {
          router.push({
            pathname: '/criarusuario',
            params: {
              uid,
              email,
              targetUType: 'cli',
            },
          });
        }
      }
    } catch (e: any) {
      setError('Erro ao fazer login: ' + e.message);
    } finally {
      setLoading(false)
    }
  };

  const handleLoginProvider = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const uid = await signIn(email, password);
      let user = await UserProvQuery.getUser(uid);

      if (user) {
        setUser({ uid, email, uType: 'prov', ...user });
        router.push('/content/home');
      } else {
        const cliUser = await UserCliQuery.getUser(uid) as UserData
        if (cliUser) {
          router.push({
            pathname: '/criarusuario',
            params: {
              uid,
              email,
              name: cliUser.name,
              cpf: cliUser.cpf,
              cnh: cliUser.cnh,
              existingUType: 'cli',
              targetUType: 'prov',
            },
          });
        } else {
          router.push({
            pathname: '/criarusuario',
            params: {
              uid,
              email,
              targetUType: 'prov',
            },
          });
        }
      }
    } catch (e: any) {
      setError('Erro ao fazer login: ' + e.message);
    } finally {
      setLoading(false)
    }
  };


  return (
    <View style={styles.view}>
      <Image source={require('@/assets/images/logo.png')} style={{ alignSelf: 'center', height: 75, width: 75 }} />
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
        <View style={styles.buttonRow}>
          <Pressable style={({ pressed }) => [styles.botaoFlex, pressed && { backgroundColor: "#ddd" }]} onPress={handleLoginClient}>
            <Text style={[styles.textoBotao]}>Cliente</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [
            styles.botaoFlex,
            pressed && { backgroundColor: "#ddd" }
          ]} onPress={handleLoginProvider}>
            <Text style={[styles.textoBotao]}>Provedor</Text>
          </Pressable>
        </View>
      </View>
      <Link href="./forgotPassword" asChild>
        <Pressable>
          <Text style={[styles.texto, { fontSize: 15, marginTop: 30 }]}>Esqueci a senha!</Text>
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
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  botaoFlex: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingVertical: 10,
    alignItems: "center",

  },
  textoBotao: {
    fontSize: 18,
    textAlign: 'center',
    width: 75,
    borderRadius: 5,
    fontWeight: 'bold',
  },
});
