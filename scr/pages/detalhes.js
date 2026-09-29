import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Alert } from "react-native";
import { buscarDetalhes, STATUS } from "../services/api";
import { Container, Header, AvatarPerfil, NamePerfil, BioPerfil, Info, Title, Author } from "../styles";

const data = (d) => (d && d.year ? [d.day, d.month, d.year].filter(Boolean).join("/") : "—");

export default function Detalhes({ route }) {
    const { anime } = route.params;
    const [d, setD] = useState(null);

    useEffect(() => {
        buscarDetalhes(anime.id)
            .then(setD)
            .catch(() => Alert.alert("Não foi possível carregar os detalhes"));
    }, []);

    if (!d) return <Container><ActivityIndicator size="large" color="#000" /></Container>;

    const linhas = [
        ["Título original", d.title.native],
        ["Status", STATUS[d.status] || d.status],
        ["Formato", d.format],
        ["Episódios", d.episodes ?? "—"],
        ["Duração", d.duration ? `${d.duration} min/ep` : "—"],
        ["Temporada", d.season ? `${d.season} ${d.seasonYear}` : "—"],
        ["Início", data(d.startDate)],
        ["Fim", data(d.endDate)],
        ["Estúdio", d.studios.nodes.map((s) => s.name).join(", ") || "—"],
        ["Fonte", d.source || "—"],
        ["Nota média", d.averageScore ? `${d.averageScore}/100` : "—"],
        ["Popularidade", d.popularity],
        ["Favoritos", d.favourites],
        ["Gêneros", d.genres.join(", ")],
    ];

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <Container>
                <Header>
                    <AvatarPerfil source={{ uri: d.coverImage.extraLarge }} />
                    <NamePerfil>{d.title.english || d.title.romaji}</NamePerfil>
                    <BioPerfil>{d.title.romaji}</BioPerfil>
                </Header>
                {linhas.map(([rotulo, valor]) => (
                    <Info key={rotulo} style={{ marginLeft: 0, marginBottom: 12 }}>
                        <Author>{rotulo}</Author>
                        <Title numberOfLines={3}>{String(valor)}</Title>
                    </Info>
                ))}
                <Author style={{ marginTop: 8 }}>Sinopse</Author>
                <BioPerfil style={{ textAlign: "left" }}>
                    {(d.description || "Sem sinopse disponível.").replace(/<[^>]+>/g, " ")}
                </BioPerfil>
            </Container>
        </ScrollView>
    );
}
