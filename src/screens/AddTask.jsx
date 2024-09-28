import { View, Text, Button, Dimensions, TextInput, StyleSheet, ImageBackground, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import sqlite from 'react-native-sqlite-storage';

const { width, height } = Dimensions.get('window');

const AddTask = ({ navigation }) => {
  const [item, setItem] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function saveData() {
    // Check if input is empty
    if (!item.trim()) {
      setErrorMessage('Please add an item before saving.');
      return;
    }

    // If input is valid, clear the error message and proceed
    setErrorMessage('');

    let db = await sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(function (t) {
      t.executeSql(
        'INSERT INTO Task (item) VALUES (?)',
        [item],
        (tx, resultSet) => {
          console.log(JSON.stringify(resultSet));
          Alert.alert('Success', 'Item added');
          setItem('')
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
      <TextInput
        placeholder='Add item'
        style={styles.input}
        onChangeText={setItem}
        value={item}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Add Item</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.03,
    borderBottomColor: 'red',
    fontSize: width * 0.05,
  },
  error: {
    color: 'red',
    fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: height * 0.01,
  },
  button: {
    backgroundColor: '#7E25D7',
    alignSelf: 'center',
    width: '55%',
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

export default AddTask;
