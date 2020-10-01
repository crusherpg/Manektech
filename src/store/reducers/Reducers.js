import { COUNTER_ADD, COUNTER_SUBTRACT, LIST_RESTAURANTS } from "../actions/ActionTypes";
import {Dimensions} from 'react-native';

const initialState = {
  count: 0,
  screenHeight : Dimensions.get('screen').height,
    screenWidth : Dimensions.get('screen').width,
    orientation: 'portrait',
    data:[{"id":1,"title":"test","lat":37.78825,"long":-122.4324,"rating":1}],
    isLoading : true,
    page:1
};

const listRestaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTER_ADD:
      return {
        ...state,
        count: state.count + 1
      };

    case COUNTER_SUBTRACT:
      return {
        ...state,
        count: state.count - 1
    };

    case LIST_RESTAURANTS:
      return {
          ...state,
          count: 0,
          screenHeight : Dimensions.get('screen').height,
            screenWidth : Dimensions.get('screen').width,
            orientation: 'landscape',
            data:action.payload,
            isLoading : false,
            page:1
    };

    default:
      return state;
  }
};

export default listRestaurantReducer;