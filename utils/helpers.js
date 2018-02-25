import React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import {white, lightPurp, red, orange, blue, pink} from './colors'
import {Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = 'UdaciFitness:notification'

export function clearLocalNotifications(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification(){
  return {
    title: 'Log your stats!',
    body: '⏰ dont forget to log your stats for today!',
    ios:{
      sound: true
    },
    android:{
      sound: true,
      priority:'high',
      sticky:false,
      vibrate:true
    }


  }
}

export function setLocalNotification(){

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data=>{
      console.log("data, ", data)
      if (data===null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status})=>{
            if (status === 'granted'){
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate()+1)
              tomorrow.setHours(9)
              tomorrow.setMinutes(15)

              console.log("tomorrow.toString()", tomorrow.toString())

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}



export function getMetricMetaInfo (metric) {
  // unit, step, type, max, getIcon
  const info = {
    run: {
      displayName: 'Run',

      unit: 'miles',
      step: 1,

      max: 50,
      type: 'stepper',
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor: pink}]}>
            <MaterialIcons
              name='directions-run'
              color={white}
              size={35}
            />
          </View>
        )
      }
    },
    bike: {
      displayName: 'Bike',
      max: 100,
      unit: 'miles',
      step: 1,
      type: 'stepper',
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor: lightPurp}]}>
            <MaterialCommunityIcons
              name='bike'
              color={white}
              size={32}
            />
          </View>
        )
      }
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      unit: 'meters',
      step: 100,
      type: 'stepper',
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor: red}]}>
            <MaterialCommunityIcons
              name='swim'
              color={white}
              size={35}
            />
          </View>
        )
      }
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'hours',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor: orange}]}>
            <FontAwesome
              name='bed'
              color={white}
              size={30}
            />
          </View>
        )
      }
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor: blue}]}>
            <MaterialCommunityIcons
              name='food'
              color={white}
              size={35}
            />
          </View>
        )
      }
    },
  }

  return typeof metric === 'undefined'
    ? info
    : info[metric]
}

export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)

  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

  // console.log("date.getFullYear(): ", date.getFullYear())
  // console.log("date.getMonth(): ", date.getMonth())
  // console.log("date.getDate(): ", date.getDate())
  // console.log("todayUTC: ", todayUTC)
  // console.log("todayUTC.toISOString().split('T'): ", todayUTC.toISOString().split('T'))

  return todayUTC.toISOString().split('T')[0]
}

export function getDailyReminderValue(){
  return {
    today: "👋 Don't forget to log your data today!🌵"
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  }
})