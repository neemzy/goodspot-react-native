import React from "react";
import { Alert, Button, TextInput, View } from "react-native";
import styles from "../styles";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Log in"
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  logIn() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(
      "http://192.168.1.3:3000/login",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      }
    )
      .then(response => {
        if (!response.ok) {
          console.log(response.status);
          throw Error();
        }

        return response;
      })
      .then(response => response.json())
      .then(user => {
        this.props.navigation.navigate("Home", { user });
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Login failed");
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email address"
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          style={styles.field}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          style={styles.field}
        />
        <Button onPress={() => this.logIn()} title="Log in" disabled={!this.state.email || !this.state.password} />
      </View>
    );
  }
}
