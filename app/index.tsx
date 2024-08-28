import { router } from "expo-router"
import { View, StyleSheet } from "react-native"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { FormControl } from "@/components/ui/form-control"
import { Input, InputField } from "@/components/ui/input"
import { Link } from "@/components/ui/link"
import { Text } from "@/components/ui/text"
import { Image } from "@/components/ui/image"
import logoteste from './assets/logoteste.png'

export default function Login() {

    const handleLogin = () => {
        router.replace('home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Faça login em sua conta
            </Text>
            <Image size="xl" source={logoteste} alt="logoteste"/>
            {/*Tirar dúvidas sobre a importação de imagens*/}
            <Box style={styles.login}>
            {/*Tirar dúvidas sobre a centralização de login*/}
                <FormControl style={styles.formControl}>
                    <Text style={styles.formControlText}>Usuário</Text>
                    <Input style={styles.input}>
                        <InputField placeholder="Insira seu usuário"></InputField>
                    </Input>
                </FormControl>
                <FormControl style={styles.formControl}>
                    <Text style={styles.formControlText} >Senha</Text>
                    <Input style={styles.input}>
                        <InputField placeholder="Insira sua senha"></InputField>
                    </Input>
                </FormControl>
                <Link style={styles.link} href=''> Esqueceu sua senha?</Link>
            </Box>
            <Button onPress={handleLogin}>
                <ButtonText style={styles.button}>
                    Entrar
                </ButtonText>
            </Button>
            <View style={styles.spacer}/>
            <Box style={styles.cadastro}>
                <Link href=''>Ainda não tem sua conta? Cadastre-se agora</Link>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center'
    },
    login: {
        alignItems: 'center',
        backgroundColor: '#0000000'
    },
    text: {
        fontFamily: "arial",
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        marginTop: 5
    },
    formControl: {
        marginTop: 5
    },
    formControlText: {
        fontFamily: "arial"
    },
    input: {
        fontFamily: "arial",
        marginTop: 3,
        width: 200,
        height: 22,
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
        shadowRadius: 1
    },
    button: {
        fontSize: 18,
        marginTop: 10,
        borderRadius: 5,
        //borderWidth: 1,
        shadowRadius: 1,
        backgroundColor: "",
        width: 80,
        textAlign: 'center'
    },
    link: {
        marginTop: 3,
        fontFamily: 'arial',
        fontSize: 12,
        textAlign: 'center'
    },
    cadastro: {
        alignItems: 'center'
    },
    spacer: {
        flex: 1
    }
})