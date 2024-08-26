//import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button'
//import { Text } from '@/components/ui/text'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Center } from '@/components/ui/center'
import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
//import { Link } from '@/components/ui/link'



export default function Login() {

    const handleLogin = () => {
        router.replace('home')
    }

    return (
        <View style={styles.container}>
            <Center>
                <Box className='p-5 max-w-96 border border-background-900 rounded-lg'>
                    <VStack className='pb-4' space='xs'>
                        <Heading className='leading-[30px]'>
                            Login
                        </Heading>
                    </VStack>
                    <VStack space='xl' className='py-2'>
                        <Input>
                            <InputField
                                className='py-2'
                                placeholder="Login"
                            />
                        </Input>
                        <Input>
                            <InputField
                                className='py-2'
                                placeholder="Senha"
                            />
                        </Input>
                    </VStack>
                    <VStack space='lg' className='pt-4'>
                        <Button size='sm' variant="solid" onPress={handleLogin}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </Center>
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