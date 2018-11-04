import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { theme, Title, SubTitle, LinkBtn, Grid, InvertBtn } from '../utils/layout'
import { decksFetchData } from '../actions'
import { gray, slategray, white } from '../utils/colors'

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

  render() {
    const { loading } = this.state

    if ( loading ){
      return <ActivityIndicator size="large" color={slategray} />
    }

    const { decks, navigation } = this.props

    if (Object.keys(decks).length === 0) {
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
  ScreenTitle: {
    backgroundColor: slategray,
    padding: 12,
    marginBottom: 20,
  },
})

const mapStateToProps = ({decks}) => { 
  return {
    decks
  } 
}

export default connect(mapStateToProps)(ListDecks)