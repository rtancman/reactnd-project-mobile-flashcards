import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { theme, Title, SubTitle, LinkBtn, Grid, InvertBtn, ScreenLoading } from '../utils/layout'
import { decksAndScoresfechData } from '../actions'
import { gray, slategray, white } from '../utils/colors'

const DeckRender = ({id, title, questions, navigation, maxScore}) => {
  return (
    <TouchableOpacity style={[theme.Box]}
      onPress={() => navigation.navigate(
        'DeckDetail', { deckId: id, title,  }
      )}
    >
      <View>
        <Title style={{flex: 1}}>{title}</Title>
        <View style={[Grid.row, {flex: 1, justifyContent: 'space-between'}]}>
          <Text style={{fontSize: 16, color: gray}}>
            {questions.length} Cards
          </Text>
          {maxScore > 0 && (
            <Text style={{fontSize: 16, color: gray}}>
              Max Score: {maxScore}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

class ListDecks extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.props.dispatch(decksAndScoresfechData())
      .then((data) => {
        this.setState({ loading: false})
      })
  }
  
  screenTitle(navigation) {
    return (
      <View style={[Grid.row, styles.ScreenTitle]}>
        <Text style={{fontSize: 22, color: white, marginBottom: 0, flex: 1}}>Decks</Text>
        <InvertBtn
          customStyle={{marginBottom: 0, flex: 1, height: 'auto', padding: 5}}
          onPress={() => navigation.navigate('AddDeck', { title: 'New Deck' })} 
          label='New Deck' 
          icon={Platform.OS === 'ios' ? <Ionicons name='ios-square-outline' size={20} color={slategray} /> : <MaterialCommunityIcons name='cards-outline' size={20} color={slategray} /> }
        />
      </View>
    )
  }

  getMaxScoreByDeckId(deckId) {
    const { quiz } = this.props
    const scores = deckId in quiz? quiz[deckId] : []
  
    return scores.length < 1? 0 : Math.max(...scores)
  }

  render() {
    const { loading } = this.state

    if ( loading ) return <ScreenLoading />

    const { decks, navigation } = this.props

    if (Object.keys(decks).length === 0 && decks.constructor === Object) {
      return (
        <View style={{flex:1}}>
          { this.screenTitle(navigation) }
          <View style={[theme.Box]}>
            <SubTitle customStyle={styles.TextCenter}>You don't have decks 🙄</SubTitle>
            <LinkBtn 
              customStyle={styles.TextCenter} 
              label='Create your deck!' 
              onPress={() => navigation.navigate('AddDeck', { title: 'New Deck' })} 
            />
          </View>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        { this.screenTitle(navigation) }
        <FlatList 
          data={Object.values(decks).map(o => ({...o, key: o.id}))} 
          renderItem={({item}) => {
            const maxScore = this.getMaxScoreByDeckId(item.id)
            return <DeckRender {...item} maxScore={maxScore} navigation={navigation} />
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TextCenter: {
    textAlign: 'center',
  },
  ScreenTitle: {
    backgroundColor: slategray,
    padding: 12,
    marginBottom: 20,
  },
})

const mapStateToProps = ({decks, quiz}) => { 
  return {
    decks,
    quiz
  } 
}

export default connect(mapStateToProps)(ListDecks)