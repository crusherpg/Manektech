import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE,Marker,Callout } from 'react-native-maps';
import { View, Text, Button, StyleSheet, ActivityIndicator,Image,TouchableOpacity } from 'react-native';

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
            isLoading:false,
            coordinate:{latitude: 37.78825,longitude: -122.4324},
            item:{title:'Pritesh',rating:2,lat: 37.78825,long: -122.4324}
        }
    }

    componentDidMount=async()=>{
        await this.setState({
            item:{... this.state.item,
                title:this.props.navigation.state.params.items.title,
                rating:this.props.navigation.state.params.items.rating,
                lat:parseFloat(this.props.navigation.state.params.items.lat),
                long:parseFloat(this.props.navigation.state.params.items.long)}
        }); 
        await this.setState({
            coordinate:{... this.state.coordinate,
            latitude: parseFloat(this.props.navigation.state.params.items.lat),
            longitude: parseFloat(this.props.navigation.state.params.items.long)}
        });
    }
    fillRating=(rating)=>{
        let tempArr=[];
        for(let i=0;i < 5;i++){
            if(i < rating){
                tempArr.push(<Image source={require('../assets/Star-fill.png')} style = {{ width: 10, height: 10 }}></Image>)
            }else{
                tempArr.push(<Image source={require('../assets/Star-empty.png')} style = {{ width: 10, height: 10 }}/>)
            }
        }
        return <View style={{flex:1,flexDirection:'row',marginBottom:10}}><Text>{tempArr}</Text></View>
    }

    render(){
        return(
            // <View style={styles.container}>
            <View style={{flex:1}}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            //   style={styles.map}
              style={{flex:1}}
              region={{
                latitude: this.state.item.lat,
                longitude: this.state.item.long,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              
            >
            {<MapView.Marker coordinate={this.state.coordinate}>
                <Image source={require('../assets/shop-pin.png')} style = {{resizeMode: 'contain', width: 40, height: 40 }}></Image>    
                <Callout style={{padding:5,width:200,backgroundColor:'#fff'}} tooltip>
                        <View style={{flex:1,flexDirection:'row'}}> 
                            <View style={{width:50}}>
                                <Text style={{flex:1,alignSelf:'center'}}><Image source={require('../assets/map-img.png')} style = {{width: 30, height: 30 }}/></Text>
                            </View>
                            <View style={{flex:1,width:150}}>
                                <View style={{paddingHorizontal:5}}>
                                    <Text style={{fontWeight:'bold'}}>{this.state.item.title}</Text>
                                </View>
                                <View style={{margin:5}}>
                                    {
                                        this.fillRating(this.state.item.rating)
                                    }
                                </View>
                            </View>
                        </View>
                </Callout>
            </MapView.Marker>}
            </MapView>
          </View>
        )
    }
}    

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});