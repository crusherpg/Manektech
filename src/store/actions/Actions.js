import { COUNTER_ADD, COUNTER_SUBTRACT, LIST_RESTAURANTS } from "./ActionTypes";
import { AsyncStorage, ToastAndroid } from 'react-native';

export const counterAdd = () => {
    return {
        type: COUNTER_ADD
    };
}

export const counterSubtract = () => {
    return {
        type: COUNTER_SUBTRACT
    };
}

export const listRestaurants = () => {
    return async function(dispatch) {
        let hasValue;
            try {
                hasValue =  await AsyncStorage.getItem("dataArray");
                if (hasValue !== null) {
                    // We have data!!
                    alert(JSON.stringify(hasValue));
                }
            } catch (error) {
                // Error retrieving data
                alert(error)
            }
            if(hasValue){
                dispatch({
                    type: LIST_RESTAURANTS,
                    payload: JSON.parse(hasValue)    
                });
            }else{
                return fetch('http://192.249.121.94/~mobile/interview/public/api/restaurants_list')
                .then((response) => response.json())
                .then(async(json) => {
                    // dispatch
                    (ToastAndroid.show(`Calling API...`, ToastAndroid.SHORT));
                    await AsyncStorage.setItem('dataArray',JSON.stringify(json.data));
                    dispatch({
                        type: LIST_RESTAURANTS,
                        payload: json.data    
                    });
                })
                .catch((error) => {
                console.error(error);
                    dispatch({
                        type: LIST_RESTAURANTS,
                        payload: []
                    });      
                });
            }
    };   
}
