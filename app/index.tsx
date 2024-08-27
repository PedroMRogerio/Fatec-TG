//import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
//import { Text } from '@/components/ui/text'
import { Input, InputField } from '@/components/ui/input'
//import { Center } from '@/components/ui/center'
import { Box } from '@/components/ui/box'
//import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
//import { Link } from '@/components/ui/link'

export default function Login() {
    const handleLogin = () => {
        router.replace('home')
    }

    return (
        <View style={styles.container}>
            <Heading>Login</Heading>
            <Input>
                <InputField className='py-2' placeholder="Insira o seu login" />
            </Input>
            <Input>
                <InputField className='py-2' placeholder="Insira a sua senha" />
            </Input>
            <Box>
            <Button size='sm' variant="solid" onPress={handleLogin}>
                <ButtonText>Login</ButtonText>
                    <Icon as={ArrowRightIcon} />
            </Button>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    /*box: {
        width: '80%', // Ajusta a largura do Box para 80% da tela
        alignItems: 'center', // Centraliza os itens dentro do Box
    },*/
})