import axios from "axios";

// A AniList usa GraphQL: todas as consultas são POST para um único endereço.
const api = axios.create({
    baseURL: "https://graphql.anilist.co",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// Dados resumidos para o card
const CARD_QUERY = `
query ($search: String) {
  Media(search: $search, type: ANIME) {
    id
    title { romaji english }
    coverImage { large }
    status
    episodes
    averageScore
    format
    genres
  }
}`;

// Dados completos para a tela de detalhes
const DETAIL_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title { romaji english native }
    coverImage { extraLarge }
    bannerImage
    description(asHtml: false)
    status format source episodes duration season seasonYear
    startDate { year month day }
    endDate { year month day }
    averageScore popularity favourites genres
    studios(isMain: true) { nodes { name } }
  }
}`;

const request = async (query, variables) => {
    const response = await api.post("/", { query, variables });
    return response.data.data.Media;
};

export const buscarAnime = (nome) => request(CARD_QUERY, { search: nome });
export const buscarDetalhes = (id) => request(DETAIL_QUERY, { id });

export const STATUS = {
    FINISHED: "Finalizado",
    RELEASING: "Em exibição",
    NOT_YET_RELEASED: "Não lançado",
    CANCELLED: "Cancelado",
    HIATUS: "Em hiato",
};

export default api;
