import { View, StyleSheet } from "react-native"
import { Text } from "@/components/ui/text"
import { Link } from "@/components/ui/link"
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast"
import { Center } from "@/components/ui/center"
import { Box } from "@/components/ui/box"


export default function Home() {
    return (
        <View >
            <Text>Seja bem vindo Usuário!</Text>
            {/*Colocar o usuário como varáivel*/}
            <Box style={styles.container}>
                <Link href='/usuario'>Usuário</Link>
                <Link href='/novoFrete'>Novo Frete</Link>
                <Link href='/configuracoes'>Configurações</Link>
                <Link href='/'>Sair</Link>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})