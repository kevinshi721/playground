const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path'); 
const bodyParser = require('body-parser');
const User = require('./User.model');
const mongoose = require('mongoose');       
const upload = require('./multerUtil').single('image');

mongoose.connect('mongodb://instgram1:shiguodong@ds253879.mlab.com:53879/instgram');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { 
  console.log ("we're connected!");
}); 

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.static('public'));
const jasonParser = bodyParser.json({extended: true, type: '*/*'});

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
  });

app.post('/signUp', jasonParser, (req, res) => {
    User.findOne({account:req.body.account })
    .exec(function(err,user){
        if(err){
            return res.status(500).send(JSON.stringify({result: false}));
        }
        if(!user){ 
            User.create({account:req.body.account, password:req.body.password, followings: ['Gordon']}, function(err,user){
                User.findOne({account:'Gordon' })
                .exec(function(err,Gordon){
                    if(err){return res.status(500).send(JSON.stringify({result: false}));}
                    else{
                        Gordon.followers.push(req.body.account)}
                        Gordon.save();
                })
                if(err){ return res.send(JSON.stringify({result: false}));}
            })
            return res.status(200).send(JSON.stringify({result:true}));
        }
        return res.send(JSON.stringify({result:false}));
    });

    // User.find({})
    // .exec((err,users) => {console.log(users)})

    // User.remove({})
    // .exec(function(err,user){console.log('clear sucess')});
});


app.put('/signIn', jasonParser, (req, res) => {
    User.findOne({account:req.body.account,password:req.body.password})
    .exec(function(err,user){
        if(err){
            return res.status(500).send(JSON.stringify({result:false}));}
        if(!user){
            return res.status(404).send(JSON.stringify({result:false}))
        }
        return res.status(200).send(JSON.stringify({result:true}));
    });
});

app.put('/user/:account/logOut', jasonParser, (req, res) => {
    res.send(JSON.stringify({}));
});

app.get('/user/:account/getNewFeeds', jasonParser, (req, res) => {
    User.findOne({account: req.params.account})
    .exec(function(err, user){
        if(err){ return res.status(500).send(JSON.stringify({}));}
        else{
            let newFeeds = [];
            newFeeds = newFeeds.concat(user.feeds);
            sortNewFeeds(newFeeds);
            if (!user.followings || user.followings.length === 0) {
                console.log('getNewFeeds-sucess')
                res.send(JSON.stringify({newFeeds}));
                return;
            }
            const requests = user.followings.map((followingAccount,index) => request(followingAccount, index));
            Promise.all(requests).then(response => {
                response.forEach(resp => newFeeds = newFeeds.concat(resp));
                sortNewFeeds(newFeeds);
                console.log('getNewFeeds-sucess')
                res.send(JSON.stringify({newFeeds}));
                return;
            });
        }
    })
})
 
const request = (followingAccount, index) => {
    return new Promise((resolve, reject) => {
        User.findOne({account: followingAccount}).exec(function(err, following) {
            resolve(following.feeds);
        });
    });
};

const sortNewFeeds = (newFeeds) => {
    for(let i = 0; i < newFeeds.length; i++){
        for(let j = i+1; j < newFeeds.length; j++){
        if(newFeeds[i].timeStamp < newFeeds[j].timeStamp) {
            let temp = newFeeds[i];
            newFeeds[i] = newFeeds[j];
            newFeeds[j] = temp;
            }
        }
    }
}

app.get('/user/:account/getProfile', jasonParser, (req, res)=>{
    User.findOne({account: req.params.account})
    .exec(function(err, user){ 
        if(err){ return res.status(500).send(JSON.stringify({}));}
        else{
            console.log('getProfile-sucess')
            res.send(JSON.stringify({user})); 
        }
    }); 
})
 
app.put('/user/:account/getFriendInfo', jasonParser, (req, res)=>{
    User.findOne({account: req.body.friendAccount})
    .exec(function(err, user){ 
        if(err){ return res.status(500).send(JSON.stringify({result:false}));}
        else{
            console.log('getFriendInfo-sucess')
            res.send(JSON.stringify({user}));
        }
    });
})

app.put('/user/:account/follow', jasonParser, (req, res) => {
    // update selfInfo
    User.findOne({account: req.params.account})
    .exec(function(err, user){
        if(err){ return res.status(500).send(JSON.stringify({}));}
        else{
            if(!user.followings.includes(req.body.friendAccount)){
                user.followings.push(req.body.friendAccount)
                user.save();
            }
        }
    })
    // update friendInfo
    User.findOne({account: req.body.friendAccount})
    .exec(function(err, user){
        if(err){ return res.status(500).send(JSON.stringify({}));}
        else{
            if(!user.followers.includes(req.params.account)){
                user.followers.push(req.params.account)
                user.save();
                console.log('follow-sucess')
            }
            res.send(JSON.stringify({}));
        }
    })
})

app.put('/user/:account/unfollow', jasonParser, (req, res) => {
    const account = req.params.account;
    const friendAccount = req.body.friendAccount;
    // update selfInfo
    User.findOne({account: account})
    .exec(function(err, user){
        if(err){ return res.status(500).send(JSON.stringify({result:false}));}
        else{
            if(user.followings.includes(friendAccount)){
            user.followings.splice(user.followings.indexOf(friendAccount),1)
            user.save();
            }
        }
    })
    // update friendInfo
    User.findOne({account: friendAccount})
    .exec(function(err, user){
        if(err){ return res.status(500).send(JSON.stringify({result:false}));}
        else{
            if(user.followers.includes(account)){
                user.followers.splice(user.followers.indexOf(account),1)
                user.save();
                console.log('unfollow-sucess')
            }
            res.send(JSON.stringify({}));
            
        }
    })
})
 
app.put('/user/:account/upvotes', jasonParser, (req, res) => {
    const account = req.params.account;
    const newFeed = req.body.newFeed;
    const friendAccount = newFeed.account;
    User.findOne({account: friendAccount})
    .exec(function(err, user){
        if(err){ return res.status(500).send(JSON.stringify({result:false}));}
        else{  
            user.feeds.map((feed,index) => {
                    if(feed._id.toString() === newFeed._id){
                        if(feed.usersLike.includes(account)){
                            feed.upvotes -= 1;
                            feed.usersLike.splice(feed.usersLike.indexOf(account),1)}
                        else{
                            feed.upvotes += 1; 
                            feed.usersLike.push(account);
                            console.log('upvote sucess' + feed.upvotes)}
                } 
            })
            user.save(function(err, user) {
                res.send(JSON.stringify({}));
            });
            console.log('upvotes-sucess');
        }
    })
    
})

app.put('/user/:account/comments', jasonParser, (req, res) => {
    const account = req.params.account;
    const newFeed = req.body.newFeed;
    const friendAccount = newFeed.account;
    User.findOne({account: friendAccount}) 
    .exec(function(err, user){ 
        if(err){ return res.status(500).send(JSON.stringify({result:false}));}
        else{   
            user.feeds.map((feed,index) => {
                    if(feed._id.toString() === newFeed._id){
                            feed.comments.push({account: account,content: req.body.comment,})
                            console.log('comments sucess' )
                    user.save();
                }
            })
            user.save();
            console.log('upvotes-sucess')
        }
    })
    res.send(JSON.stringify({}))
})

app.put('/user/:account/searchUsers', jasonParser, (req, res) => {
    User.find({}) 
    .exec(function(err,users){
        if(err){ return res.status(500).send({searchList: []});}
        else{
            console.log('server', users)
            let searchList = [];
            users.map((user,index) =>{ 
                console.log('server-user.word', req.body.searchKeyWord)
                // console.log('server-user', user.feeds[0].usersLike)
                console.log('server-user.account', user.account)
                
                if(user.account.match(req.body.searchKeyWord)){
                    searchList.push(user.account)
                }  
                if(index === users.length - 1){
                    if(req.body.searchKeyWord === ''){searchList = [];}
                    }   
            });
            res.send(JSON.stringify({searchList}));
        }
    })
})  

app.post('/user/:account/updateNewFeed',upload, (req, res) => {
    let index = 0;
    User.findOne({account: req.params.account})
    .exec(function(err,user){
        if(err){ return res.status(500).send({});}
        else{
            let newFeed = {}
            newFeed.account = req.params.account;
            newFeed.timeStamp = req.body.timeStamp;
            newFeed.location = req.body.location;
            newFeed.upvotes = req.body.upvotes;
            newFeed.usersLike = req.body.usersLike;
            newFeed.contents = req.body.contents;
            newFeed.image = '/' + req.filename + '.jpg';
            user.feeds.push(newFeed);
            user.save((err,user) =>{
                res.send(JSON.stringify({}));
            });
            console.log('updateNewFeed-sucess')
        }
    });
}); 
// app.post('/user/:account/uploadNewFeed', (req, res) => {
//     User.findOne({account:req.params.account}) 
//     .exec(function(err,user){
//         if(err){ return res.status(500).send({});}
//         else{
//             user.feeds.push(req.body.newFeed);
//             user.save();
            
//         }
//     });
// });

{/* <img src = '/../images/frsfgrwf.jpg'> */}

app.delete('/user/:account/deleteNewFeed', jasonParser, (req,res) => {
    const account = req.params.account;
    const newFeed = req.body.newFeed;
    User.findOne({account}) 
    .exec(function(err,user){
        if(err){ return res.status(500).send({});}
        else{ user.feeds.map((feed,index) => {
            if(feed._id.toString() === newFeed._id)
                user.feeds.splice(user.feeds.indexOf(feed),1)
            })
        user.save();
        }
    })
    res.send(JSON.stringify({}))
})


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});

