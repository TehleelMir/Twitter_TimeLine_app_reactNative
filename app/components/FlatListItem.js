import React,{useState} from 'react';
import Colors from '../Constants/Colors.js'
import {View, Text, Image, StyleSheet, Dimensions } from 'react-native';


export function FlatListItem(props) {
  let [w, updateW] = useState(100)
  let [h, updateH] = useState(100)
  let item = props.item;
  if (item.attachments == undefined)                return getTextComponent(item.text)
  else {
    if (item.attachments.poll_ids != undefined)     return getTextComponent(item.text)
    let mediaKey = item.attachments.media_keys[0];

    for (let i = 0; i < props.media.length; i++)
      if (props.media[i].media_key == mediaKey)     { var data = props.media[i]; break; }
    
    if (data != undefined && data.type == 'photo')  return getImageAndTextComponent(item.text, data.url, w, h);
    else                                            return getTextComponent(item.text);
  }
}

function getTextComponent(text) {
  return(
    <View style={styles.root}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

function getImageAndTextComponent(text, imageUri, w, h) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{text}</Text>
      <View style={{ 
        flex: 1,
      }}>
      <Image source={{uri: imageUri}} style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,

      }} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  text                    : {
    color                 : Colors.whiteColor,
    marginHorizontal      : 10,
    marginVertical        : 5,
    fontSize              : 14,
    fontWeight            : 'bold'
  },
  root                    : { 
    marginHorizontal      : 10,
    marginBottom          : 25,
    justifyContent        : 'center',
    backgroundColor       : Colors.colorPrimary,
    borderRadius          : 5,
    elevation             : 2,
    shadowOffset          : { width: 10, height: 10 },  
    shadowColor           : 'black',  
    shadowOpacity         : 1,
    minHeight             : 40,
    overflow: 'hidden',
  },
  imageView               : {
    resizeMode: 'cover',
    flex: 1,
    aspectRatio: 1.5
  },
})
