import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native'
import { PressBtn, Grid, Title, CustomTextField } from '../utils/layout'
import { createDeck } from '../utils/api'

class AddDeck extends Component {
  state = {
    title: '',
    errorTitle: '',
  }

  onSubmit() {
    const { title } = this.state

    if( title === '' ){
      this.setState({ errorTitle: 'this field is required'})
    }else{
      createDeck(title)
      this.setState({ title: '', errorTitle: ''})
    }
  }

  render() {
    const { title, errorTitle } = this.state;

    return (
      <View style={Grid.container}>
        <Title>Add New Deck</Title>
        <CustomTextField
          label='Title'
          value={title}
          error={errorTitle}
          onChange={(title) => this.setState({ title })}
        />
        <PressBtn onPress={() => this.onSubmit()} label='SAVE' />
      </View>
    );
  }
}

export default AddDeck