import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`

export const Title = styled.Text`
    font-size: 24px;
    color:#F4EDE8;
    /* font-family: 'RobotoSlab-Medium'; */
    margin:64px 0 24px;
`

export const CreateAccountButton = styled.TouchableOpacity`
    
    background-color: #312E38;
    border-top-width:1px;
    border-top-color:#232129;
    padding:16px 0px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const CreateAccountButtonText = styled.Text`
    color:#FFF;
    font-size: 18px;
    /* font-family:'RobotoSlab-Regular'; */
    margin-left: 16px;
`