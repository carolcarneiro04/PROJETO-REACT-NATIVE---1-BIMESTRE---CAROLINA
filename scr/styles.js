import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

//estilo da página main
export const Container = styled.View`
    flex: 1;
    padding: 30px;
    background-color: #fff;

`;

export const Form = styled.View`
    flex-direction: row;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #828380;
`;

export const Input = styled.TextInput.attrs({
placeholderTextColor: "#acacac"
})`
    flex: 1;
    height: 40px;
    background-color: #eee;
    padding: 0 15px;
    border: 1px solid #ccc;
`

export const SubmitButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    background-color: #e9f634;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 12px;
    opacity: ${(props) => (props.loading ? 0.7 : 1)};
`

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px;
`;

export const User = styled.View`
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
`;

export const Avatar = styled.Image`
    width: 140px;
    height: 200px;
    border-radius: 8px;
    background-color: #f5e478;
`;

export const Name = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #2d2c2c;
    margin-top: 4px;
    text-align: center;
`;

export const Bio = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 13px;
    line-height: 18px;
    color: #999;
    margin-top: 5px;
    text-align: center;
`;

export const ProfileButton = styled(RectButton)`
    margin-top: 10px;
    align-self: stretch;
    border-radius: 4px;
    background-color: #e9f634;
    justify-content: center;
    align-items: center;
    height: 36px;
`;

export const ProfileButtonText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: #2d2c2c;
    text-transform: uppercase;
`;

//estilo de página user
export const Header = styled.View`
    padding: 30px;
    align-items: center;
    justify-content: center;
`;

export const AvatarPerfil = styled.Image`
    width: 160px;
    height: 230px;
    border-radius: 8px;
    background: #eee;
`;

export const NamePerfil = styled.Text`
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-top: 4px;
    text-align: center;
`;

export const BioPerfil = styled.Text`
    font-size: 15px;
    line-height: 18px;
    color: #999;
    margin-top: 5px;
    text-align: center;
`;

export const Stars = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px;
`;

export const Starred = styled.View`
    background: #f5f5f5;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
`;

export const OwnerAvatar = styled.Image`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background: #eee;
`;

export const Info = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-size: 15px;
    font-weight: bold;
    color: #333;
`

export const Author = styled.Text`
    font-size: 13px;
    color: #666;
    margin-top: 2px;
`;