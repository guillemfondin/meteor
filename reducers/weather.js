import { SET_CURRENT_WEATHER, SET_FORECAST_WEATHER } from "../actions/action-types";

const initialState = {
  currentWeather: undefined
};

export default function(state = initialState, action) {
  if (action.type === SET_CURRENT_WEATHER) {
    return {
      ...state,
      currentWeather: action.payload
    }
  } else if (action.type === SET_FORECAST_WEATHER) {
    return {
      ...state,
      forecastWeather: action.payload
    }
  }
  return state;
}