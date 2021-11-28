import React, { useState } from "react";
import { Text, Image, View, ScrollView, KeyboardAvoidingView } from "react-native";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RectButton, TextInput } from "react-native-gesture-handler";
import { useAuth } from '../../hooks/auth';
import { useNavigation } from "@react-navigation/core";
import { Modal } from 'react-native-paper';

export const Home: React.FC = () => {
    const { signOut, user } = useAuth()
    const navigator: any = useNavigation()
    const nameShort = (name: string) => {
        const nameArray = name.split(' ');
        return `${nameArray[0]} ${nameArray[1]}`
    }
    const [modalOpen, setModalOpen] = useState(true)

    return (
        <View style={{ flexGrow: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between",borderBottomColor:"#C4C4C4",borderBottomWidth:1,paddingBottom:10 }}>
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
                        <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 16, color: "#ABB1CC" }} >Seu id é <Text style={{color:"#E51C44",fontFamily: "Rajdhani_600SemiBold"}}>{user.friendlyId}</Text></Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <RectButton onPress={() => setModalOpen(true)} style={{ padding: 10, width: 50, height: 50, backgroundColor: "#E51C44", borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon2 size={30} name="file-copy" color="#FFF" />
                    </RectButton>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center", marginTop: 10, marginBottom: 20 }}>
                <View>
                    <Text style={{ fontFamily: "Rajdhani_600SemiBold", fontSize: 18, color: "#DDE3F0" }}>Amigos</Text>
                    <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 13, color: "#ABB1CC" }}>Total 6</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <RectButton onPress={() => setModalOpen(true)} style={{ padding: 10, width: 50, height: 50, backgroundColor: "#E51C44", borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon size={20} name="user-plus" color="#FFF" />
                    </RectButton>
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                </ScrollView>
                <RectButton onPress={signOut} style={{ padding: 10, backgroundColor: "#E51C44", borderRadius: 3, marginTop: 10 }}>
                    <Text style={{ fontFamily: "Rajdhani_600SemiBold", textAlign: 'center', fontSize: 18, color: "#DDE3F0" }}>Sair</Text>
                </RectButton>
            </View>
            {modalOpen &&
                <Modal visible={modalOpen} onDismiss={() => setModalOpen(false)} contentContainerStyle={{ backgroundColor: "#0B1138", margin: 20, padding: 20, elevation: 10 }}>
                    <TextInput autoFocus={false} returnKeyType="send" keyboardAppearance="dark" autoCapitalize="none" autoCorrect={false} placeholder="Cole aqui o id do seu amigo" style={{ fontSize: 16, fontFamily: "Rajdhani_600SemiBold", padding: 10, paddingBottom: 5, paddingTop: 5, backgroundColor: "#C4C4C4", borderRadius: 3, color: "#000000" }} placeholderTextColor="#424040" />
                    <RectButton style={{ backgroundColor: "#E51C44", marginTop: 20, padding: 10, borderRadius: 3 }}>
                        <Text style={{ textAlign: 'center', color: "#FFF", fontFamily: "Rajdhani_600SemiBold", fontSize: 18 }}>Adicionar</Text>
                    </RectButton>
                </Modal>
            }
        </View>
    )
}