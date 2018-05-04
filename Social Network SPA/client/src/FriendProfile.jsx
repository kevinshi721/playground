import React from 'react';
import { Card, Button, CardImg, CardColumns, CardBody } from 'reactstrap';
import FollowModal from './FollowModal';
import './Profile.css';
import './FriendProfile.css';
 
class FriendProfile extends React.Component{

    constructor(){
        super();
        this.state = {};
        this.upvotes = this.upvotes.bind(this);
        this.displayFriendProfile = this.displayFriendProfile.bind(this);
    }

    async upvotes(feed){
        await this.props.onUpvotes(feed);
        this.props.onRedirectToFriendProfilePage();
        this.props.onRedirectToFriendProfilePage();
    }

    displayFriendProfile(){
        let friendProfileList = [];
        let index = 0;
        for(let feed of this.props.friendInfo.feeds ){
            friendProfileList.push(
                <div className="profile-card" key = {index++}>
                    <Card>
                        <CardImg top width="100%" src={feed.image} alt="NO IMG" />
                        <CardBody>
                            <div className={`upvote-icon ${this.props.onUpvoteBoolean(feed) ? 'upvoted-icon' : ''}` } onClick={() => this.upvotes(feed)}></div>
                            <span className="upvotes-count">{` ${feed.upvotes} Likes`}</span>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        return friendProfileList;
    }

    render(){
        return(
            <div> 
                <div className="account-container"> 
                    <div className="account-area">
                        <div className="account-name-div">
                            <span className="account-name">{this.props.friendInfo.account}</span>
                            <Button className="follow-btn" outline color="secondary" onClick={() => this.props.onFollow(this.props.friendInfo.account)}>Follow</Button>
                            <Button className="unfollow-btn" outline color="secondary" onClick={() => this.props.onUnfollow(this.props.friendInfo.account)}>UnFollow</Button>

                        </div>
                        <ul className="account-info-list">
                            <li className="account-posts-li">
                                <div>
                                    <span className="account-posts">{`${this.props.friendInfo.feeds.length} posts`}</span>
                                </div>
                            </li>
                            <li className="account-follower-li">
                                <FollowModal spanName={`${this.props.friendInfo.followers.length} followers`}
                                             modalHeader="Followers"
                                             follow={this.props.friendInfo.followers}
                                             onUpdateFriendAccountInfo={this.props.onUpdateFriendAccountInfo}
                                             onRedirectToFriendProfilePage={this.props.onRedirectToFriendProfilePage}/>
                            </li>
                            <li className="account-following-li">
                                <FollowModal spanName={`${this.props.friendInfo.followings.length} following`}
                                                 modalHeader="Following"
                                                 follow={this.props.friendInfo.followings}
                                                 onUpdateFriendAccountInfo={this.props.onUpdateFriendAccountInfo}
                                                 onRedirectToFriendProfilePage={this.props.onRedirectToFriendProfilePage}/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="account-divider-div">
                    <hr className="account-divider"/>
                </div>
                <div className="feeds-container">
                    <div className="feeds-area">
                        <CardColumns>
                            {this.displayFriendProfile()}
                        </CardColumns>
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendProfile;