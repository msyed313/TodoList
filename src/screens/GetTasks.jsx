import { View, Text, TextInput, StyleSheet, ImageBackground, Pressable, Alert, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import sqlite from 'react-native-sqlite-storage';
const { width, height } = Dimensions.get('window');

const GetTasks = ({ navigation }) => {
    const [item, setItem] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState(null);  // Initially null to check for data presence
    
    const getItem = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${item}`);
            const data = await response.json();
            if (response.ok) {
                console.log("Success: ", data);
                setData(data);  // Set the single object here
            } else {
                console.log("error: ", data);
                setErrorMessage('Failed to fetch the data');
            }
        } catch (error) {
            console.log('Error: ', error);
            setErrorMessage('An error occurred while fetching data');
        }
    };

    async function saveData() {
        let db = await sqlite.openDatabase({ name: 'demo.db' });
        db.transaction(function (t) {
            t.executeSql(
                'INSERT INTO Task (u_id,completed,item) VALUES (?,?,?)',
                [data.userId,data.completed,data.title],
                (tx, resultSet) => {
                    console.log(JSON.stringify(resultSet));
                    Alert.alert('Success', 'Item added');
                    setItem('');
                },
                e => {
                    Alert.alert('Error', JSON.stringify(e));
                    console.log(JSON.stringify(e));
                }
            );
        });
    }

    return (
        <ImageBackground source={require('../assets/CloudsBackground.png')} style={styles.main}>
            <View style={styles.inputView}>
                <TextInput
                    placeholder='Enter ID to get item'
                    style={styles.input}
                    onChangeText={setItem}
                    value={item}
                    keyboardType='numeric'
                />
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <Pressable style={styles.inputButton} onPress={getItem}>
                    <Text style={styles.inputButtonText}>Get</Text>
                </Pressable>
            </View>

            <Pressable style={styles.button} onPress={saveData}>
                <Text style={styles.buttonText}>Save Item</Text>
            </Pressable>

            {/* Display the fetched data */}
            {data && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>ID: {data.id}</Text>
                    <Text style={styles.dataText}>Title: {data.title}</Text>
                </View>
            )}

            <Pressable style={styles.backButton} onPress={() => navigation.navigate('home')}>
                <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    inputView: {
        flexDirection: 'row',
        width: '100%',
        height: height * 0.08,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: height * 0.03
    },
    input: {
        borderBottomWidth: 1,
        width: '45%',
        alignSelf: 'center',
        borderBottomColor: 'red',
        fontSize: width * 0.05,
    },
    error: {
        color: 'red',
        fontSize: width * 0.04,
        textAlign: 'center',
        marginTop: height * 0.01,
    },
    inputButton: {
        backgroundColor: '#7E25D7',
        width: '30%',
        alignItems: 'center',
        borderRadius: 30,
        height: height * 0.04,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputButtonText: {
        fontSize: width * 0.05,
        color: 'white',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#7E25D7',
        alignSelf: 'center',
        width: '45%',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: height * 0.03,
        paddingVertical: height * 0.01,
    },
    buttonText: {
        fontSize: width * 0.06,
        color: 'white',
        fontWeight: '500',
    },
    dataContainer: {
        marginTop: height * 0.05,
        padding: 20,
    },
    dataText: {
        fontSize: width * 0.05,
        marginVertical: 5,
        color: '#333',
    },
    backButton: {
        position: 'absolute',
        bottom: width * 0.05,
        right: width * 0.06,
        backgroundColor: 'teal',
        width: width * 0.25,
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    backButtonText: {
        fontSize: width * 0.05,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default GetTasks;
