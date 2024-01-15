import React, { createContext, useEffect, useReducer } from 'react';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import geoApi from '../api/geoApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}
//AsyncStorage.removeItem('token');

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        //no token no autenticado
        if (!token) return dispatch({ type: 'notAuthenticated'})
        //hay token
        const resp = await geoApi.get('/auth');
        if (resp.status !== 200 ){
            return dispatch({ type: 'notAuthenticated'});
        }
        await AsyncStorage.setItem('token', resp.data.token);
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })
    }

    const signUp = async ( { nombre, correo, password }: RegisterData ) => {
        dispatch({ type: 'check'});
        try {
            const resp = await geoApi.post<LoginResponse>('/usuarios', { correo, password, nombre }, { timeout: 5000 } );
            console.log(resp.data);
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            console.log(error.request);
            
            try {
                if(error.request._timedOut){
                    dispatch({
                        type: 'addError',
                        payload: 'Error de conexión'
                    })
                }else{
                    dispatch({
                        type: 'addError',
                        payload: error.response.data.errors[0].msg
                    })
                }
            }catch {
                dispatch({
                    type: 'addError',
                    payload: 'Revise la información'
                })
            }
        }
    };
    const signIn = async( { correo, password }: LoginData ) => {
        dispatch({ type: 'check'});
        
        try {
            const resp = await geoApi.post<LoginResponse>('/auth/login', { correo, password }, { timeout: 5000 } );
            console.log('zii');
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error: any) {
            try {
                if(error.request._timedOut){
                    dispatch({
                        type: 'addError',
                        payload: 'Error de conexión'
                    })
                }else{
                    dispatch({
                        type: 'addError',
                        payload: error.response.data.errors[0].msg
                    })
                }
            }catch {
                dispatch({
                    type: 'addError',
                    payload: 'Usuario / Password no son correctos'
                })
            }
        }
    };




    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout'});
    };
    const removeError = () => {
        dispatch({ type: 'removeError'});
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,

        }}>
            { children }
        </AuthContext.Provider>
    )
} 