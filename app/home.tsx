import { Link } from "expo-router";
import { View, StyleSheet, Text, LogBox, Pressable } from "react-native";

export default function Home() {

    return (

        <View style={styles.view}>
            <Text style={styles.titulo}>Bem vindo Usuário!</Text>
            {/*Troca para o usuário dentro do banco dados*/}
            <View style={styles.sublinha}></View>
            <Text style={styles.subtitulo}>Ultimos fretes:</Text>
            <Link href="/frete1" asChild>
                <Pressable style={styles.box}>
                    <Text style={styles.frete}>Frete 1</Text>
                </Pressable>
            </Link>
            <View style={styles.separador}></View>
            <Link href="/frete2" asChild>
                <Pressable style={styles.box}>
                    <Text style={styles.frete}>Frete 2</Text>
                </Pressable>
            </Link>
            <View style={styles.separador}></View>
            <Link href="/frete3" asChild>
                <Pressable style={styles.box}>
                    <Text style={styles.frete}>Frete 3</Text>
                </Pressable>
            </Link>
            <View style={styles.separador2}></View>
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
            </View >
        </View >
    )

}

export const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10
    },
    box: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '95%',
        height: '15%',
        borderWidth: 0.85,
        borderRadius: 5,
        borderColor: '#808080'
    },
    titulo: {
        fontSize: 22,
        paddingBottom: 8,
    },
    subtitulo: {
        fontSize: 18,
        paddingBottom: 4
    },
    frete: {
        fontSize: 15,
        alignSelf: 'center',
    },
    separador: {
        height: 6
    },
    //Separador temporário até fazer o rodapé
    separador2: {
        width: '100%',
        height: 240,
    },
    sublinha: {
        borderWidth: 0.25,
        borderColor: '#808080',
        width: '100%'
    },
    view2: {
        alignSelf: 'center',
        flex: 1,
        width: '120%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#808080'
    },
    //Botão temporario para visualizar a idéia 
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
})