import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NoPermissionScreen() {
    const navigation = useNavigation();
    
    function goToProfile() {
        navigation.navigate('Settings');
    }
    
    return (
        <View style={styles.container}>
            <View style={[styles.card, {backgroundColor: '#FFCCCC'}]}>
                <Text style={styles.title}>Access Denied</Text>
                <Text style={styles.message}>You don't have permission for this screen.</Text>
                <Text style={styles.message}>Please check your role in the profile page.</Text>
                <TouchableOpacity onPress={goToProfile} style={styles.button}>
                    <Text style={styles.buttonText}>Go to Profile</Text>
                </TouchableOpacity>
                <Text style={styles.contactAdmin}>Contact the admin to get the necessary access.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    card: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FF6666',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    contactAdmin: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
});
