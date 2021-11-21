import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { TextInputProps, TextInput as TextInputNative } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Container, TextInput, Icon } from './style';

export interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    error: string | null;
}

export interface RefInputProps {
    focus: () => void;
    getValue: () => void;
}

const Input: React.ForwardRefRenderFunction<RefInputProps, InputProps> = ({ name, defaultValue, error, icon, ...rest }, ref) => {
    const inputRef = useRef<TextInputNative>(null)
    const [value, setValue] = useState<string>(defaultValue ? defaultValue : '')
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const focus = useCallback(() => {
        inputRef.current?.focus()
    }, [inputRef])

    const getValue = useCallback(() => {
        return value
    }, [value])

    useImperativeHandle(ref, () => {
        return {
            focus,
            getValue
        };
    });
    
    return (
        <TouchableWithoutFeedback ref={(ref: any) => ref = ref} onPress={() => inputRef.current?.focus()} style={{ width: '100%' }}>
            <Container isErrored={!!error} isFocused={isFocused}>
                <Icon name={icon} size={20} color={isFocused ? '#FF9000' : (!!error ? '#C53030' : (!!value ? '#FF9000' : '#666360'))} />
                <TextInput
                    defaultValue={value}
                    onChangeText={(text) => setValue(text)}
                    ref={inputRef}
                    placeholderTextColor="#666360"
                    {...rest}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </Container>
        </TouchableWithoutFeedback>
    )
}

export default forwardRef(Input)