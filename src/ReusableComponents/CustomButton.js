import React from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomButton = ({ text, onPress, border=0, width="100%" ,icon ,backgroundColor ,borderColor }) => {
  const btnTextColor = (backgroundColor ? '#ffffff' : (borderColor ? borderColor : '#ffffff'))  ;
  const iconName = (icon) ? icon : null;
  const btnSize = width ? (width.includes("%") ? width : parseInt(width)) : "100%";  
  const containerCommonStyle = {
    backgroundColor: backgroundColor,
    paddingVertical: 8,
    width: btnSize
  }
  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  }

  const borderStyle = border && { borderColor: borderColor, borderWidth: parseInt(border) }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[containerCommonStyle, borderStyle]}>
          <View style={{flexDirection:"row" ,justifyContent:'center',alignItems:'center'}}> 
                <Text style={[textCommonStyle]}> {text} </Text>
                {iconName  ?  <MaterialIcons name={iconName?iconName:null} color= {btnTextColor} size={20} />  : null }
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton