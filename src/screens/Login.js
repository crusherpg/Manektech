import React, { Component } from 'react';
import { AsyncStorage, View, Text, StyleSheet, TouchableOpacity, ToastAndroid, StatusBar, ImageBackground } from 'react-native';
import { Item, Input, Label } from 'native-base';
import Image_01 from '../assets/p.jpg';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    static navigationOptions = {  
        header:null  
    };  

    componentWillMount() {
        AsyncStorage.setItem("Email", "a@a.com");
        AsyncStorage.setItem("Password", "a123");
    }

    onLogin = async () => {
        try {
            let isEmpty = this.validate(this.state.email);
            if (isEmpty && this.state.password) {
                let originalEmail = await AsyncStorage.getItem("Email");
                let originalPassword = await AsyncStorage.getItem("Password");
                console.log(this.state.email,this.state.password,originalEmail,originalPassword);
                if (this.state.email == originalEmail && this.state.password == originalPassword) {
                    (ToastAndroid.show("Login Successful", ToastAndroid.SHORT));
                    return this.props.navigation.navigate("MainScreen")
                } else {
                    return (ToastAndroid.show("Invalid Credentials", ToastAndroid.SHORT))
                }

            } else {
                if (this.state.email == '' && this.state.password == '') {
                    return (ToastAndroid.show('Please fill the credentials', ToastAndroid.SHORT))
                } else {
                    return (ToastAndroid.show('Please Enter Valid Credentials', ToastAndroid.SHORT))
                }
            }
        } catch (err) {
            alert(JSON.stringify(err));
        }
    }

    onForgotPassword = () => {
        let isEmpty = this.validate(this.state.email);
        if (isEmpty) {
            return alert("Forgot Password is pressed")
        } else {
            return (ToastAndroid.show('Email is incorrect', ToastAndroid.SHORT))
        }
    }

    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bgImage}>
                    <ImageBackground style={styles.bgImage} source={Image_01}  >
                    </ImageBackground>
                </View>
                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.mainText}>Login</Text>
                        <Text style={styles.smallText}>Please login to your account</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.formItem}>
                            <Item floatingLabel>
                                <Label style>Email Address</Label>
                                <Input onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
                            </Item>
                        </View>
                        <View style={styles.formItem}>
                            <Item floatingLabel>
                                <Label style>Password</Label>
                                <Input secureTextEntry={true} onChangeText={(pass => { this.setState({ password: pass }) })} value={this.state.password} />
                            </Item>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View>
                            <TouchableOpacity onPress={() => { this.onForgotPassword() }}>
                                <Text style={styles.txtBtn}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity onPress={() => { this.onLogin() }}>
                                <Text style={styles.btnTxt}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    componentWillUnmount() {
        alert("componentWillUnmount")
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1.3,
    },
    bgImage: {
        flex: 1,
        width: "100%",
    },
    bodyContainer: {
        paddingTop: 50,
        padding: 20,
        marginTop: -20,
        flex: 2,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    backImage: {
        position: 'absolute',
        height: 35,
        width: 35,
        top: 35,
        left: 10
    },
    mainText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "#000"
    },
    smallText: {
        color: 'lightgrey'
    },
    form: {
        marginTop: 15
    },
    formItem: {
        marginTop: 20
    },
    txtBtn: {
        color: '#50c878',
        fontWeight: 'bold',
        fontSize: 14
    },
    btnTxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    btn: {
        borderRadius: 3,
        backgroundColor: '#50c878',
        padding: 6,
        paddingHorizontal: 30,
        marginTop: '10%'
    },
    btnContainer: {
        marginTop: '5%'

    },
    btnMainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    }

})