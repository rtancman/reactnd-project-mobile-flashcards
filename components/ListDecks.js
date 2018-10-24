import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { decksFetchData } from '../actions'
import { gray } from '../utils/colors'

class ListDecks extends Component {

  componentDidMount() {
    this.props.dispatch(decksFetchData())
  }

  render() {
    const { decks, navigation } = this.props

    return (
      <View style={{flex: 1}}>
        <Text>List Decks</Text>
        {Object.keys(decks).map((deckId) => {
          const deck = decks[deckId]
          return (
            <TouchableOpacity
              key={deckId}
              onPress={() => navigation.navigate(
                'DeckDetail', { title: deck.title, deckId, }
              )}
            >
              <View style={styles.deckItem}>
                <View>
                  <Text style={{fontSize: 20}}>
                    {deck.title}
                  </Text>
                  <Text style={{fontSize: 16, color: gray}}>
                    {deck.questions.length}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckItem: {
    flexDirection: 'row',
    marginTop: 12
  },
})

const mapStateToProps = ({decks}) => { 
  return {
    decks
  } 
}

export default connect(mapStateToProps)(ListDecks)