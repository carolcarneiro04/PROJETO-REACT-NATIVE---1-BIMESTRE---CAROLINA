import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CAMPOS = [
    { key: "nome", label: "Nome" },
    { key: "telefone", label: "Telefone", keyboardType: "phone-pad" },
    { key: "cpf", label: "CPF", keyboardType: "numeric" },
    { key: "email", label: "E-mail", keyboardType: "email-address", autoCapitalize: "none" },
    { key: "curso", label: "Curso" },
    // Usuário e senha são usados na tela de login
    { key: "usuario", label: "Usuário", autoCapitalize: "none" },
    { key: "senha", label: "Senha", secureTextEntry: true },
];

export default function Cadastro({ navigation }) {
    const [form, setForm] = useState({ nome: "", telefone: "", cpf: "", email: "", curso: "", usuario: "", senha: "" });

    const handleCadastro = async () => {
        if (CAMPOS.some((c) => !form[c.key].trim())) {
            Alert.alert("Preencha todos os campos");
            return;
        }
        try {
            // AsyncStorage é o "LocalStorage" do React Native
            await AsyncStorage.setItem("@usuario", JSON.stringify({ ...form, usuario: form.usuario.trim() }));
            Alert.alert("Usuário cadastrado com sucesso!");
            navigation.navigate("login");
        } catch (e) {
            Alert.alert("Erro ao salvar os dados");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            {CAMPOS.map(({ key, label, ...props }) => (
                <TextInput
                    key={key}
                    style={styles.input}
                    placeholder={label}
                    value={form[key]}
                    onChangeText={(text) => setForm({ ...form, [key]: text })}
                    {...props}
                />
            ))}
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingVertical: 20 },
    input: { borderWidth: 1, borderColor: "#7e7d7d", borderRadius: 5, padding: 10, marginVertical: 8, width: "80%" },
    button: { backgroundColor: "#f78707", borderRadius: 5, padding: 12, borderColor: "#a05300", borderWidth: 1, width: "80%", marginTop: 12 },
    buttonText: { color: "#000", fontWeight: "bold", textAlign: "center", fontSize: 16 },
});
