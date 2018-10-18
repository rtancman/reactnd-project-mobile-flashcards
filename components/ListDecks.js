import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { listDecks } from '../utils/api'

class ListDecks extends Component {
  state = {
    decks: {}
  }

  componentDidMount () {
    listDecks()
      .then((decks) => this.setState({decks}))
  }

  render() {
    const { decks } = this.state

    console.log(decks)

    return (
      <View style={{flex: 1}}>
        <Text>List Decks</Text>
        <Text>{JSON.stringify(decks)}</Text>
      </View>
    );
  }
}

export default ListDecks