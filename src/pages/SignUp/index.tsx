import React, { useCallback, useRef, useState } from "react";
import { Text, Image, ScrollView, TextInput, View, Alert } from "react-native";
import { Container, CreateAccountButton, CreateAccountButtonText, Title } from './style';
import { useNavigation } from '@react-navigation/native';
import Logo from './../../../assets/logo.png';
import Input, { RefInputProps } from "../../components/Input";
import { Button } from "../../components/Button";
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import api from "../../services/api";

export const SignUp: React.FC = () => {
    const navigation = useNavigation<any>()
    const nameRef = useRef<RefInputProps>(null)
    const emailRef = useRef<RefInputProps>(null)
    const passwordRef = useRef<RefInputProps>(null)
    const [errorName, setErrorName] = useState<string | null>(null)
    const [errorEmail, setErrorEmail] = useState<string | null>(null)
    const [errorPassword, setErrorPassword] = useState<string | null>(null)

    const VerifyName = useCallback(async () => {
        let resu
        setErrorName(null)
        const name = nameRef.current?.getValue()
        const schemaName = Yup.object().shape({
            name: Yup.string().required("Campo obrigatório"),
        })
        try {
            await await schemaName.validate({ name })
        } catch (err: any) {
            setErrorName(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [nameRef])

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

    const onSubmit = useCallback(async () => {
        const error_email = await VerifyEmail()
        const error_password = await VerifyPassword()
        const error_name = await VerifyName()

        const data = {
            name: nameRef.current?.getValue(),
            email: emailRef.current?.getValue(),
            password: passwordRef.current?.getValue()
        }

        if (!errorEmail && !errorName && !errorPassword) {
           try{
            const resu = await api.post('/users',data)
            Alert.alert('Resultado','Cadastrado')
           }catch(e:any){
               console.log(e)
           }
        }
    }, [nameRef, emailRef, passwordRef])

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
                <Container>
                    <Image style={{ height: 50 }} resizeMode="contain" source={Logo} />
                    <Title>Faça seu cadastro</Title>
                    <Input
                        error={errorName}
                        ref={nameRef}
                        name="name"
                        icon="user"
                        placeholder="Nome"
                        returnKeyType="next"
                        onChange={() => setErrorName(null)}
                        onSubmitEditing={() => emailRef.current?.focus()}
                    />
                    <Input
                        error={errorEmail}
                        ref={emailRef}
                        name="email"
                        icon="mail"
                        keyboardType="email-address"
                        placeholder="E-mail"
                        onChange={() => setErrorEmail(null)}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                    <Input
                        error={errorPassword}
                        ref={passwordRef}
                        name="password"
                        icon="lock"
                        placeholder="Senha"
                        onChange={() => setErrorPassword(null)}
                        returnKeyType="send"
                        onSubmitEditing={onSubmit}
                        secureTextEntry
                    />
                    <Button onPress={onSubmit}>Entrar</Button>
                </Container >
            </ScrollView>
            <CreateAccountButton onPress={() => navigation.navigate('SignIn')}>
                <Icon color="#FFF" name="arrow-left" size={20} />
                <CreateAccountButtonText>Voltar para login</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}