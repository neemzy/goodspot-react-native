import React from "react";
import { Button, TextInput, View } from "react-native";
import styles from "../styles";

export default class AdForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = "ad" in props
      ? { ...props.ad, price: props.ad.price || "" }
      : {
        title: "",
        description: "",
        price: ""
      };
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          style={styles.field}
        />
        <TextInput
          placeholder="Description"
          multiline
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
          style={styles.field}
        />
        <TextInput
          placeholder="Price (leave empty is TBD)"
          keyboardType="numeric"
          onChangeText={price => this.setState({ price })}
          value={String(this.state.price)}
          style={styles.field}
        />
        <Button
          onPress={() => this.props.onSubmit(this.state)}
          title="Submit"
          disabled={!this.state.title || !this.state.description}
        />
      </View>
    );
  }
}
