import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Animated } from 'react-native';

export const Loading: React.FC = () => {
    const [dotOne, setDotOne] = useState(new Animated.Value(0))
    const [dotTwo, setDotTwo] = useState(new Animated.Value(0))
    const [dotThree, setDotThree] = useState(new Animated.Value(0))

    const onStartAnimated = useCallback(() => {
        Animated.sequence([
            Animated.timing(dotOne, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300
            }),
            Animated.timing(dotTwo, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300
            }),
            Animated.timing(dotThree, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300
            }),
            Animated.parallel([
                Animated.timing(dotThree, {
                    useNativeDriver: true,
                    toValue: 0,
                    duration: 300
                }),
                Animated.timing(dotTwo, {
                    useNativeDriver: true,
                    toValue: 0,
                    duration: 300
                }),
                Animated.timing(dotOne, {
                    useNativeDriver: true,
                    toValue: 0,
                    duration: 300
                })
            ])
        ]).start(() => onStartAnimated())

    }, [dotOne, dotTwo, dotThree])

    useEffect(() => {
        onStartAnimated()
    }, [])

    return (
        <View style={{ flexDirection: 'row' }}>
            <Animated.Text style={{ fontSize: 18, color: "#FFF", opacity: dotOne }}>.</Animated.Text>
            <Animated.Text style={{ fontSize: 18, color: "#FFF", opacity: dotTwo }}>.</Animated.Text>
            <Animated.Text style={{ fontSize: 18, color: "#FFF", opacity: dotThree }}>.</Animated.Text>
        </View>
    )
}