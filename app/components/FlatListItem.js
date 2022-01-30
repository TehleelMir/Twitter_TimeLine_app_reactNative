import React from 'react';
import {View, Text, Image} from 'react-native';

export function FlatListItem(props) {
  let item = props.item;

  if (item.attachments == undefined) {
    return <Text style={{margin: 15}}>{item.text}</Text>;
  } else {
    let mediaKey = item.attachments.media_keys[0];

    for (let i = 0; i < props.media.length; i++) {
      if (props.media[i].media_key == mediaKey) {
        var data = props.media[i];
        break;
      }
    }

    if (data != undefined && data.type == 'photo') {
      return (
        <View style={{margin: 15}}>
          <Text>{item.text}</Text>
          <Image source={{uri: data.url, height: 100}} />
        </View>
      );
    } else {
      return (
        <View style={{marginTop: 15}}>
          <Text>{item.text}</Text>
        </View>
      );
    }
    
  }
}
