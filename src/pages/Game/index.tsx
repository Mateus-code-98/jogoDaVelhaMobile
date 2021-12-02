import { useNavigation } from "@react-navigation/core";
import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StatusBar, Image } from 'react-native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconO } from "../../components/Icons/IconO";
import { IconX } from "../../components/Icons/IconX";
import { useGlobal } from '../../hooks/global';
import api from "../../services/api";
import { userInterface } from '../../interfaces/userInterface';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator } from 'react-native-paper';
import { io } from "socket.io-client";
import { nameShort } from "../../services/generalServices";

export const Game: React.FC = () => {
    const [gamePositions, setGamePositions] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    const [atualPlayer, setAtualPlayer] = useState<number>(1)
    const [adversary, setAdversary] = useState<userInterface>({} as userInterface)
    const [loading, setLoading] = useState<boolean>(true)

    const navigator: any = useNavigation()

    const { friendshipId, setFriendshipId } = useGlobal()
    const { user, socket, setSocket } = useAuth()

    const searchFriendship = useCallback(async ({ socket, friendshipId, user }) => {
        const resu = await api.get(`/friendships/${friendshipId}`)
        const playerX = resu.data.playerX
        const playerO = resu.data.playerO
        if (user.id === playerO.id) setAdversary(playerX)
        else setAdversary(playerO)
        setLoading(false)
        subscribeInChannels({ adversary: user.id === playerO.id ? playerX : playerO, socket })
    }, [])

    const initialFunc = useCallback(() => {
        console.log('Ola')
        if (socket) socket.disconnect()
        const socketInstance = io(`http://192.168.0.103:3333`, { query: { userId: user.id } })
        setSocket(socketInstance)
        searchFriendship({ socket: socketInstance, friendshipId, user })
    }, [user, socket, friendshipId])

    const subscribeInChannels = useCallback(({ adversary, socket }) => {
        socket.removeAllListeners()
        socket.on(`${adversary.id}`, (data: any) => setAdversary(data))
    }, [])

    useEffect(() => initialFunc(), [])

    const clickOnPosition = useCallback(({ x, y }) => {
        const newGamePositions = gamePositions
        if (newGamePositions[y][x] === 0) {
            newGamePositions[y][x] = atualPlayer
            setGamePositions(newGamePositions)
            setAtualPlayer(atualPlayer * (-1))
        }
    }, [atualPlayer, gamePositions])

    const goBack = useCallback(() => {
        setFriendshipId("")
        navigator.navigate('Home')
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#1D2766" />
            <View style={{ padding: 10, backgroundColor: "#1D2766", alignItems: 'center', position: 'relative', height: "8%", minHeight: 60, justifyContent: 'center' }}>
                <View style={{ position: 'absolute', left: 10, justifyContent: "center", alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={goBack} style={{ padding: 10 }}>
                        <Icon name="arrow-back" size={30} color="#DDE3F0" />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 20, color: "#DDE3F0" }}>Duelo 1x1</Text>
            </View>
            {!loading &&
                <View style={{ justifyContent: "space-between", flex: 1 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ borderRadius: 10, backgroundColor: atualPlayer === -1 ? '#243189' : "#DDE3F0", color: atualPlayer === -1 ? "#DDE3F0" : "#243189", margin: 20, width: 50, height: 50, textAlign: "center", textAlignVertical: 'center', fontSize: 22, fontFamily: 'Rajdhani_600SemiBold' }}>5</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginBottom: 20, borderBottomColor: "#C4C4C4", borderBottomWidth: 1, paddingBottom: 10, width: "60%" }}>
                            <View style={{ justifyContent: "space-between" }}>
                                <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0" }}>
                                    {nameShort(adversary.name)}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: adversary.status === "off" ? "#ac1a1a" : "#32BD50", marginRight: 5 }}></View>
                                    <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 13, color: "#ABB1CC" }}>{adversary.status === "off" ? "offline" : "Disponível"}</Text>
                                </View>
                            </View>
                            <Image style={{ height: 50, width: 50, borderRadius: 3, marginRight: 20, marginLeft: 20 }} source={{ uri: adversary.photoUrl }} />
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                        {gamePositions.map((line, posY) => {
                            return (
                                <View key={posY} style={{ flexDirection: "row" }}>
                                    {line.map((position, posX) => {
                                        return (
                                            <TouchableWithoutFeedback onPress={() => clickOnPosition({ x: posX, y: posY })} key={posX} style={{
                                                borderBottomWidth: posY === 0 ? 2 : 0,
                                                borderBottomColor: "#FFF",
                                                borderRightWidth: posX === 0 ? 2 : 0,
                                                borderRightColor: "#FFF",
                                                borderTopWidth: posY === 2 ? 2 : 0,
                                                borderTopColor: "#FFF",
                                                borderLeftWidth: posX === 2 ? 2 : 0,
                                                borderLeftColor: "#FFF",
                                                height: 100,
                                                width: 100,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                {position === 1 ? <IconO /> : (position === -1) ? <IconX /> : <></>}
                                            </TouchableWithoutFeedback>
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, borderTopColor: "#C4C4C4", borderTopWidth: 1, paddingTop: 10, width: "60%" }}>
                            <Image style={{ height: 50, width: 50, borderRadius: 3, marginRight: 20, marginLeft: 20 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROFMtsmWYQIC_g4m6iEkdtSsly9B72-0D6QQ&usqp=CAU" }} />
                            <View style={{ justifyContent: "space-between" }}>
                                <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0" }}>
                                    Você
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "#32BD50", marginRight: 5 }}></View>
                                    <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 13, color: "#ABB1CC" }}>Disponível</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{ borderRadius: 10, backgroundColor: atualPlayer === 1 ? '#E51C44' : "#DDE3F0", color: atualPlayer === 1 ? "#DDE3F0" : "#E51C44", margin: 20, marginTop: 30, width: 50, height: 50, textAlign: "center", textAlignVertical: 'center', fontSize: 22, fontFamily: 'Rajdhani_600SemiBold' }}>5</Text>
                    </View>
                </View>
            }
            {loading &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="#E51C44" size={30} />
                </View>
            }
        </View>
    )
}