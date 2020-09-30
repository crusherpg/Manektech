import React, {Component} from 'react';
import {ToastAndroid,ActivityIndicator,Platform,StyleSheet, Text, View,FlatList ,TouchableOpacity,Button,Dimensions,Image, AsyncStorage} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const axios = require('axios');


export default class MainScreen extends Component {
    constructor(){
        super();
        let isPortrait = (screenWidth,screenHeight) => {
            if(screenHeight >= screenWidth){
                this.setState({
                    orientation: 'portrait'
                });
            }else{
                this.setState({
                    orientation: 'landscape'
                });
            }
            return screenHeight >= screenWidth;
        };

        this.state = {
            screenHeight : Dimensions.get('screen').height,
            screenWidth : Dimensions.get('screen').width,
            orientation: 'portrait',
            data:[],
            isLoading : true,
            page:1
        }
          // Event Listener for orientation changes
        Dimensions.addEventListener('change', (e) => {
            return this.setState({
                screenHeight: e.screen.height,
                screenWidth:e.screen.width,
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });

    }

    componentDidMount= async()=>{
        try{
            let hasValue =  await AsyncStorage.getItem("dataArray");
            if(hasValue){
                return this.setState({isLoading:false, data: JSON.parse(hasValue)})
            }else{
                return fetch('http://192.249.121.94/~mobile/interview/public/api/restaurants_list')
                .then((response) => response.json())
                .then(async(json) => {
                (ToastAndroid.show("Calling API...", ToastAndroid.SHORT));
                await AsyncStorage.setItem("dataArray",JSON.stringify(json.data))
                return this.setState({isLoading:false, data: json.data})
                })
                .catch((error) => {
                console.error(error);
                });
            }
        }catch(err){
            alert(err)
        }
        
    }

    fillRating=(rating)=>{
        let tempArr=[];
        for(let i=0;i < 5;i++){
            if(i < rating){
                tempArr.push(<Image source={require('../assets/Star-fill.png')} style = {{ width: 10, height: 10 }}></Image>)
            }else{
                tempArr.push(<Image source={require('../assets/Star-empty.png')} style = {{ width: 10, height: 10 }}></Image>)
            }
        }
        return <View style={{flex:1,flexDirection:'row'}}>{tempArr}</View>
    }

    LoadMoreRandomData = () =>{
        this.setState({page:this.state.page+1},()=>this.LoadRandomData())
    }

    render() {
        if (this.state.orientation === 'portrait') {
        return (
            <View style={[styles.container,{width:this.state.screenWidth,height:this.state.screenHeight}]} onLayout={this.isPortrait}>
                <View>
                <FlatList 
                data = {this.state.data}
                extraData = {this.state.isLoading}
                keyExtractor={item => item.id}
                initialNumToRender={10}
                maxToRenderPerBatch={2}
                onEndReachedThreshold={0.5}
                onEndReached={({ distanceFromEnd }) => {
                    (ToastAndroid.show(`Page ${this.state.page+1}`, ToastAndroid.SHORT));
                }}
                renderItem={({item})=>{
                  return ( 
                  <View style={[styles.containerStyle,{width:this.state.screenWidth}]}>
                      <View style={{flex:1,flexDirection:'row',width:this.state.screenWidth}}> 
                            <View style={{padding:5}}>
                                <Image source={require('../assets/img.png')} style = {{ width: 50, height: 50 }}></Image>
                            </View>
                            <View style={{flex:1,width:this.state.screenWidth}}>
                                <View style={{padding:5}}>
                                    <Text>{item.title}</Text>
                                </View>
                                <View style={{padding:5}}>
                                    {
                                        this.fillRating(item.rating)
                                    }
                                </View>
                            </View>
                            <View style={{margin:10}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("MapScreen")}>
                                    <Image source={require('../assets/map.png')} style = {{resizeMode: 'contain', width: 25, height: 25,backgroundColor:'#50c878' }}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                  </View>
                  )
                }}
                />
                </View>
            </View>
          );
      }
      else {
        return (
            <View style={[styles.container,{width:this.state.screenWidth,height:this.state.screenHeight}]} onLayout={this.isPortrait}>
                <View>
                <FlatList 
                data = {this.state.data}
                extraData = {this.state.isLoading}
                keyExtractor={item => item.id}
                initialNumToRender={10}
                maxToRenderPerBatch={2}
                onEndReachedThreshold={0.5}
                onEndReached={({ distanceFromEnd }) => {
                    (ToastAndroid.show(`Page ${this.state.page+1}`, ToastAndroid.SHORT));
                }}
                renderItem={({item})=>{
                  return ( 
                  <View style={[styles.containerStyle,{width:this.state.screenWidth}]}>
                      <View style={{flex:1,flexDirection:'row',width:this.state.screenWidth}}> 
                            <View style={{padding:5}}>
                                <Image source={require('../assets/img.png')} style = {{ width: 50, height: 50 }}></Image>
                            </View>
                            <View style={{flex:1,width:this.state.screenWidth}}>
                                <View style={{padding:5}}>
                                    <Text>{item.title}</Text>
                                </View>
                                <View style={{padding:5}}>
                                    {
                                        this.fillRating(item.rating)
                                    }
                                </View>
                            </View>
                            <View style={{margin:10}}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("MapScreen")}>
                                    <Image source={require('../assets/map.png')} style = {{resizeMode: 'contain', width: 25, height: 25,backgroundColor:'#50c878' }}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                  </View>
                  )
                }}
                />
                </View>
            </View>
          );
      }
  
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },    
  containerStyle: {
    flex:1,
    flexDirection:'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    // width:Dimensions.get('screen').width
},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
