import React from 'react';
import { Card, CardImg, CardColumns, CardBody } from 'reactstrap';
import DeleteModal from './DeleteModal';
import FollowModal from './FollowModal';

import './Profile.css';
 
class Profile extends React.Component{
    
    constructor(){
        super();
        this.state = {};
        this.upvotes = this.upvotes.bind(this);
        this.deleteFeed = this.deleteFeed.bind(this);
    }

    async upvotes(feed){
        await this.props.onUpvotes(feed);
        this.props.onRedirectToProfilePage();
    }

    async deleteFeed(feed){
        await this.props.onDeleteFeed(feed);
        this.props.onRedirectToProfilePage();
    }

    displayProfile(){
        let profileList = [];
        let index = 0;
        for(let feed of this.props.profile.feeds ){
            profileList.push(
                <div className="profile-card" key={index++}>
                    <Card>
                        <CardImg top width="100%" src={feed.image} alt="NO IMG" />
                        <CardBody>
                            <div className={`upvote-icon ${this.props.onUpvoteBoolean(feed) ? 'upvoted-icon' : ''}` } onClick={() => this.upvotes(feed)}></div>
                            <span className="upvotes-count">{` ${feed.upvotes} Likes`}</span>
                            <DeleteModal onDelete={()=>this.deleteFeed(feed)}/>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        return profileList;
    }

    render(){
        return(
            <div> 
                <div className="account-container">
                    <div className="account-area">
                        <div className="account-name-div">
                            <span className="account-name">{this.props.profile.account}</span>
                        </div>
                        <ul className="account-info-list">
                            <li className="account-posts-li">
                                <div>
                                    <span className="account-posts">{`${this.props.profile.feeds.length} posts`}</span>
                                </div>
                            </li>
                            <li className="account-follower-li">
                                <FollowModal spanName={`${this.props.profile.followers.length} followers`}
                                             modalHeader="Followers"
                                             follow={this.props.profile.followers}
                                             onUpdateFriendAccountInfo={this.props.onUpdateFriendAccountInfo}
                                             onRedirectToFriendProfilePage={this.props.onRedirectToFriendProfilePage}/>
                            </li>
                            <li className="account-following-li">
                                <FollowModal spanName={`${this.props.profile.followings.length} following`}
                                                 modalHeader="Following"
                                                 follow={this.props.profile.followings}
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
                            {this.displayProfile()}
                        </CardColumns>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;