import React, {useEffect, useState} from 'react';
import {getIdByUsername, loadMoreTweets} from '../Utils/utils';
import {FlatListItem} from '../components/FlatListItem';
import Constants from '../Constants/Constants';
import Colors from '../Constants/Colors.js'
import {
  Text,
  Button,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  ProgressBarAndroid,
  ToastAndroid,
  Platform,
  AlertIOS
} from 'react-native';


export default function HomeScreen() {
  let [usernameText, updateUserNameText]    = useState(Constants.DefaultUsername);
  let [listData, updateListData]            = useState([]);
  let [media, updateMediaData]              = useState(undefined);
  let [mUserId, updateUserId]               = useState(undefined);
  let [appOpen, updateAppOpenFlag]          = useState(true);
  let [progressBar, updateProgressBarFlag]  = useState(true)

  if (appOpen) {
    getIdByUsername(Constants.DefaultUsername, onCompleteListenerFun);
    updateAppOpenFlag(false);
  }

  function onCompleteListenerFun(list, includes, userId) {
    updateProgressBarFlag(false)
    updateUserId(userId);
    if (includes != undefined) updateMediaData(includes.media);
    updateListData(list);
  }

  function loadMoreTweetsM() {
    let lastTweetId = listData[listData.length - 1].id;

    loadMoreTweets(lastTweetId, mUserId, (list, includes) => {
      if (list.length > 0 && list != undefined)
        updateListData(oldList => {
          return [...oldList, ...list];
        });
      if (includes != undefined)
        updateMediaData(oldData => {
          return [...oldData, ...includes.media];
        });
    });
  }

  const renderItem = item => {
    return <FlatListItem item={item.item} media={media} />;
  };

  let progressBarView
  if(progressBar) {
    progressBarView = (
      <View style={styles.progressBar}>
      <ProgressBarAndroid color={Colors.whiteColor}/>
      </View>
    )
  }

  return (
    <View style={styles.root}>
       <StatusBar animated={true} backgroundColor={Colors.colorPrimary}/>
      <View style={styles.actionBar}>
        <Image source={require('../Assets/Images/twitter.png')} style={styles.actionBarImage}/>
        <Text style={styles.actionBarText}>Twitter Timeline</Text>
      </View>

      <View>
        <TextInput style={styles.textInput} value={usernameText} onChangeText={text => {updateUserNameText(text)}}/> 
      </View>

      <View style={styles.buttonRootView}>
        <Button title="Look for Tweets 🚂" color={Colors.colorPrimary} onPress={()=> {
          updateListData([])
          updateProgressBarFlag(true)
          if (usernameText != '')
            getIdByUsername(usernameText, onCompleteListenerFun);
          else{
            updateProgressBarFlag(false)
            if(Platform.OS === 'android')
              ToastAndroid.show("No Username entered", ToastAndroid.SHORT)
            else                                      
              AlertIOS.alert()  
          } 
            }}/>
      </View>

      <View>
        <FlatList data={listData} renderItem={renderItem} onEndReached={loadMoreTweetsM} style={styles.flatList} showsVerticalScrollIndicator={false}/>
      </View>
      
      {progressBarView}
    </View>
  )
}

const styles = StyleSheet.create({
  root                : {
    flex              : 1,
    backgroundColor   : Colors.colorSecondary
  },
  actionBar           : {
    height            : 50,
    backgroundColor   : Colors.colorPrimary,
    alignItems        : 'flex-start',
    alignItems        : 'center',
    flexDirection     : 'row',
  },
  actionBarText       : {
    color             : Colors.whiteColor,
    fontSize          : 25,
    marginStart       : 5,
  },
  textInput           : {
    height            : 40,
    borderBottomWidth : 1,
    borderBottomColor : Colors.whiteColor,
    marginHorizontal  : 20,
    marginTop         :10,
    color             : Colors.whiteColor,
    fontSize          : 20
  },
  buttonRootView      : {
    marginHorizontal  : 20,
    marginTop         : 10,
  },
  flatList            : {
    marginTop         : 10,
    marginHorizontal  : 10    
  },
  actionBarImage      : { 
    height            : 25,
    width             : 25,
    marginStart       : 15,
  },
  progressBar         : {
    flex              : 1,
    justifyContent    : 'center',
    alignItems        : 'center',
  }
});
