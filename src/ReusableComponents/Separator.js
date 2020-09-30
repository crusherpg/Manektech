import React, { Component } from 'react'
import { Text, 
    StyleSheet, 
    View ,
    ScrollView ,
    Button ,
    TouchableOpacity, 
    ImageBackground, 
    TouchableNativeFeedback,
    Linking,
    Platform
} from 'react-native';

export default Separator = (props) =>{
   return <View {...props} style={[styles.separator,{borderBottomColor:props.color},{...styles.separator}]} />
};

const styles = StyleSheet.create({
    separator:{
    // borderBottomWidth: 1,
    // borderBottomColor:'#d6d3d3',
    paddingTop:10

    }
})