import { SET_CURRENT_WEATHER } from "../actions/action-types";

const initialState = {
  currentWeather: undefined
};

export default function(state = initialState, action) {
  if (action.type === SET_CURRENT_WEATHER) {
    return {
      currentWeather: action.payload
    }
  }
  return state;
}