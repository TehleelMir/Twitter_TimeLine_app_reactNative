import Constants                                              from '../Constants/Constants';
import {UsernameSuccessResponse, UsernameFailureResponse,}    from '../Models/UsernameResponseModel';
import {TweetsTimeSuccessResponse, TweetsTimeFailureResponse} from '../Models/TweetsTimeLineModel'
import {ToastAndroid, Platform, AlertIOS}                     from 'react-native';


export async function getIdByUsername(username, onCompleteListenerFun) {
  try {
    let response = await fetch(`https://api.twitter.com/2/users/by/username/${username}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${Constants.BearerToken}` }
      },
    );

    let responseJson = await response.json();
    if (responseJson.data != undefined) {
      getUserTweetTimelineById(
        new UsernameSuccessResponse(responseJson.data),
        onCompleteListenerFun,
      );
    } 
    else {
      let errorDetail = new UsernameFailureResponse(responseJson.errors);
      if (Platform.OS === 'android')  ToastAndroid.show(errorDetail.getErrorDetail(), ToastAndroid.SHORT);
      else                            AlertIOS.alert(errorDetail.getErrorDetail());
    }
  } catch (error) { console.error(error); }
}


export async function getUserTweetTimelineById(data, onCompleteListenerFun) {
  try {
    let response = await fetch(`https://api.twitter.com/2/users/${data.getId()}/tweets?exclude=replies,retweets&tweet.fields=attachments&expansions=attachments.media_keys&media.fields=url&max_results=50`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${Constants.BearerToken}` }
      }
    );

    let responseJson = await response.json();
    if (responseJson.data != undefined) {
      let list = responseJson.data;
      if (responseJson.includes != undefined)   onCompleteListenerFun(list, responseJson.includes, data.getId());
      else                                      onCompleteListenerFun(list, undefined, id);
    } 
    
    else {
      let errorDetail = new TweetsTimeFailureResponse(responseJson.errors)
      if(Platform.OS === 'android')             ToastAndroid.show(errorDetail.getErrorDetail(), ToastAndroid.SHORT)  
      else                                      AlertIOS.alert(errorDetail.getErrorDetail())   
    }
  } catch (error) { console.error(error) }
}


export async function loadMoreTweets(lastTweetId, userId, callBackFunction) {
  try {
    let response = await fetch(`https://api.twitter.com/2/users/${userId}/tweets?exclude=replies,retweets&tweet.fields=attachments&expansions=attachments.media_keys&media.fields=url&max_results=50&until_id=${lastTweetId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${Constants.BearerToken}` }
      },
    );

    let responseJson = await response.json();
    if (responseJson.data != undefined) {
      let list = responseJson.data;
      if (responseJson.includes != undefined)   callBackFunction(list, responseJson.includes);
      else                                      callBackFunction(list, undefined);
    } 
    else {
      if(Platform.OS === 'android')             ToastAndroid.show("No More Tweets", ToastAndroid.SHORT)  
      else                                      AlertIOS.alert("No More Tweets")   
    }
    
  } catch (error) { console.error(error); }
}
