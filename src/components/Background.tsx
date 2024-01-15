import React from "react";  
import { Image, View } from "react-native";

export const Background = () => {
    return (
        <View>
            <Image 
                source={ require('../assets/fondo.jpg') }
                style = {{
                    position: 'absolute',
                    width: 500,
                    height: 1000,
                    opacity: 0.6
                }}
            />
        </View>
    )
}