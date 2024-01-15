import React, { useContext, useEffect } from 'react';
import { Keyboard, TextInput, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, Alert } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { Logo } from '../components/Logo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ( { navigation }: Props ) => {

    const { signUp, errorMessage, removeError } = useContext ( AuthContext); 

    useEffect(() => {
        if( errorMessage.length === 0 ) return;
        Alert.alert('Registro incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);
    }, [errorMessage])

    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onRegister = () => {
        console.log({email, password, name});
        Keyboard.dismiss();
        signUp({
            nombre: name,
            correo: email,
            password
        })
    }

    return (
        <>
            { /* <Background /> */ } 
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height'}
                >
                <View style= { loginStyles.formContainer }>
                    { /* Keyboar avoid view */ }
                    <Logo />

                    <Text style={ loginStyles.title }>Registro</Text>
                    <Text style={ loginStyles.label }>Nombre:</Text>
                    <TextInput
                        placeholder="Ingrese su nombre:"
                        placeholderTextColor="rgb(180,180,180)"
                        keyboardType="name-phone-pad"
                        underlineColorAndroid= "grey"
                        style= {[
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor= "white"

                        onChangeText={ (value) => onChange(value, 'name')}
                        value = { name }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput
                        placeholder="Ingrese su email:"
                        placeholderTextColor="rgb(180,180,180)"
                        keyboardType="email-address"
                        underlineColorAndroid= "grey"
                        style= {[
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor= "white"

                        onChangeText={ (value) => onChange(value, 'email')}
                        value = { email }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />
                    <Text style={ loginStyles.label }>Contraseña:</Text>
                    <TextInput
                        placeholder="* * * * *"
                        placeholderTextColor="rgb(180,180,180)"
                        underlineColorAndroid= "grey"
                        secureTextEntry= { true }
                        style= {[
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor= "white"

                        onChangeText={ (value) => onChange(value, 'password')}
                        value={ password }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />

                    { /* Button login*/ }
                    <View style={ loginStyles.OptionsContainer } >    
                        { /* Crear una nueva cuenta */}
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.buttonReturn}
                            onPress={ () => navigation.replace('LoginScreen') } 
                        >
                            <Text style={ loginStyles.buttonText}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                           activeOpacity={ 0.8 }
                           style={ loginStyles.button}
                           onPress={ onRegister }
                        >
                            <Text style={ loginStyles.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        </>
    )
}