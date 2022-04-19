import { useNavigation } from "@react-navigation/core";
import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StatusBar, Image, Dimensions } from 'react-native';
import { RectButton, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { IconO } from "../../components/Icons/IconO";
import { IconX } from "../../components/Icons/IconX";
import { useGlobal } from '../../hooks/global';
import api from "../../services/api";
import { userInterface } from '../../interfaces/userInterface';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Modal } from 'react-native-paper';
import { io } from "socket.io-client";
import { hasWinnerService, isFinished, nameShort } from "../../services/generalServices";
import { Loading } from "../../components/Loading";
import { api_url } from "../../config/environments";

export const Game: React.FC = () => {
    const [gamePositions, setGamePositions] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    const [atualPlayer, setAtualPlayer] = useState<string>('')
    const [adversary, setAdversary] = useState<userInterface>({} as userInterface)
    const [loading, setLoading] = useState<boolean>(true)
    const [myType, setMyType] = useState<'X' | 'O'>('X')
    const [adversaryType, setAdversaryType] = useState<'X' | 'O'>('O')
    const [status, setStatus] = useState<'inProgress' | 'finished'>('inProgress')
    const [modalOpen, setModalOpen] = useState(false)
    const [loadingRequest, setLoadingRequest] = useState<boolean>(false)
    const [winner, setWinner] = useState<'X' | 'O' | null>(null)
    const [request, setRequest] = useState<'required' | null>(null)
    const [adversaryWinners, setAdversaryWinners] = useState(0)
    const [myWinners, setMyWinners] = useState(0)
    const navigator: any = useNavigation()
    const [you, setYou] = useState<userInterface>({} as userInterface)
    const { friendshipId, setFriendshipId } = useGlobal()
    const { user, socket, setSocket } = useAuth()

    const searchFriendship = useCallback(async ({ socket, friendshipId, user }) => {
        const resu = await api.get(`/friendships/${friendshipId}`)

        const playerX = resu.data.playerX
        const playerO = resu.data.playerO
        if (user.id === playerO.id) {
            setAdversary(playerX)
            setYou(playerO)
            setMyType('O')
            setAdversaryType('X')
            setAdversaryWinners(resu.data.victories_x)
            setMyWinners(resu.data.victories_o)
            let newRequest = resu.data.request_o
            setRequest(newRequest)
        }
        else {
            setAdversary(playerO)
            setYou(playerX)
            setMyType('X')
            setAdversaryType('O')
            setAdversaryWinners(resu.data.victories_o)
            setMyWinners(resu.data.victories_x)
            let newRequest = resu.data.request_x
            setRequest(newRequest)
        }

        const nextPlayer = resu.data.turn
        setAtualPlayer(nextPlayer)

        const newGamePositions = JSON.parse(resu.data.game)
        setGamePositions(newGamePositions)

        const newStatus = resu.data.status
        setStatus(newStatus)

        const newWinner = resu.data.winner
        setWinner(newWinner)

        subscribeInChannels({ adversary: user.id === playerO.id ? playerX : playerO, socket, friendshipId })

        setLoading(false)
    }, [])

    const initialFunc = useCallback(() => {
        if (socket) socket.disconnect()
        const socketInstance = io(api_url, { query: { userId: user.id } })
        setSocket(socketInstance)
        searchFriendship({ socket: socketInstance, friendshipId, user })
    }, [user, socket, friendshipId])

    const subscribeInChannels = useCallback(({ adversary, socket, friendshipId }) => {
        socket.removeAllListeners()
        socket.on(`${adversary.id}`, (data: any) => setAdversary(data))
        socket.on(`new-move-${friendshipId}`, (data: any) => {
            const newGamePositions = JSON.parse(data.game)
            setGamePositions(newGamePositions)

            const playerX = data.playerX
            const playerO = data.playerO
            if (adversary.id === playerX.id) {
                setAdversary(playerX)
                let newRequest = data.request_o
                setAdversaryWinners(data.victories_x)
                setMyWinners(data.victories_o)
                setRequest(newRequest)
            }
            else {
                setAdversary(playerO)
                let newRequest = data.request_x
                setAdversaryWinners(data.victories_o)
                setMyWinners(data.victories_x)
                setRequest(newRequest)
            }

            const nextPlayer = data.turn
            setAtualPlayer(nextPlayer)

            const newStatus = data.status
            setStatus(newStatus)

            const newWinner = data.winner
            setWinner(newWinner)

        })

    }, [])

    useEffect(() => initialFunc(), [])

    useEffect(() => {
        if (status === 'finished') setModalOpen(true)
        else setModalOpen(false)
    }, [status])

    const clickOnPosition = useCallback(({ x, y }) => {
        console.log({ x, y })
        if (atualPlayer === user.id && status === 'inProgress') {
            const newGamePositions = gamePositions
            if (newGamePositions[y][x] === 0) {
                newGamePositions[y][x] = myType === 'O' ? 1 : -1
                setGamePositions(newGamePositions)
                setAtualPlayer(adversary.id)
                setRequest(null)
                const hasWinner = hasWinnerService({ game: newGamePositions })
                if (hasWinner.status) {
                    setStatus('finished')
                    setWinner(hasWinner.type as ('X' | 'O' | null))
                    setMyWinners((atualMyWinners) => (atualMyWinners + 1))
                }
                else {
                    const isEnd = isFinished({ game: newGamePositions })
                    if (isEnd) {
                        setStatus('finished')
                        setWinner(null)
                    }
                }
                console.log({ x, y, friendshipId })

                socket?.emit('new-move', { friendshipId, x, y })
            }
        }
    }, [atualPlayer, adversaryType, status, myType, gamePositions, user, friendshipId, socket])

    const goBack = useCallback(() => {
        setModalOpen(false)
        setFriendshipId("")
        navigator.navigate('Home')
    }, [])

    const onDismiss = useCallback(() => {
        setModalOpen(false)
    }, [])

    const sendRequest = useCallback(() => {
        setLoadingRequest(true)
        setTimeout(() => {
            socket?.emit('request', { friendshipId, userId: user.id })
            setRequest('required')
            setLoadingRequest(false)
        }, 1000)
    }, [socket, friendshipId, user])

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
                        <Text style={{ borderRadius: 10, backgroundColor: (atualPlayer === adversary.id && status === 'inProgress') ? (adversaryType === 'X' ? '#243189' : '#E51C44') : "#DDE3F0", color: (atualPlayer === adversary.id && status === 'inProgress') ? "#DDE3F0" : (adversaryType === 'X' ? '#243189' : '#E51C44'), margin: 20, width: 50, height: 50, textAlign: "center", textAlignVertical: 'center', fontSize: 22, fontFamily: 'Rajdhani_600SemiBold' }}>{adversaryWinners}</Text>
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
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
                                                    height: Dimensions.get('window').height / 6,
                                                    width: Dimensions.get('window').height / 6,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    {position === 1 ? <IconO height={"50%"} width={"50%"} /> : (position === -1) ? <IconX height={"50%"} width={"50%"} /> : <></>}
                                                </TouchableWithoutFeedback>
                                            )
                                        })}
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, borderTopColor: "#C4C4C4", borderTopWidth: 1, paddingTop: 10, width: "60%" }}>
                            <Image style={{ height: 50, width: 50, borderRadius: 3, marginRight: 20, marginLeft: 20 }} source={{ uri: you.photoUrl }} />
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
                        <Text style={{ borderRadius: 10, backgroundColor: (atualPlayer === user.id && status === 'inProgress') ? (myType === 'X' ? '#243189' : '#E51C44') : "#DDE3F0", color: (atualPlayer === user.id && status === 'inProgress') ? "#DDE3F0" : (myType === 'X' ? '#243189' : '#E51C44'), margin: 20, marginTop: 30, width: 50, height: 50, textAlign: "center", textAlignVertical: 'center', fontSize: 22, fontFamily: 'Rajdhani_600SemiBold' }}>{myWinners}</Text>
                    </View>
                </View>
            }
            {loading &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="#E51C44" size={30} />
                </View>
            }
            {modalOpen &&
                <Modal visible={modalOpen} dismissable={false} onDismiss={onDismiss} contentContainerStyle={{ backgroundColor: "#0B1138", position: "relative", margin: 20, padding: 20, elevation: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {winner &&
                            <>
                                <Text style={{ color: "#FFF", fontFamily: "Rajdhani_600SemiBold", fontSize: 24, marginRight: 5 }}>Vitória do jogador</Text>
                                {winner === 'X' &&
                                    <IconX width={24} height={24} />
                                }
                                {winner === 'O' &&
                                    <IconO width={24} height={24} />
                                }
                            </>
                        }
                        {!winner &&
                            <Text style={{ color: "#FFF", fontFamily: "Rajdhani_600SemiBold", fontSize: 24, marginRight: 5 }}>Empate</Text>
                        }
                    </View>
                    <RectButton onPress={sendRequest} enabled={!loadingRequest && !request} style={{ backgroundColor: "#E51C44", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, padding: 10, borderRadius: 3 }}>
                        <Text style={{ textAlign: 'center', marginRight: 5, color: "#FFF", fontFamily: "Rajdhani_600SemiBold", position: 'relative', fontSize: 18 }}>
                            {!loadingRequest ? (!request ? 'Solicitar revanche' : 'Revanche solicitada') : 'Aguarde'}
                        </Text>
                        {!loadingRequest ? <></> : <Loading />}
                    </RectButton>
                    <RectButton onPress={goBack} style={{ backgroundColor: "#E51C44", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, padding: 10, borderRadius: 3 }}>
                        <Text style={{ textAlign: 'center', marginRight: 5, color: "#FFF", fontFamily: "Rajdhani_600SemiBold", position: 'relative', fontSize: 18 }}>
                            Voltar para Home
                        </Text>
                    </RectButton>
                </Modal>
            }
        </View>
    )
}