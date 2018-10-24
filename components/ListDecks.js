import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Grid, Title } from '../utils/layout'
import { decksFetchData } from '../actions'
import { gray } from '../utils/colors'

const DeckRender = ({id, title, questions, navigation}) => {
  return (
    <View style={Grid.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(
          'DeckDetail', { deckId: id, title,  }
        )}
      >
        <View style={styles.deckItem}>
          <View>
            <Text style={{fontSize: 20}}>
              {title}
            </Text>
            <Text style={{fontSize: 16, color: gray}}>
              {questions.length}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

class ListDecks extends Component {

  componentDidMount() {
    this.props.dispatch(decksFetchData())
  }

  render() {
    const { decks, navigation } = this.props

    return (
      <View style={{flex: 1}}>
        <FlatList 
          data={Object.values(decks).map(o => ({...o, key: o.id}))} 
          renderItem={({item}) => {
            return <DeckRender {...item} navigation={navigation} />
          }}
        />
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