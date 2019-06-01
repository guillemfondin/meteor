import React from 'react';
import SearchScreen from "./screens/search-screen";
import AdvancedDetailSearchScreen from "./screens/advanced-detail-screen";
import store from "./store";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

const StackNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Detail: AdvancedDetailSearchScreen
  },
  {
    initialRouteName: "Search",
    headerMode: "none"
  }
);

const Routes = createAppContainer(StackNavigator);