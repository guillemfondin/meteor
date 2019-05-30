import React from 'react';
import SearchScreen from "./screens/search-screen";
import store from "./store";
import { Provider } from "react-redux";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  }
}

