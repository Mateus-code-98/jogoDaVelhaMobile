import styled, { css } from "styled-components/native";
import VectorIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
`

export const TextInput = styled.TextInput`
    flex:1;
`

export const Icon = styled(VectorIcon)`
    margin-right: 16px;
`