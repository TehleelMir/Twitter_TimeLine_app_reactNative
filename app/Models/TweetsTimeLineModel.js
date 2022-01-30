export class TweetsTimeSuccessResponse {
  constructor(allData) {
    this.tweetList = allData.data;
    this.metaData  = allData.meta;
  }

  getAllMetaData() {
    let metaObject = {
        'oldest_id'     : this.metaData.oldest_id,
        'newest_id'     : this.metaData.newest_id,
        'result_count'  : this.metaData.result_count,
        'next_token'    : this.metaData.next_token
    };
    return metaObject
  }

  getAllTweetList() {
      return this.tweetList
  }
}

export class TweetsTimeFailureResponse {
    constructor(errors) {
      this.errors = errors;
    }
  
    getErrorDetail() {
      let errorData = this.errors[0];
      return errorData.detail;
    }
  }
