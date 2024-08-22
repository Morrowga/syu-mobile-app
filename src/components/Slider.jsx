// LoadingOverlay.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { AspectRatio } from 'native-base';

const { width: screenWidth } = Dimensions.get('window');

const Slider = ({ items }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const duplicatedItems = [...items, ...items];

    useEffect(() => {
        const duration = 20000; 

        Animated.loop(
            Animated.sequence([
                Animated.timing(scrollX, {
                    toValue: screenWidth * duplicatedItems.length,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        return () => scrollX.stopAnimation(); 
    }, [scrollX, duplicatedItems]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.slider,
                    {
                        width: screenWidth * duplicatedItems.length,
                        transform: [
                            {
                                translateX: scrollX.interpolate({
                                    inputRange: [0, screenWidth * duplicatedItems.length],
                                    outputRange: [0, -screenWidth * items.length],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    },
                ]}
            >
                {duplicatedItems.map((item, index) => (
                    <View key={index} style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                        <View style={styles.imageContainer}>
                            <AspectRatio w="100%" ratio={16 / 8}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                            </AspectRatio>
                        </View>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    slider: {
        flexDirection: 'row',
    },
    slide: {
        width: screenWidth,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2, 
        shadowRadius: 5, 
        elevation: 5, 
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default Slider;
