import React, { useState, useCallback, useEffect, useRef } from "react";
import { Text, Image, View, ScrollView, ToastAndroid, RefreshControl, Keyboard } from "react-native";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RectButton, TextInput } from "react-native-gesture-handler";
import { useAuth } from '../../hooks/auth';
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator, Modal } from 'react-native-paper';
import { userInterface } from "../../interfaces/userInterface";
import api from "../../services/api";
import Input, { RefInputProps } from "../../components/Input";
import { Loading } from "../../components/Loading";
import io, { Socket } from "socket.io-client";

const nameShort = (name: string) => {
    const nameArray = name.split(' ');
    return `${nameArray[0]} ${nameArray[1]}`
}

export const Home: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [friends, setFriends] = useState<userInterface[]>([] as userInterface[])
    const [loadingFriends, setLoadingFriends] = useState<boolean>(false)
    const [loadingAdd, setLoadingAdd] = useState<boolean>(false)
    const inputIdRef = useRef<RefInputProps>(null)
    const [errorFriendlyId, setErrorFriendlyId] = useState<string | null>(null)
    const [socket, setSocket] = useState<Socket>({} as Socket)

    const { signOut, user } = useAuth()
    const navigator: any = useNavigation()

    const searchFriends = useCallback(async () => {
        setLoadingFriends(true)
        setTimeout(async () => {
            try {
                const result = await api.get('/friendships')
                setFriends(result.data)
                setLoadingFriends(false)
            } catch (e) {
                setLoadingFriends(false)
            }
        }, 1000)
    }, [])

    const onDismiss = useCallback(() => {
        setModalOpen(false)
    }, [])

    const addNewFriend = useCallback(async () => {
        setLoadingAdd(true)
        Keyboard.dismiss()
        setTimeout(async () => {
            try {
                const friendlyId = inputIdRef.current?.getValue()
                const result = await api.post('/friendships', { friendlyId })
                socket.emit(`new-friend`, { user, friend: result.data.friend })
                searchFriends()
                onDismiss()
                setLoadingAdd(false)
            } catch (e: any) {
                alert(e.response.data.message)
                setLoadingAdd(false)
            }
        }, 3000)
    }, [inputIdRef, loadingAdd, user, socket])

    useEffect(() => initialFunc(), [])

    const initialFunc = useCallback(() => {
        searchFriends()
        const socketInstance = io(`http://192.168.0.103:3333`)
        setSocket(socketInstance)
        socketInstance.on(`new-friend-${user.id}`, searchFriends)
    }, [user])

    return (
        <View style={{ flexGrow: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottomColor: "#C4C4C4", borderBottomWidth: 1, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Image style={{ height: 50, width: 50, borderRadius: 3 }} source={{ uri: user.photoUrl }} />
                    </View>
                    <View style={{ justifyContent: "space-between", marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: "Rajdhani_500Medium", fontSize: 24, color: "#DDE3F0" }}>
                                Olá,
                            </Text>
                            <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0", marginLeft: 5 }}>{nameShort(user.name)}</Text>
                        </View>
                        <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 16, color: "#ABB1CC" }} >Seu id é <Text style={{ color: "#E51C44", fontFamily: "Rajdhani_600SemiBold" }}>{user.friendlyId}</Text></Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <RectButton onPress={() => setModalOpen(true)} style={{ padding: 10, width: 50, height: 50, backgroundColor: "#E51C44", borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon2 size={30} name="file-copy" color="#FFF" />
                    </RectButton>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 10 }}>
                <View>
                    <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 18, color: "#DDE3F0" }}>Amigos</Text>
                    <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 13, color: "#ABB1CC", opacity: loadingFriends ? 0 : 1 }}>Total {friends.length}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <RectButton onPress={() => setModalOpen(true)} style={{ padding: 10, width: 50, height: 50, backgroundColor: "#E51C44", borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon size={20} name="user-plus" color="#FFF" />
                    </RectButton>
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <ScrollView refreshControl={<RefreshControl refreshing={false} enabled={!loadingFriends} onRefresh={searchFriends} />} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingTop: 20, marginBottom: 20 }}>
                    {!loadingFriends && friends.map((friend) => (
                        <View key={friend.id} style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#1D2766", paddingBottom: 10, marginBottom: 10 }}>
                            <Image style={{ height: 50, width: 50, borderRadius: 3 }} source={{ uri: friend.photoUrl }} />
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
                                <View style={{ justifyContent: "space-between", marginLeft: 20 }}>
                                    <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0" }}>
                                        {nameShort(friend.name)}
                                    </Text>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "#32BD50", marginRight: 5 }}>
                                        </View>
                                        <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 13, color: "#ABB1CC" }}>Disponível</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <RectButton onPress={() => navigator.navigate('Game')} style={{ padding: 5, backgroundColor: "#E51C44", borderRadius: 3 }}>
                                        <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 18, color: "#DDE3F0" }}>Jogar</Text>
                                    </RectButton>
                                </View>
                            </View>
                        </View>
                    ))}
                    {!loadingFriends && friends.length === 0 &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 18, color: "#DDE3F0" }}>Você ainda não possui amigos</Text>
                        </View>
                    }
                    {loadingFriends &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator color="#E51C44" size={30} />
                        </View>
                    }
                </ScrollView>
                <RectButton onPress={signOut} style={{ padding: 10, backgroundColor: "#E51C44", borderRadius: 3 }}>
                    <Text style={{ fontFamily: "Rajdhani_600SemiBold", textAlign: 'center', fontSize: 18, color: "#DDE3F0" }}>Sair</Text>
                </RectButton>
            </View>
            {modalOpen &&
                <Modal visible={modalOpen} dismissable={!loadingAdd} onDismiss={onDismiss} contentContainerStyle={{ backgroundColor: "#0B1138", margin: 20, padding: 20, elevation: 10 }}>
                    <Input ref={inputIdRef} onSubmitEditing={addNewFriend} error={errorFriendlyId} autoFocus={false} returnKeyType="send" keyboardAppearance="dark" autoCapitalize="characters" autoCorrect={false} placeholder="Cole aqui o id do seu amigo" style={{ fontSize: 16, fontFamily: "Rajdhani_600SemiBold", padding: 10, paddingBottom: 5, paddingTop: 5, backgroundColor: "#C4C4C4", borderRadius: 3, color: "#000000" }} placeholderTextColor="#424040" />
                    <RectButton enabled={!loadingAdd} onPress={addNewFriend} style={{ backgroundColor: "#E51C44", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, padding: 10, borderRadius: 3 }}>
                        <Text style={{ textAlign: 'center', marginRight: 5, color: "#FFF", fontFamily: "Rajdhani_600SemiBold", position: 'relative', fontSize: 18 }}>
                            {!loadingAdd ? 'Adicionar' : 'Aguarde'}
                        </Text>
                        {!loadingAdd ? <></> : <Loading />}
                    </RectButton>
                </Modal>
            }
        </View>
    )
}