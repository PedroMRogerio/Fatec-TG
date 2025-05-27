import { FreteSearchCard } from "@/components/frete/freteSearchCard";
import { View, StyleSheet } from "react-native";
import { clientStyle, providerStyle } from "@/components/styles/PageStyles"
import { useUser } from "@/contexts/userContext";

export default function FreteSearch(){
    const { user } = useUser()
    const userStyle = user?.uType==='prov'? providerStyle : clientStyle
    return (
        <View style={[userStyle.container, styles.container]}>
            <FreteSearchCard/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});
