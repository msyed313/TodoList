import { View, Text, ImageBackground, StyleSheet, StatusBar, Pressable, Dimensions } from 'react-native'
import React from 'react'
const{width,height}=Dimensions.get('window')
const Home = ({navigation}) => {
  return (
    <ImageBackground source={require('../assets/CloudsBackground.png')} style={styles.main} >
         <StatusBar backgroundColor='skyblue' barStyle='dark-content' />
         <View style={styles.v1}>
             <Pressable style={styles.button} onPress={()=>navigation.navigate('tasks')}>
                <Text style={styles.buttonText}>Tasks</Text>
             </Pressable>
             <Pressable style={styles.button} onPress={()=>navigation.navigate('addtask')}>
                <Text style={styles.buttonText}>Add Task</Text>
             </Pressable>
         </View>
    </ImageBackground>
  )
}
const styles=StyleSheet.create({
    main:{
        flex:1
    },
    v1:{
       // backgroundColor:'red',
        width:'80%',
        alignItems:'center',
        alignSelf:'center',
        marginTop:height*0.03,
        gap:width*0.05,
        paddingVertical:height*0.015
    },
    button:{
        backgroundColor: '#7E25D7',
        width:'60%',
        alignItems:'center',
        borderRadius:30
    },
    buttonText:{
        fontSize:width*0.06,
        color:'white',
        fontWeight:'500'
    }
})
export default Home