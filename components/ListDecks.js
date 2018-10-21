import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { decksFetchData } from '../actions'
import { gray } from '../utils/colors'

class ListDecks extends Component {

  componentDidMount() {
    this.props.dispatch(decksFetchData())
  }

  render() {
    const { decks } = this.props

    return (
      <View style={{flex: 1}}>
        <Text>List Decks</Text>
        {Object.keys(decks).map((deckId) => {
          const deck = decks[deckId]
          return (
            <View style={styles.deckItem} key={deckId}>
              <View>
                <Text style={{fontSize: 20}}>
                  {deck.title}
                </Text>
                <Text style={{fontSize: 16, color: gray}}>
                  {deck.questions.length}
                </Text>
              </View>
            </View>
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