import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Main from "./pages/main";
import Detalhes from "./pages/detalhes";

const Stack = createStackNavigator();

const header = (title) => ({
    title,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: "#e9f634" },
    headerTitleStyle: { fontWeight: "bold", color: "#000" },
});

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={Login} options={header("LOGIN")} />
            <Stack.Screen name="cadastro" component={Cadastro} options={header("CADASTRAR USUÁRIO")} />
            <Stack.Screen name="main" component={Main} options={{ ...header("CARDS DE ANIMES"), headerLeft: () => null }} />
            <Stack.Screen name="detalhes" component={Detalhes} options={header("MAIS DETALHES")} />
        </Stack.Navigator>
    );
}
