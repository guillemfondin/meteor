import React from "react";
import { Animated, Text, View, PanResponder, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { kelvinToCelcius } from "../services/temperature";

const CARD_INITIAL_Y_POSITION = hp("80%");
const CARD_INITIAL_X_POSITION = wp("5%");
const TRESHHOLD_TO_TOP = hp("75%");
const TRESHHOLD_TO_BOTTOM = hp("70%");
const CARD_OPEN_POSITION = hp("45%");
const MAX_DRAG_ZONE_WHEN_OPEN = hp("65%")
const ICON_URL = "https://openweathermap.org/img/w/";

class WeatherCard extends React.Component {
  state = {
    panResponder: undefined,
    isOpen: false
  };

  componentDidMount() {
    this.position = new Animated.ValueXY();
    this.position.setValue({
      x: CARD_INITIAL_X_POSITION,
      y: CARD_INITIAL_Y_POSITION
    });
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder:() => true,
      onPanResponderMove:(event, gesture) => {
        if (!(this.state.isOpen && gesture.y0 > MAX_DRAG_ZONE_WHEN_OPEN)) {
          this.position.setValue({
            x: CARD_INITIAL_X_POSITION,
            y: gesture.moveY
          })
        }
      },
      onPanResponderRelease:(event, gesture) => {
        if (!this.state.isOpen) {
          if (gesture.moveY <= TRESHHOLD_TO_TOP) {
            this.setOpenPosition(() => this.setState({
              isOpen: true
            }));
          } else {
            this.resetPosition();
          }
        } else {
          if (gesture.moveY <= TRESHHOLD_TO_BOTTOM) {
            this.setOpenPosition();
          } else {
            if (gesture.y0 < MAX_DRAG_ZONE_WHEN_OPEN) {
              this.resetPosition(() => this.setState({
                isOpen: false
              }));
            }
          }
        }
      }
    });
    this.setState({ panResponder })
  }

  setOpenPosition = done => {
    Animated.spring(this.position, {
      toValue: {
        x: CARD_INITIAL_X_POSITION,
        y: CARD_OPEN_POSITION
      }
    }).start(() => done && done());
  };

  resetPosition = done => {
    Animated.spring(this.position, {
      toValue: {
        x: CARD_INITIAL_X_POSITION,
        y: CARD_INITIAL_Y_POSITION
      }
    }).start(() => done && done());
  };

  getCardStyle() {
    return {
      width: wp("90%"),
      height: hp("110%"),
      borderRadius: 10,
      zIndex: 2,
      backgroundColor: "#fff",
      elevation: 1,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 2,
        width: 2
      },
      position: "absolute",
      left: CARD_INITIAL_X_POSITION,
      padding: hp("2%"),
      ...this.position.getLayout()
    }
  }

  renderHeader() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 30,
            marginTop: hp("1%")
          }}
        >
          {this.props.currentWeather.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginTop: hp("1%"),
              fontSize: 35
            }}
          >
            {kelvinToCelcius(this.props.currentWeather.main.temp) + " °C"}
          </Text>
          <Image
            style={{
              height: 60,
              width: 60
            }}
            source={{
              uri: `${ICON_URL}${this.props.currentWeather.weather[0].icon}.png`
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    return this.state.panResponder ?
      <Animated.View
       style={this.getCardStyle()}
       {...this.state.panResponder.panHandlers}
      >
        {this.renderHeader()}
      </Animated.View> :
      <View />
  }
}

export default WeatherCard;