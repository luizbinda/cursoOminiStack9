import React, {useState} from 'react'
import {View, Text, StyleSheet, Alert, TextInput, TouchableOpacity ,AsyncStorage} from 'react-native'

import api from '../services/api'


export default function Book({ navigation }){
    const [date, setDate] = useState('')

    const id = navigation.getParam('id')

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user')

        await api.post(`/spots/${id}/bookings`,{
            date 
        }, {
            headers : { user_id}
        }) 
        Alert.alert('Solicitação de reserva enviada')
        navigation.navigate('List')

    }
    async function handleCancel(){
        navigation.navigate('List')

    }
    return (
    <View style={styles.container}> 
        <Text style={styles.label}>Data de reserva *</Text>
            <TextInput
                style={styles.input}
                placeholder="Data que deseja marcar a reserva"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[ styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius:2,
    },
    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        borderRadius: 2,
        alignItems: 'center',
    },
    cancelButton:{
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
})