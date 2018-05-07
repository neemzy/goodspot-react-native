import React from "react";
import { Alert } from "react-native";
import AdForm from "./AdForm";

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: "Edit ad"
  };

  editAd({ title, description, price }) {
    const { user, ad } = this.props.navigation.state.params;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "User " + user.id);

    const payload = {
      title,
      description,
      price: price ? parseInt(price) : null
    };

    fetch(
      "http://192.168.1.3:3000/ads/" + ad.id,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(payload)
      }
    )
      .then(response => {
        if (!response.ok) {
          throw Error();
        }

        return response;
      })
      .then(() => {
        this.props.navigation.navigate("Ad", { user, ad: { ...ad, ...payload } });
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Submit failed");
      });
  }

  render() {
    return (
      <AdForm
        ad={this.props.navigation.state.params.ad}
        onSubmit={data => this.editAd(data)}
      />
    );
  }
}
