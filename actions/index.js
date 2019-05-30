import axios from "axios";

import { API_KEY } from "../constant";
import { SET_CURRENT_WEATHER } from "./action-types"
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getCurrentWeatherByCity = city => async dispatch => {
  const response = await axios.get(`${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
  dispatch({
    type: SET_CURRENT_WEATHER,
    payload: response.data
  });
};
