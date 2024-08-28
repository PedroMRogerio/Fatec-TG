import { Box } from "@/components/ui/box"
import { Center } from "@/components/ui/center"
import { Link } from "@/components/ui/link"
import { View, StyleSheet } from "react-native"

export default function novoFrete() {
    return (
        <View style={styles.container}>
            <Center>
                <Box>
                    <Link href='/home'>Voltar para home</Link>
                </Box>
            </Center>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})