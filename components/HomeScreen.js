import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import styles from "../styles";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "TheGoodSpot"
  };

  constructor(props) {
    super(props);

    this.state = {
      ads: []
    };
  }

  componentWillMount() {
    fetch("http://192.168.1.3:3000/ads")
      .then(response => response.json())
      .then(ads => {
        this.setState({ ads });
      });
  }

  render() {
    const { navigate, state } = this.props.navigation;
    const user = state.params && state.params.user ? state.params.user : null;

    return (
      <View>
        {!user ? null : ( // eslint-disable-line multiline-ternary, no-extra-parens
          <Text style={styles.paragraph}>Logged in as <Text style={styles.bold}>{state.params.user.name}</Text>!</Text>
        )}
        <FlatList
          data={this.state.ads}
          renderItem={({ item }) => <Button onPress={() => navigate("Ad", { ad: item, user })} title={item.title} />}
          keyExtractor={item => String(item.id)}
        />
        {user ? ( // eslint-disable-line no-extra-parens
          <View>
            <Button onPress={() => navigate("MyAds", { user })} title="My ads only" />
            <Button onPress={() => navigate("New", { user })} title="New ad" />
          </View>
        ) : ( // eslint-disable-line no-extra-parens
          <Button onPress={() => navigate("Login")} title="Log in" />
        )}
      </View>
    );
  }
}
