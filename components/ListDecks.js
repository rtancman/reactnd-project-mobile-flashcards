import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { theme, Title } from '../utils/layout'
import { decksFetchData } from '../actions'
import { gray } from '../utils/colors'

const DeckRender = ({id, title, questions, navigation}) => {
  return (
    <TouchableOpacity style={[theme.Box]}
      onPress={() => navigation.navigate(
        'DeckDetail', { deckId: id, title,  }
      )}
    >
      <View>
        <Title>
          {title}
        </Title>
        <Text style={{fontSize: 16, color: gray}}>
          {questions.length} Cards
        </Text>
      </View>
    </TouchableOpacity>
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

const mapStateToProps = ({decks}) => { 
  return {
    decks
  } 
}

export default connect(mapStateToProps)(ListDecks)