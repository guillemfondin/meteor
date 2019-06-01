import React from "react";
import { connect } from "react-redux";
import { View, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";
import { facebookLogin } from "../actions";
import { subscribeToPushNotifications } from "../services/notifications";

class IndexScreen extends React.Component {
  componentDidMount() {
    subscribeToPushNotifications();
    AsyncStorage.getItem("fbToken").then((token => {
      if (token) {
        this.goToSearch();
      } else {
        this.props.facebookLogin(this.goToSearch)
      }
    }));
  }

  goToSearch = () => {
    this.props.navigation.push("Search");
  };

  render() {
    return <View/>;
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {
  facebookLogin
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(
    IndexScreen
  )
);