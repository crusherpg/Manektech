import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default class MapScreen extends Component {
    constructor() {
        super();
        this.state = {
            response: '',
            isLoading:false
        }
    }

    render(){
        return(
            <View>
                <Text style={{textAlign:'center'}}>Map View</Text>
            </View>
        )
    }
}    