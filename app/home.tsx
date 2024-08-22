import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";

export default function Home(){
    return(
        <View>
            <Text> Login com sucesso!</Text>
            <Link href='/'>Voltar para home</Link>
        </View>
    )
}