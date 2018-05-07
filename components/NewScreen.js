import React from "react";
import { Alert } from "react-native";
import AdForm from "./AdForm";

export default class NewScreen extends React.Component {
  static navigationOptions = {
    title: "New ad"
  };

  createAd({ title, description, price }) {
    const user = this.props.navigation.state.params.user;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "User " + user.id);

    fetch(
      "http://192.168.1.3:3000/ads",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          title,
          description,
          price: price ? parseInt(price) : null
        })
      }
    )
      .then(response => {
        if (!response.ok) {
          throw Error();
        }

        return response;
      })
      .then(() => {
        this.props.navigation.navigate("Home", { user });
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Submit failed");
      });
  }

  render() {
    return (
      <AdForm
        onSubmit={data => this.createAd(data)}
      />
    );
  }
}
