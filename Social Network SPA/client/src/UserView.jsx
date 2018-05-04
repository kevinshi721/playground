import React from 'react';
import './App.css';
import NavBar from './NavBar';
import NewFeeds from './NewFeeds';
import Profile from './Profile';
import FriendProfile from './FriendProfile';
import NewPostBtn from './NewPostBtn';
import {getNewFeeds,getProfile,getFriendInfo,updateNewFeed, follow, unfollow, upvotes, deleteNewFeed,searchUsers,comments} from './service/services'

import './UserView.css';

class UserView extends React.Component {

constructor(){
    super();

    this.state = {
      searchList: []
    };

    this.redirectToMainPage = this.redirectToMainPage.bind(this);
    this.redirectToProfilePage = this.redirectToProfilePage.bind(this);
    this.redirectToFriendProfilePage = this.redirectToFriendProfilePage.bind(this);
    this.postNewFeed = this.postNewFeed.bind(this);
    this.followFriend = this.followFriend.bind(this);
    this.unfollowFriend = this.unfollowFriend.bind(this);
    this.upvotesNewFeed = this.upvotesNewFeed.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.search = this.search.bind(this);
    this.updateFriendAccountInfo = this.updateFriendAccountInfo.bind(this);
    this.commentsNewFeed = this.commentsNewFeed.bind(this);
    this.upvoteBoolean = this.upvoteBoolean.bind(this);
    //Comment Function
    //Upload Function
};

async componentWillMount(){
    const newFeeds = await getNewFeeds(this.props.account);
    console.log('2')
    this.setState({
      page: 'NewFeeds',
      newFeeds: newFeeds.newFeeds,
    });
    console.log(newFeeds.newFeeds)
}
 
async redirectToMainPage(){
    const newFeeds = await getNewFeeds(this.props.account);
    console.log(newFeeds.newFeeds)
    // console.log('test redirectToProfilePage', {newFeeds})
    // console.log('upvotes了吗？', newFeeds.newFeeds[0].upvotes)
    this.setState({
      page: 'NewFeeds',
      newFeeds:newFeeds.newFeeds
    });
}; 

async redirectToProfilePage(){
    const profile = await getProfile(this.props.account);
    console.log('test redirectToProfilePage')
    this.setState({
      page: 'Profile',
      profile: profile.user,
    });
};

async redirectToFriendProfilePage(){
    console.log('test redirectTofriendPage')
    const friendInfo = await getFriendInfo(this.props.account, this.state.friendAccount);
    this.setState({
      page: 'FriendProfile',
      friendInfo: friendInfo.user,
      searchList: [],
    });

};

async postNewFeed(newFeed){
  let myDate = new Date();
  let data = new FormData();
  data.append('image',newFeed.image);
  data.append('timeStamp',myDate);
  data.append('upvotes', 0);
  data.append('usersLike', []);
  data.append('location',newFeed.location);
  data.append('contents',newFeed.text);
  await updateNewFeed(this.props.account,data);
  console.log(newFeed)
  console.log('resirectTOMain')
  // this.redirectToMainPage();
}

async followFriend(friendAccount){
    await follow(this.props.account, friendAccount);
}

async unfollowFriend(friendAccount){
    await unfollow(this.props.account, friendAccount);
}

async upvotesNewFeed(newFeed){
    await upvotes(this.props.account, newFeed);
    console.log('upvotes-view')
    // await this.redirectToMainPage();
}

async commentsNewFeed(newFeed, com){
  await comments(this.props.account, newFeed, com);
  // this.redirectToMainPage();
}

async search(searchKeyWord){
  const searchList = await searchUsers(this.props.account, searchKeyWord);
  this.setState({searchList: searchList.searchList});
  // this.setState({searchList: searchList});

}

async updateFriendAccountInfo(friendAccount){
  console.log('test updateFriendAccountInfo');
  await this.setState({friendAccount})
}

async deleteFeed(feed){
  console.log('deletefeed called');
  await deleteNewFeed(this.props.account, feed);
  this.redirectToProfilePage();
}

upvoteBoolean(newFeed){
  
    let userName = this.props.account;
    let likedUserList = newFeed.usersLike;
    let result = false;

    for(let likedUser of likedUserList){
      if (likedUser === userName) {
        result = true;
      }
    };
    return result;  
}

render() {
 
    return (
      <div className="App">
          <NavBar onSearch={this.search}
                  onUserProfile={this.redirectToProfilePage}
                  onLogOut={this.props.onlogOut}
                  onMain={this.redirectToMainPage}
                  account={this.props.account}
                  searchList={this.state.searchList}
                  onRedirectToFriendProfilePage={this.redirectToFriendProfilePage}
                  onUpdateFriendAccountInfo={this.updateFriendAccountInfo}/>
          
          {
            this.state.page === "NewFeeds" ? 

              <main className="main-body">
                <div className="post-list">
                  <NewFeeds newFeeds = {this.state.newFeeds}
                            onRedirectToMainPage = {this.redirectToMainPage}
                            onUpvotes = {this.upvotesNewFeed}
                            onUpvoteBoolean = {this.upvoteBoolean}
                            onComment = {this.commentsNewFeed}
                            onUpdateFriendAccountInfo = {this.updateFriendAccountInfo}
                            onRedirectToFriendProfilePage = {this.redirectToFriendProfilePage}
                            account = {this.props.account}
                            onMain={this.redirectToProfilePage}/>
                </div>
                <div className="new-post">
                <NewPostBtn className="newfeed-btn" 
                            onUpload={this.postNewFeed}
                            onRedirectToMainPage = {this.redirectToMainPage}/>
                </div>
              </main>

          : this.state.page === "Profile" ? 

              <main className="main-body">
                  <Profile profile = {this.state.profile} 
                           onUpvoteBoolean = {this.upvoteBoolean}
                           onUpvotes = {this.upvotesNewFeed}
                           onDeleteFeed = {this.deleteFeed}
                           onRedirectToProfilePage= {this.redirectToProfilePage}
                           onUpdateFriendAccountInfo = {this.updateFriendAccountInfo}
                           onRedirectToFriendProfilePage = {this.redirectToFriendProfilePage}/>
              </main>

          : this.state.page === "FriendProfile" ? 
          
              <main className="main-body">
               <FriendProfile friendInfo = {this.state.friendInfo} 
                              onFollow = {this.followFriend}
                              onUnfollow = {this.unfollowFriend}
                              onUpvoteBoolean = {this.upvoteBoolean}
                              onUpvotes = {this.upvotesNewFeed}
                              onRedirectToProfilePage = {this.redirectToProfilePage}
                              onRedirectToFriendProfilePage = {this.redirectToFriendProfilePage}
                              onUpdateFriendAccountInfo = {this.updateFriendAccountInfo}/>
              </main>

            : <div/>
          }
      </div>
    );
  }
}

export default UserView;