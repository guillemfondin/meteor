import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { withNavigation } from "react-navigation";
import { LineChart } from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { kelvinToCelcius } from "../services/temperature";
import { getForecastWeatherByCity } from "../actions";

class AdvancedDetailScreen extends React.Component {

  componentDidMount() {
    const city = this.props.navigation.getParam("city");
    this.props.getForecastWeatherByCity(city);
  }

  getTemperature() {
    return this.props.forecastWeather.list.map(weather => {
      return (kelvinToCelcius(weather.main.temp))
    })
  }

  getHumidity() {
    return this.props.forecastWeather.list.map(weather => {
      return (kelvinToCelcius(weather.main.humidity))
    })
  }

  getLabels() {
    return this.props.forecastWeather.list.map((_, index) => {
      let day = index / 8;
      const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ];
      const now = new Date();
      let nextDay = now.setDate(now.getDate()+day);
      let nameDay = new Date(nextDay);
      return index === 0 ? "Now" : index % 8 === 0  ? days[nameDay.getDay()] : null ;
    })
  }

  renderChart(data) {
    return (
      <LineChart
        data={{
          labels: this.getLabels(),
          datasets: [{
            data
          }]
        }}
        width={wp("90%")} // from react-native
        height={hp("30%")}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  }

  goBack = () => {
    this.props.navigation.goBack()
  };

  renderCharts() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 30,
            paddingTop: hp("1%")
          }}
        >
          {this.props.forecastWeather.city.name} 5 days forecast
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingTop: hp("2%")
          }}
        >
          Temperature (°C)
        </Text>
        {this.renderChart(this.getTemperature())}
        <Text
          style={{
            fontSize: 20,
            paddingTop: hp("2%")
          }}
        >
          Humidity (%)
        </Text>
        {this.renderChart(this.getHumidity())}
        <Button
          title="Back"
          onPress={this.goBack}
          color="blue"
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        {this.props.forecastWeather ?
          this.renderCharts() :
          <Text>Loading...</Text>}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    forecastWeather: state.weather.forecastWeather
  };
};
const mapDispatchToProps = {
  getForecastWeatherByCity
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(
    AdvancedDetailScreen
  )
);