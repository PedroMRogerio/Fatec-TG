import LoginGoogle from "@/components/button-login-google/login-google";
import { Link } from "expo-router";
import { Text, View, Image, TextInput, StyleSheet, Pressable } from "react-native";

export default function Index() {

  return (
    <View style={styles.view}>
      <Image source={require('@/assets/images/teste.png')}
        style={{
          alignSelf: 'center',
          height: 75, width: 75
        }} />
      <Text style={styles.titulo}>Faça o login para continuar</Text>
      <Text style={styles.texto}>Login</Text>
      <TextInput style={styles.input} placeholder="Insira seu Login"/>
      <Text style={styles.texto}>Senha</Text>
      <TextInput style={styles.input} placeholder="Insira sua Senha" />
      <Link href="/home" asChild>
        <Pressable style={styles.botao}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </Pressable>
      </Link>
      <LoginGoogle/>
    </View>
  );
}

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  titulo: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  texto: {
    fontSize: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    fontWeight: 'bold'
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
    alignSelf: 'center'
  },
  textoBotao: {
    fontSize: 18,
    //fontWeight: 'bold',
    textAlign: 'center',
    width: 75,
    backgroundColor: "#41ABE9",
    borderRadius: 5,
    fontWeight: 'bold'
  }
})


