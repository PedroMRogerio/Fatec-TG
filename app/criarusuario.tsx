import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { newUserCli, newUserProv } from "@/components/login-functions/create-user"

export default function CriarUsuario() {
    const { uid, email, existingUType, targetUType, name, cpf, cnh } = useLocalSearchParams()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        uid: uid?.toString() || "",
        name: name?.toString() || "",
        email: email?.toString() || "",
        cpf: cpf?.toString() || "",
    })
    const [cnhData, setCnhData] = useState({
        cnh: cnh?.toString() || ""
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }
    const handleCnhChange = (field: string, value: string) => {
        setCnhData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (targetUType === 'prov') {
            if (formData.cpf === '' || formData.email === '' || formData.name === '' || cnhData.cnh === '' || formData.uid === '') {
                alert('Todos os campos devem ser preenchidos!')
            } else {
                if (loading) return;
                setLoading(true);
                try {
                    await newUserProv({
                        uid: formData.uid,
                        cpf: formData.cpf,
                        email: formData.email,
                        name: formData.name,
                        cnh: cnhData.cnh,
                    })
                    alert("Provedor criado com sucesso!")
                    router.back()
                } catch (e) {
                    alert("Erro ao criar provedor.")
                } finally {
                    setLoading(false)
                }
            }
        } else {
            if (formData.cpf === '' || formData.email === '' || formData.name === '' || formData.uid === '') {
                alert('Todos os campos devem ser preenchidos!')
            } else {
                if (loading) return;
                setLoading(true);
                try {
                    await newUserCli({
                        uid: formData.uid,
                        cpf: formData.cpf,
                        email: formData.email,
                        name: formData.name,
                    })
                    alert("Cliente criado com sucesso!")
                    router.back()
                } catch (e) {
                    alert("Erro ao criar cliente.")
                } finally {
                    setLoading(false)
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuário {targetUType === 'prov' ? 'Provedor' : 'Cliente'}</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                placeholder="Digite seu nome"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={[styles.input, { backgroundColor: '#ccc' }]}
                value={formData.email}
                editable={false}
                placeholder="Digite seu email"
                keyboardType="email-address"
            />

            <Text style={styles.label}>CPF</Text>
            <TextInput
                style={styles.input}
                value={formData.cpf}
                onChangeText={(text) => handleChange("cpf", text)}
                placeholder="Digite seu CPF"
                keyboardType="numeric"
            />
            {targetUType === 'prov' && (<>
                <Text style={styles.label}>CNH</Text>
                <TextInput
                    style={styles.input}
                    value={cnhData.cnh}
                    onChangeText={(text) => handleCnhChange("cnh", text)}
                    placeholder="Digite sua CNH"
                    keyboardType="numeric"
                />
            </>
            )}

            <Pressable style={styles.backButton} onPress={handleSubmit}>
                <Text style={styles.backButtonText}>Cadastrar</Text>
            </Pressable>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: "#f5f5f5",
    },
    hidden: {
        fontSize: 12,
        color: "#999",
        marginTop: 15,
        textAlign: "center",
    },
    backButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: "#ccc",
        borderRadius: 6,
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
})
