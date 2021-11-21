import React from 'react';
import { ButtonText, Container } from './style';
import { RectButtonProperties } from 'react-native-gesture-handler';

export interface ButtonProps extends RectButtonProperties {
    children: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <Container {...rest}>
            <ButtonText>{children}</ButtonText>
        </Container>
    )
}