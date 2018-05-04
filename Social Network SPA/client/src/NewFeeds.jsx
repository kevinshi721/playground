import React from 'react'
import { Row, Col, Card, CardText, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';

import './NewFeeds.css';

class NewFeeds extends React.Component{

    constructor(){
        super();
        this.state = {};
        this.upvotes = this.upvotes.bind(this);
        this.commentsNewFeed = this.commentsNewFeed.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.displayComments = this.displayComments.bind(this);
        this.redirectToFriendProfilePage = this.redirectToFriendProfilePage.bind(this);
    };

    async upvotes(newFeed){
        await this.props.onUpvotes(newFeed);
        // console.log('upvote-method' )
        await this.props.onRedirectToMainPage();
        // await this.props.onRedirectToMainPage();
    }

    async commentsNewFeed(feed){
        await this.props.onComment(feed,this.state.comment);
        // this.props.onRedirectToMainPage();
    }

    async redirectToFriendProfilePage (userAccount){
        if (userAccount === this.props.account){
            this.props.onMain();
        } else {
            await this.props.onUpdateFriendAccountInfo(userAccount);
            this.props.onRedirectToFriendProfilePage();
        }
    }

    updateComments(e){
        let comment = e.target.value;
        this.setState({comment})
    }

    displayComments(newFeed){
        let commentList = [];
        let index = 0;
        for(let comment of newFeed.comments){
            commentList.push(
                <div key = {index++}>
                    <div>@{comment.account}  </div><span><div> {comment.content}</div></span>
                </div>
            )
        }
        return commentList;
    }

                            // <div className="comment-btn">
                            //     <input onChange = {this.updateComments}/>
                            //     <Button size="sm" onClick={() => this.commentsNewFeed(newFeed)}>CommentBtn</Button>
                            // </div>
                            // <div >
                            // {this.displayComments(newFeed)}
                            // </div>

    getNewFeedsList(){
        let newFeedsList = [];
        this.props.newFeeds.map((newFeed, index) => {
            newFeedsList.push(
                <Col sm="8" key={index}>
                    <Card >
                        <CardBody>
                            <CardTitle onClick = {() => this.redirectToFriendProfilePage(newFeed.account)}>{newFeed.account}</CardTitle>
                            <CardSubtitle>{newFeed.location === 'undefined'? null : newFeed.location}</CardSubtitle>
                        </CardBody>
                            <CardImg className="post-img" src={newFeed.image} alt="NO IMAGE" />
                        <CardBody>
                            <CardText>
                                <span className="commenter" onClick = {() => this.redirectToFriendProfilePage(newFeed.account)}>{newFeed.contents === 'undefined'? null : `${newFeed.account} `}</span>{newFeed.contents === 'undefined'? null : newFeed.contents}
                            </CardText>
                            <div className={`upvote-icon ${this.props.onUpvoteBoolean(newFeed) ? 'upvoted-icon' : ''}` } onClick={() => this.upvotes(newFeed)}></div>
                            <span className="upvotes-count">{` ${newFeed.upvotes} Likes`}</span>
                            <div className="time-stamp">
                                <span>{newFeed.timeStamp.toLocaleString()}</span>
                            </div>
                        </CardBody>

                    </Card>
                    <br/>
                    <br/>
                </Col>
            )
        })
        return newFeedsList;

    }

    render(){
        return(
            <Row>
                {this.getNewFeedsList()}
            </Row>
        )
    }
}

export default NewFeeds;