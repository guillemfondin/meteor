import { Permissions, Notifications } from "expo";
import axios from "axios";

const BASE_URL_SERV_NOTIFICATIONS = "https://mini-notifications.herokuapp.com/?token=";
export const subscribeToPushNotifications = () => {
  Permissions.getAsync(Permissions.NOTIFICATIONS).then(existingPermission => {
    if (existingPermission.status !== "granted") {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(permission => {
        if (permission.status !== "granted") {
          return;
        } else {
          Notifications.getExpoPushTokenAsync().then(token => {
            axios.get(BASE_URL_SERV_NOTIFICATIONS + token)
          });
        }
      });
    } else {
      Notifications.getExpoPushTokenAsync().then(token => {
        axios.get(BASE_URL_SERV_NOTIFICATIONS + token)
      });
    }
  });
};