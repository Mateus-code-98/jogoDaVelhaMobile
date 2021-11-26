import React, { useCallback } from "react";
import { Text, Image, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, UserProps } from '../../hooks/auth';
import { useNavigation } from "@react-navigation/core";

export const Home: React.FC = () => {
    const { updateUser } = useAuth()
    const navigator: any = useNavigation()

    const signOut = useCallback(async () => {
        updateUser({} as UserProps)
        await AsyncStorage.multiRemove(['@JDV:token', '@JDV:user'])
    }, [])

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 50, width: 50, borderRadius: 3 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoktTc3yCNfoP9xUxNbytvxSM9tkCsd9WDQ&usqp=CAU" }} />
                    <View style={{ justifyContent: "space-between", marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: "Rajdhani_500Medium", fontSize: 24, color: "#DDE3F0" }}>
                                Olá,
                            </Text>
                            <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0" }}>Tiago</Text>
                        </View>
                        <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 16, color: "#ABB1CC" }} >Seu id é 1S22JK4</Text>
                    </View>
                </View>
                <RectButton style={{ padding: 10, backgroundColor: "#E51C44", borderRadius: 3 }}>
                    <Icon size={30} name="file-copy" color="#FFF" />
                </RectButton>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, marginBottom: 20 }}>
                <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 18, color: "#DDE3F0" }}>Amigos</Text>
                <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 13, color: "#ABB1CC" }}>Total 6</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <View style={{ flexDirection: "row", marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#1D2766", paddingBottom: 10 }}>
                        <Image style={{ height: 50, width: 50, borderRadius: 3 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROFMtsmWYQIC_g4m6iEkdtSsly9B72-0D6QQ&usqp=CAU" }} />
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ justifyContent: "space-between", marginLeft: 20 }}>
                                <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0" }}>
                                    Tiago Luchtenberg
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
                    <View style={{ flexDirection: "row", marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#1D2766", paddingBottom: 10 }}>
                        <Image style={{ height: 50, width: 50, borderRadius: 3 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IpQW139PUiN8X-E7DwUyT3VHeU1yYvOchA&usqp=CAU" }} />
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ justifyContent: "space-between", marginLeft: 20 }}>
                                <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0" }}>
                                    Rodrigo Gonçalves
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
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Image style={{ height: 50, width: 50, borderRadius: 3 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVETOq-mhgUhMfQKHgk7xVqUf_f_bVa_srMA&usqp=CAU" }} />
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ justifyContent: "space-between", marginLeft: 20 }}>
                                <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 24, color: "#DDE3F0" }}>
                                    Diego Fernandes
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
                </View>
                <RectButton onPress={signOut} style={{ padding: 10, backgroundColor: "#E51C44", borderRadius: 3, marginTop: 10 }}>
                    <Text style={{ fontFamily: "Rajdhani_600SemiBold", textAlign: 'center', fontSize: 18, color: "#DDE3F0" }}>Sair</Text>
                </RectButton>
            </View>
        </View>
    )
}