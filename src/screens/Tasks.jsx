import { View, Text, ImageBackground, StyleSheet, ScrollView, Dimensions, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import sqlite from 'react-native-sqlite-storage';

const { width, height } = Dimensions.get('window');

const Tasks = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    let db = await sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(function (t) {
      t.executeSql(
        'SELECT * FROM Task',
        [],
        (tx, resultSet) => {
          let taskList = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            taskList.push(resultSet.rows.item(i));
          }
          setTasks(taskList);
          console.log("Tasks: ", taskList);  // Log tasks to check if fetched correctly
        },
        error => {
          console.log("Error fetching tasks: ", JSON.stringify(error));
        }
      );
    });
  }

  const handleDelete = async (id) => {
    let db = await sqlite.openDatabase({ name: 'demo.db' });
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Task WHERE id = ?',
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
            console.log('Task deleted successfully');
          } else {
            console.log('No task found with the given id');
          }
        },
        error => {
          console.log('Error deleting task:', error);
        }
      );
    });
  };

  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')} style={styles.main}>
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeaderView}>
          <Text style={styles.tableHeaderText}>Srno</Text>
          <Text style={styles.tableHeaderText}>Text</Text>
          <Text style={styles.tableHeaderText}>Action</Text>
        </View>

        {/* Scrollable Task List */}
        <ScrollView >
          <View style={{ width: '100%' }}>
            {tasks.length > 0 ? (
              tasks.map((item, index) => (
                <View key={index} style={[styles.tableRowView, index % 2 && styles.tableRowAlt]}>
                  <Text style={styles.tableRowText}>{index + 1}</Text>
                  <Text style={styles.tableRowText}>{item.item}</Text>
                  <View style={[styles.tableRowText, { flexDirection: 'row', justifyContent: 'center' }]}>
                    <Pressable style={styles.action} onPress={() => navigation.navigate('edit', { id: item.id })}>
                      <Image source={require('../assets/edit.png')} style={{ tintColor: 'blue' }} />
                    </Pressable>
                    <Pressable style={styles.action} onPress={() => handleDelete(item.id)}>
                      <Image source={require('../assets/delete.png')} style={{ tintColor: 'red' }} />
                    </Pressable>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noTasksText}>No tasks available</Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Back Button */}
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
  tableContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
  },
  tableHeaderView: {
    flexDirection: 'row',
    backgroundColor: '#28b5b5',
    paddingVertical: height * 0.015,
    justifyContent: 'space-around',
  },
  tableHeaderText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  tableRowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: width * 0.02,
  },
  tableRowAlt: {
    backgroundColor: '#f2f2f2',
  },
  tableRowText: {
    fontSize: width * 0.045,
    textAlign: 'center',
    color: 'black',
    width: '33%',
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: '40%',
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
  noTasksText: {
    textAlign: 'center',
    marginVertical: height * 0.05,
    fontSize: width * 0.05,
    color: 'gray',
  },
});

export default Tasks;
