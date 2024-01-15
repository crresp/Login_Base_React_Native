import React from "react";  
import { Dimensions, Image, View } from "react-native";

const screenWidth = Dimensions.get('window').width;

// Ajusta estos porcentajes y el margen según tus necesidades
const widthPercentage = 60;
const heightPercentage = 60;

const width = (screenWidth * widthPercentage) / 100;
const height = (width * heightPercentage) / 100;

export const Logo = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image 
                source={ require('../assets/logo.png') }
                style={{
                    width,
                    height
                }}
            />
        </View>
    )
}