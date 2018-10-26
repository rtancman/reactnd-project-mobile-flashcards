import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { slategray, white, silver, redBlood, green } from './colors'

export const PressBtn = ({ onPress, label = 'SUBMIT' }) => {
  return (
    <TouchableOpacity
      style={[styles.pressBtn, Platform.OS === 'ios' ? styles.iosPressBtn : styles.AndroidPressBtn]}
      onPress={onPress}>
        <Text style={styles.PressBtnText}>{label}</Text>
    </TouchableOpacity>
  )
}

export const SuccessBtn = ({ onPress, label = 'Success' }) => {
  return (
    <TouchableOpacity
      style={[styles.pressBtn, Platform.OS === 'ios' ? styles.iosPressBtn : styles.AndroidPressBtn, styles.successBtn]}
      onPress={onPress}>
        <Text style={styles.PressBtnText}>{label}</Text>
    </TouchableOpacity>
  )
}

export const DangerBtn = ({ onPress, label = 'Danger' }) => {
  return (
    <TouchableOpacity
      style={[styles.pressBtn, Platform.OS === 'ios' ? styles.iosPressBtn : styles.AndroidPressBtn, styles.dangerBtn]}
      onPress={onPress}>
        <Text style={styles.PressBtnText}>{label}</Text>
    </TouchableOpacity>
  )
}

export const LinkBtn = ({ onPress, label = 'Link' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}>
        <Text style={styles.LinkBtnText}>{label}</Text>
    </TouchableOpacity>
  )
}

export const CustomTextField = ({ onChange, label='label', value='', error='' }) => {
  return (
    <TextField
      label={label}
      value={value}
      baseColor={slategray}
      textColor={slategray}
      autoCorrect={false}
      tintColor={silver}
      error={error}
      onChangeText={(val) => onChange(val)}
    />
  )
}

export const Title = ({ children = 'Title' }) => {
  return (
    <Text style={styles.Title}>{children}</Text>
  )
}

export const Grid  = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
})

export const StepProgress = ({step = 0, total = 0}) => {
  let percentage = '100%'
  if ( step > 0 && total > 0 ) {
    percentage = ((step/total) * 100).toFixed(2) + '%'
  }
  return (
    <Text>{step}/{total} - {percentage}</Text>
  )
}

const styles = StyleSheet.create({
  pressBtn: {
    padding: 10,
    backgroundColor: slategray,
    marginBottom: 20,
  },
  successBtn: {
    backgroundColor: green,
  },
  dangerBtn: {
    backgroundColor: redBlood,
  },
  iosPressBtn: {
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidPressBtn: {
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
  },
  PressBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  LinkBtnText: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  Title: {
    color: slategray,
    fontSize: 28,
  }
})