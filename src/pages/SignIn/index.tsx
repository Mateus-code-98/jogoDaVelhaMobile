import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, Image, ScrollView, TextInput, View } from "react-native";
import { Container, CreateAccountButton, CreateAccountButtonText, Title } from './style';
import { useNavigation } from '@react-navigation/native';
import Logo from './../../../assets/logo.png';
import Input, { RefInputProps } from "../../components/Input";
import { Button } from "../../components/Button";
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { useAuth } from './../../hooks/auth';
import api from "../../services/api";

export const SignIn: React.FC = () => {
    const navigation = useNavigation<any>()
    const emailRef = useRef<RefInputProps>(null)
    const passwordRef = useRef<RefInputProps>(null)
    const [errorEmail, setErrorEmail] = useState<string | null>(null)
    const [errorPassword, setErrorPassword] = useState<string | null>(null)
    const { signIn, user } = useAuth()

    useEffect(() => {
        console.log(user)
    }, [user])

    const onSubmit = useCallback(async () => {
        const error_email = await VerifyEmail()
        const error_password = await VerifyPassword()

        const email = emailRef.current?.getValue() ? emailRef.current.getValue() : ''
        const password = passwordRef.current?.getValue() ? passwordRef.current.getValue() : ''

        if (!error_email && !error_password) {
            try{
                await signIn({
                    email: email ? email : '',
                    password: password ? password : ''
                })
            }catch(e){
                console.log(e)
            }
        }

    }, [emailRef, passwordRef])

    const VerifyEmail = useCallback(async () => {
        let resu
        setErrorEmail(null)
        const email = emailRef.current?.getValue()
        const schemaEmail = Yup.object().shape({
            email: Yup.string().required("Campo obrigatório").email('Email inválido'),
        })
        try {
            await await schemaEmail.validate({ email })
        } catch (err: any) {
            setErrorEmail(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [emailRef])

    const VerifyPassword = useCallback(async () => {
        let resu
        setErrorPassword(null)
        const password = passwordRef.current?.getValue()

        const schemaPassword = Yup.object().shape({
            password: Yup.string().required("Campo obrigatório"),
        })
        try {
            await schemaPassword.validate({ password })
        } catch (err: any) {
            setErrorPassword(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [passwordRef])

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
                <Container>
                    <Image style={{ height: 50 }} resizeMode="contain" source={Logo} />
                    <Title>Faça seu login</Title>
                    <Input
                        error={errorEmail}
                        ref={emailRef}
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        returnKeyType="next"
                        onChange={() => setErrorEmail(null)}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                    <Input
                        error={errorPassword}
                        ref={passwordRef}
                        secureTextEntry
                        name="password"
                        icon="lock"
                        placeholder="Senha"
                        onChange={() => setErrorPassword(null)}
                        returnKeyType="send"
                        onSubmitEditing={onSubmit}
                    />
                    <Button onPress={onSubmit}>Entrar</Button>
                </Container >
            </ScrollView>
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon color="#FF9000" name="log-in" size={20} />
                <CreateAccountButtonText>SignUp</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}