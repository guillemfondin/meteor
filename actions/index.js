import axios from "axios";
import { API_KEY, FACEBOOK_APP_ID } from "../constant";
import {FACEBOOK_LOGIN_ERROR, FACEBOOK_LOGIN_SUCCESS, SET_CURRENT_WEATHER, SET_FORECAST_WEATHER} from "./action-types"
import { Facebook } from "expo";
import { AsyncStorage } from "react-native";

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getCurrentWeatherByCity = city => async dispatch => {
  const response = await axios.get(`${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
  dispatch({
    type: SET_CURRENT_WEATHER,
    payload: response.data
  });
};

export const getForecastWeatherByCity = city => async dispatch => {
  const response = await axios.get(`${FORECAST_WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
  dispatch({
    type: SET_FORECAST_WEATHER,
    payload: response.data
  });
};

export const facebookLogin = (onSucess, onError) => dispatch => {
  Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permission: ["public_profil"]
  }).then(fbResponse => {
    if (fbResponse.type === "success") {
      dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: fbResponse.token
      });
      AsyncStorage.setItem("fbToken", fbResponse.token);
      onSucess && onSucess();
    } else {
      dispatch({
        type: FACEBOOK_LOGIN_ERROR
      });
      onError && onError();
    }
  }).catch(error => {
    dispatch({
      type: FACEBOOK_LOGIN_ERROR
    });
    onError && onError();
  });
};