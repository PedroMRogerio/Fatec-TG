import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { Button, ButtonText } from '@/components/ui/button'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { EyeIcon, EyeOffIcon } from 'lucide-react-native'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    };

    const handleLogin = () => {
        router.replace('home')
    };

    return (
        <View style={styles.container}>
            <Box className='p-4 border rounded-lg border-outline-300'>
                <Heading className='text-typography-900 leading-3'>Login</Heading>
                <Box className='mt-4'>
                    <Box className='mb-2'>
                        <Input>
                            <InputField placeholder="Insira o seu Login" className='py-2' type="text" />
                        </Input>
                    </Box>
                    <Box className='mb-2'>
                        <Input>
                            <InputField placeholder="Insira a sua Senha" className='py-2' type={showPassword ? 'text' : 'password'} />
                            <InputSlot className='pr-3' onPress={handlePasswordVisibility}>
                                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} className='text-darkBlue-500' />
                            </InputSlot>
                        </Input>
                    </Box>
                    <Button className='ml-auto' onPress={handleLogin}>
                        <ButtonText className='text-typography-0'>Login</ButtonText>
                    </Button>
                </Box>
            </Box>
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
