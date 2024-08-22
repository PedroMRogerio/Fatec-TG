import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'

export default function Login() {

    const handleLogin = () => {
        router.replace('home')
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                <InputField placeholder="Digite seu login" type="text" />
            </Input>
            <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField placeholder="Digite seua senha" type="password" />
            </Input>
            <Button size='sm' variant='solid' onPress={handleLogin}>
                <ButtonText>Login</ButtonText>
            </Button>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})