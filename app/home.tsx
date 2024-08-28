import { View, StyleSheet } from "react-native"
import { Text } from "@/components/ui/text"
import { Link } from "@/components/ui/link"
import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"


export default function Home() {
    return (
        <View style={styles.container}>
            <Link href='/'>Sair</Link>
            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>Seja bem-vindo, Usuário!</Text>
                {/*Colocar o usuário como variável*/}
                <HStack style={styles.linksContainer} space="md">
                    <Link href='/usuario' style={styles.link}>Usuário</Link>
                    <Link href='/novoFrete' style={styles.link}>Novo Frete</Link>
                    <Link href='/configuracoes' style={styles.link}>Configurações</Link>
                </HStack>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        position: 'absolute',
        top: 0,
        left: 10,
        fontSize: 24,
    },
    linksContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        justifyContent: 'center'
    },
    link: {
        marginHorizontal: 10,
        fontSize: 18,
        color: '#007BFF'
    }
})