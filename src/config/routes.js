import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Platform,StyleSheet, Text, View,FlatList ,TouchableOpacity,Button,Dimensions} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';
import Login from '../screens/Login';


const AppLoginNavigator = createStackNavigator({
    LoginScreen: {
        screen: Login,
    },
    MainScreen : {
        screen: MainScreen,
        navigationOptions({navigation}){
            return {
                title:'Restaurant List',
                headerStyle: {  
                    backgroundColor: '#50c878',
                },
                headerTitleStyle:{
                    textAlign:"center", 
                    flex:1,
                    width:Dimensions.get('screen').width 
                },
                headerTintColor: '#fff',
                headerLeft:<Text style={{color:"#fff"}} onPress={()=>navigation.goBack()}>Back</Text>,
                headerLeftContainerStyle:{paddingLeft:10},
                headerRight:<Text></Text>,
                headerRightContainerStyle:{paddingRight:10}
            }
        }
    },
    MapScreen: {
        screen: MapScreen,
        navigationOptions({navigation}){
            return {
                title:'Map View',
                headerStyle: {  
                    backgroundColor: '#50c878',
                },
                headerTitleStyle:{
                    textAlign:"center", 
                    flex:1,
                    width:Dimensions.get('screen').width 
                },
                headerTintColor: '#fff',
                headerLeft:<Text style={{color:"#fff"}} onPress={()=>navigation.goBack()}>Back</Text>,
                headerLeftContainerStyle:{paddingLeft:10},
                headerRight:<Text></Text>,
                headerRightContainerStyle:{paddingRight:10}
            }
        }
    },
},
    {
        initialRouteName: 'LoginScreen',
        mode:'card',
    });



const AppSwitchNavigator = createSwitchNavigator({
    Login: { screen: AppLoginNavigator }
})


export const AppContainer = createAppContainer(AppSwitchNavigator);
