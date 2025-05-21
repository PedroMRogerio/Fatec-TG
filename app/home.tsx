import { Link } from "expo-router";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useUser } from "@/contexts/userContext";
import FreteCardList from "@/components/frete/freteCard";

export default function Home() {
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titulo}>
                    Bem vindo{user?.name ? `, ${user.name}` : ' Usuário'}!
                </Text>

                <View style={styles.sublinha}></View>
                <Text style={styles.subtitulo}>Fretes:</Text>

                <FreteCardList uid={user?.uid ? user.uid : ''} />

                <View style={styles.separador2}></View>
            </ScrollView>

            <View style={styles.view2}>
                <Link href="/usuario" asChild>
                    <Pressable style={styles.botoes}>
                        <Text style={styles.textoBotoes}>Usuário</Text>
                    </Pressable>
                </Link>
                <Link href="/novoFrete" asChild>
                    <Pressable style={styles.botoes}>
                        <Text style={styles.textoBotoes}>Novo Frete</Text>
                    </Pressable>
                </Link>
                <Link href="/config" asChild>
                    <Pressable style={styles.botoes}>
                        <Text style={styles.textoBotoes}>Config.</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollContent: {
        padding: 10,
        paddingBottom: 100,
    },
    titulo: {
        fontSize: 22,
        paddingBottom: 8,
    },
    subtitulo: {
        fontSize: 18,
        paddingBottom: 4
    },
    sublinha: {
        borderWidth: 0.25,
        borderColor: '#808080',
        width: '100%'
    },
    separador2: {
        height: 20,
    },
    view2: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#808080',
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    botoes: {
        borderWidth: 1,
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoBotoes: {
        fontSize: 13,
        fontWeight: 'bold'
    }
});
