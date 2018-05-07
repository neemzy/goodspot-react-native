import React from "react";
import { Alert, Button, Text, View } from "react-native";
import styles from "../styles";

export default class AdScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.ad.title });

  formattedPrice() {
    if (this.props.navigation.state.params.ad.price === null) {
      return "TBD";
    }

    return this.props.navigation.state.params.ad.price + " €";
  }

  removeAd() {
    Alert.alert("U SURE?", "", [
      { text: "Cancel", style: "cancel", onPress: () => console.log("Cancel Pressed") },
      { text: "OK", onPress: () => {
        const { user, ad } = this.props.navigation.state.params;
        const headers = new Headers();
        headers.append("Authorization", "User " + user.id);

        fetch(
          "http://192.168.1.3:3000/ads/" + ad.id,
          {
            method: "DELETE",
            headers
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
            Alert.alert("Remove failed");
          });
      } }
    ]);
  }

  render() {
    const { navigate, state } = this.props.navigation;
    const { params } = state;
    const { user, ad } = params;
    const userId = user ? user.id : null;

    return (
      <View>
        <Text style={styles.paragraph}>
          Posted by <Text style={styles.bold}>{ad.user.name}</Text> - <Text style={styles.bold}>{this.formattedPrice()}</Text>
        </Text>
        <Text style={styles.paragraph}>{ad.description}</Text>
        {userId !== ad.user.id ? null : ( // eslint-disable-line multiline-ternary, no-extra-parens
          <View>
            <Button onPress={() => navigate("Edit", { user, ad })} title="Edit" />
            <Button onPress={() => this.removeAd()} title="Delete" />
          </View>
        )}
      </View>
    );
  }
}
