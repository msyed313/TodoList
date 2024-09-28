import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import AddTask from '../screens/AddTask'
import Tasks from '../screens/Tasks'
import EditTask from '../screens/EditTask'
import GetTasks from '../screens/GetTasks'
const stack=createNativeStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer>
       <stack.Navigator screenOptions={{headerShown:false}} >
         <stack.Screen name='home' component={Home} />
         <stack.Screen name='addtask' component={AddTask}/>
         <stack.Screen name='tasks' component={Tasks}/>
         <stack.Screen name='edit' component={EditTask}/>
         <stack.Screen name='get' component={GetTasks}/>
       </stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation