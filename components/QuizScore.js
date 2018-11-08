import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Platform, FlatList, Text, StyleSheet } from 'react-native'
import uuidv4 from 'uuid/v4'
import { Ionicons } from '@expo/vector-icons'
import { Grid, Title, SubTitle, ScreenTitle } from '../utils/layout'
import { gray, white, ghostwhite, slategray } from '../utils/colors'


const QuizScoreRender = ({position, score}) => {
  const lineColor = position%2 === 0? ghostwhite : white
  return (
    <View style={[Grid.container, styles.Table, {backgroundColor: lineColor, margin: 0}]}>
      <View style={[Grid.row, styles.TableLine]}>
        <Text style={{fontSize: 16, color: slategray}}>{position}.</Text>
        <Text style={{fontSize: 20, color: slategray}}>{score} {score <= 1? 'point': 'points'}</Text>
      </View>
    </View>
  )
}

class QuizScore extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  render() {
    const { scores } = this.props
    
    if (scores.length < 1 ) {
      return (
        <View style={[Grid.container]}>
          <Title>Your scores</Title>
          <SubTitle>You don't have scores.</SubTitle>
        </View>
      )
    }

    function orderByDesc(a, b) {
      if (a>b) return -1;
      else if (a<b) return 1;
      else return 0;
    }
    scores.sort(orderByDesc)

    return (
      <View style={{flex: 1}}>
        <ScreenTitle 
          title='Your scores'
          customStyle={{marginBottom: 0}}
          icon={<Ionicons name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} size={20} color={white} />} 
        />
        <FlatList
          data={scores.map((value, index) => ({score: value, position: (index + 1), key: uuidv4()}))} 
          renderItem={({item}) => {
            return <QuizScoreRender {...item} />
          }}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  Table: {
    borderWidth: 0.5,
    borderColor: gray,
  },
  TableLine: {
    flex: 1, 
    justifyContent: 'space-between',
  },
})
const mapStateToProps = ({quiz}, {navigation}) => {
  const { deckId } = navigation.state.params
  return {
    scores: deckId in quiz? quiz[deckId] : []
  } 
}

export default connect(mapStateToProps)(QuizScore)