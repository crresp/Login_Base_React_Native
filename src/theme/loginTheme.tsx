import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 35,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },
    title: {
        color: "rgb(80,80,80)",
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 50,
        textAlign: 'center'
    },
    label: {
        marginTop: 20,
        color: "rgb(80,80,80)",
        fontWeight: 'bold',
        fontSize: 15
        },
    inputField: {
        color: "rgb(80,80,80)",
        fontSize: 15
    },
    inputFieldIOS: {
        borderBottomColor: "rgb(80,80,80)",
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    buttonContainerReturn: {
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        borderWidth: 2,
        borderColor:"rgb(80,80,80)",
        backgroundColor:"rgb(3,110,183)",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 100,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 15
    },
    newUserText: {
        fontSize: 14,
        color: "rgb(3,110,183)",
        fontWeight: 'bold'
    },
    buttonReturn: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor:"rgb(80,80,80)",
        backgroundColor:"rgb(255,0,0)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    },
    OptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20

    }
})