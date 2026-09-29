import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const salvo = await AsyncStorage.getItem("@usuario");
            if (!salvo) {
                Alert.alert("Nenhum usuário cadastrado", "Toque em CADASTRAR USUÁRIO para criar sua conta.");
                return;
            }
            const dados = JSON.parse(salvo);
            if (usuario.trim() === dados.usuario && password === dados.senha) {
                setPassword("");
                navigation.navigate("main");
            } else {
                Alert.alert("Usuário ou senha incorretos");
            }
        } catch (e) {
            Alert.alert("Erro ao ler os dados salvos");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Usuário"
                autoCapitalize="none"
                value={usuario}
                onChangeText={setUsuario}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => navigation.navigate("cadastro")}>
                <Text style={styles.buttonText}>CADASTRAR USUÁRIO</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
    input: { borderWidth: 1, borderColor: "#7e7d7d", borderRadius: 5, padding: 10, marginVertical: 10, width: "80%" },
    button: { backgroundColor: "#f78707", borderRadius: 5, padding: 12, borderColor: "#a05300", borderWidth: 1, width: "80%", marginTop: 10 },
    secondary: { backgroundColor: "#e9f634", borderColor: "#9aa200" },
    buttonText: { color: "#000", fontWeight: "bold", textAlign: "center", fontSize: 16 },
});

export default Login;
