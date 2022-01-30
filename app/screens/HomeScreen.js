import React, {useEffect, useState} from 'react';
import {getIdByUsername, loadMoreTweets} from '../Utils/utils';
import {FlatListItem} from '../components/FlatListItem';
import Constants from '../Constants/Constants';
import {
  Text,
  Button,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';


export default function HomeScreen() {
  let [usernameText, updateUserNameText]  = useState('');
  let [listData, updateListData]          = useState([]);
  let [media, updateMediaData]            = useState(undefined);
  let [mUserId, updateUserId]             = useState(undefined);
  let [appOpen, updateAppOpenFlag]        = useState(true);

  if (appOpen) {
    getIdByUsername(Constants.DefaultUsername, onCompleteListenerFun);
    updateAppOpenFlag(false);
  }

  function onCompleteListenerFun(list, includes, userId) {
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

  return (
    <View style={styles.root}>
      <TextInput
        value={usernameText}
        placeholder="Enter User name here without @"
        onChangeText={text => {
          updateUserNameText(text);
        }}
      />

      <Button
        title="Look for this users tweets"
        onPress={() => {
          if (usernameText != '')
            getIdByUsername(usernameText, onCompleteListenerFun);
        }}
      />

      <FlatList
        data={listData}
        renderItem={renderItem}
        onEndReached={loadMoreTweetsM}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 100,
  },
});
