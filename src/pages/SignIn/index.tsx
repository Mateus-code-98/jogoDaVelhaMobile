import React, { useCallback, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Container, Description, TextButton, Title } from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginSVG } from "../../components/Icons/Login";
import { RectButton } from "react-native-gesture-handler";
import { credentialsProps, useAuth } from '../../hooks/auth';
import * as Google from 'expo-google-app-auth';
import api from "../../services/api";
import { ActivityIndicator, Modal } from "react-native-paper";


const IOS_CLIENT_ID = '156597919334-o18ka3mbv6h64jm5p0a567klhiki1gh7.apps.googleusercontent.com'
const ANDROID_CLIENT_DI = '156597919334-51ftr2k1qjaib0lvj1lnv8jb0e4m9vv1.apps.googleusercontent.com'
const WEB_CLIENT_ID = '156597919334-9md92rbvkroj8dvatpoa33md3sg7o5sd.apps.googleusercontent.com'

export const SignIn: React.FC = () => {

    const { signIn, user } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleGoogleSignIn = useCallback(async () => {
        const resu = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID,
            androidClientId: ANDROID_CLIENT_DI,
            iosStandaloneAppClientId: IOS_CLIENT_ID,
            androidStandaloneAppClientId: ANDROID_CLIENT_DI,
            clientId: WEB_CLIENT_ID
        });
        if (resu.type === 'success') {
            try {
                setLoading(true)
                signIn(resu.user as credentialsProps)
            } catch (e: any) {
                setLoading(false)
            }
        }
        // signIn({ email: "mateusbrasil@aluno.ufrb.edu.br", name: "", photoUrl: "" })
    }, [])

    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <View style={{ flex: 1, position: 'absolute' }}>
                <LoginSVG />
            </View>
            <Container>
                <View>
                    <Title>Conecte-se</Title>
                    <Title>e duele contra</Title>
                    <Title>seus amigos</Title>
                    <View style={{ marginTop: 10 }}>
                        <Description>Convide seus amigos para jogar</Description>
                        <Description>o bom e velho jogo da velha</Description>
                    </View>
                </View>
                <RectButton onPress={handleGoogleSignIn} style={{ flexDirection: "row", alignItems: "center", borderRadius: 5, backgroundColor: "#E51C44", width: "100%", marginTop: 40 }}>
                    <View style={{ padding: 10, borderRightWidth: 1, borderRightColor: "#991F36" }}>
                        <Icon name="google" size={30} color="#FFF" />
                    </View>
                    <View style={{ padding: 10, flex: 1 }}>
                        <TextButton>Entrar com o Google</TextButton>
                    </View>
                </RectButton>
                {loading &&
                    <Modal visible={loading} dismissable={false} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                        <View style={{ backgroundColor: "#0B1138", position: "relative", margin: 20, width: 200, height: 200, elevation: 10, borderRadius: 5, alignItems: "center", justifyContent: "space-evenly" }}>
                            <ActivityIndicator size={50} color="#E51C44" />
                            <TextButton style={{ marginTop: 20, fontSize: 20 }}>Aguarde</TextButton>
                        </View>
                    </Modal>
                }
            </Container >
        </View>
    )
}