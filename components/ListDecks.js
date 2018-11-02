import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { theme, Title, SubTitle, LinkBtn } from '../utils/layout'
import { decksFetchData } from '../actions'
import { gray, slategray } from '../utils/colors'

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
  state = {
    loading: true,
  }

  componentDidMount() {
    this.props.dispatch(decksFetchData())
      .then((data) => {
        this.setState({ loading: false})
      })
  }

  render() {
    const { loading } = this.state

    if ( loading ){
      return <ActivityIndicator size="large" color={slategray} />
    }

    const { decks, navigation } = this.props

    if (Object.keys(decks).length === 0) {
      return (
        <View style={{flex:1}}>
          <View style={[theme.Box]}>
            <SubTitle customStyle={styles.TextCenter}>You don't have decks 🙄</SubTitle>
            <LinkBtn 
              customStyle={styles.TextCenter} 
              label='Create your deck!' 
              onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'AddDeck' }))} 
            />
          </View>
        </View>
      )
    }

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
  TextCenter: {
    textAlign: 'center',
  },
})

const mapStateToProps = ({decks}) => { 
  return {
    decks
  } 
}

export default connect(mapStateToProps)(ListDecks)