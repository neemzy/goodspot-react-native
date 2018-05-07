import React from "react";
import { Button, FlatList, View } from "react-native";

export default class MyAdsScreen extends React.Component {
  static navigationOptions = {
    title: "My ads"
  };

  constructor(props) {
    super(props);

    this.state = {
      ads: []
    };
  }

  componentWillMount() {
    const user = this.props.navigation.state.params.user;
    const headers = new Headers();
    headers.append("Authorization", "User " + user.id);

    fetch("http://192.168.1.3:3000/my-ads", { headers })
      .then(response => response.json())
      .then(ads => {
        this.setState({ ads });
      });
  }

  render() {
    const { navigate, state } = this.props.navigation;
    const user = state.params.user;

    return (
      <View>
        <FlatList
          data={this.state.ads}
          renderItem={({ item }) => <Button onPress={() => navigate("Ad", { ad: item, user })} title={item.title} />}
          keyExtractor={item => String(item.id)}
        />
        <Button onPress={() => navigate("New", { user })} title="New ad" />
      </View>
    );
  }
}
