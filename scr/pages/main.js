import React, { Component } from "react";
import { Keyboard, ActivityIndicator, Alert } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buscarAnime, STATUS } from "../services/api";
import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from "../styles";

export default class Main extends Component {
    state = {
        newAnime: "",
        animes: [],
        loading: false,
    };

    async componentDidMount() {
        const salvos = await AsyncStorage.getItem("@animes");
        if (salvos) this.setState({ animes: JSON.parse(salvos) });
    }

    componentDidUpdate(_, prevState) {
        if (prevState.animes !== this.state.animes) {
            AsyncStorage.setItem("@animes", JSON.stringify(this.state.animes));
        }
    }

    handleAddAnime = async () => {
        const { animes, newAnime } = this.state;
        if (!newAnime.trim()) return;
        try {
            this.setState({ loading: true });
            const anime = await buscarAnime(newAnime.trim());

            if (animes.find((a) => a.id === anime.id)) {
                Alert.alert("Anime já adicionado");
                this.setState({ loading: false });
                return;
            }

            const data = {
                id: anime.id,
                name: anime.title.english || anime.title.romaji,
                cover: anime.coverImage.large,
                status: STATUS[anime.status] || anime.status,
                episodes: anime.episodes,
                score: anime.averageScore,
                format: anime.format,
                genres: anime.genres,
            };

            // "..." é uma cópia spread - faz uma cópia dos animes anteriores e junta com o novo
            this.setState({ animes: [...animes, data], newAnime: "", loading: false });
            Keyboard.dismiss();
        } catch (error) {
            Alert.alert("Anime não encontrado!");
            this.setState({ loading: false });
        }
    };

    handleDelete = (id) => {
        Alert.alert("Excluir card", "Deseja remover este anime da lista?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Excluir", style: "destructive", onPress: () => this.setState({ animes: this.state.animes.filter((a) => a.id !== id) }) },
        ]);
    };

    render() {
        const { newAnime, animes, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome do anime (ex: Naruto)"
                        value={newAnime}
                        onChangeText={(text) => this.setState({ newAnime: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddAnime}
                    />
                    <SubmitButton loading={loading} onPress={this.handleAddAnime}>
                        {loading ? <ActivityIndicator /> : <Icon name="add" size={24} color="#000" />}
                    </SubmitButton>
                </Form>
                <List
                    data={animes}
                    keyExtractor={(anime) => String(anime.id)}
                    ListEmptyComponent={<Bio>Nenhum card ainda. Digite o nome de um anime e toque em +.</Bio>}
                    renderItem={({ item }) => (
                        <User>
                            <Avatar source={{ uri: item.cover }} />
                            <Name>{item.name}</Name>
                            <Bio>Status: {item.status}</Bio>
                            <Bio>
                                {item.format} • {item.episodes ? `${item.episodes} eps` : "eps indefinidos"}
                                {item.score ? ` • Nota ${item.score}/100` : ""}
                            </Bio>
                            <ProfileButton onPress={() => this.props.navigation.navigate("detalhes", { anime: item })}>
                                <ProfileButtonText>Ver mais detalhes</ProfileButtonText>
                            </ProfileButton>
                            <ProfileButton style={{ backgroundColor: "#ee0e0e" }} onPress={() => this.handleDelete(item.id)}>
                                <ProfileButtonText>Excluir</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        );
    }
}
