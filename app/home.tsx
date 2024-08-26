import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Link } from "@/components/ui/link"
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast"


export default function Home(){
    return(
        <View>
            <Text>Login com sucesso!</Text>
            <Link href='/'>Voltar para home</Link>
        </View>
    )
}
