import styled, { css } from "styled-components/native";
import VectorIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    align-items: center;
    ${props => props.isErrored && css`
        border-color: #C53030;
    `}
    ${props => props.isFocused && css`
        border-color: #FF9000;
    `}
`

export const TextInput = styled.TextInput`
    flex:1;
`

export const Icon = styled(VectorIcon)`
    margin-right: 16px;
`