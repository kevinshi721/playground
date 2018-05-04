import React, {Component} from 'react';
import {createNewAccount, logIn} from './service/services';
import RegisterView from './RegisterView';
import UserView from './UserView';

class App extends Component{
    constructor(){
        super();
        this.state = {
            content: 'true',
            hasResgisted:false,
            // delete after test;
            hasSignedIn: false,

        }
        this.updateAccountInfo = this.updateAccountInfo.bind(this);
        this.updatePasswordInfo = this.updatePasswordInfo.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount(){
        let account = this.getCookie('account');
        if(account){
            this.setState({account});
            this.setState({hasSignedIn:true})
        }
    }

    setCookie(name,value) { 
            var Hours = 0.5; 
            var exp = new Date(); 
            exp.setTime(exp.getTime() + Hours*60*60*1000); 
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
        } 

    getCookie(name) { 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]); 
        else {
            return null;
        }
    } 

    delCookie(name) { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=this.getCookie(name); 
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
        } 

    updateAccountInfo(account){
        this.setState({
            account
        })
    }

    updatePasswordInfo(password){
      this.setState({
            password
        })
    }

    async signIn(){
      try
        {const logInResult = await logIn(this.state.account,this.state.password);
        if(logInResult.result){
            this.setCookie('account',this.state.account)
            this.setState({hasSignedIn:true});}
      }
        catch(e){
          console.log(e);
        }
    }

    async signUp(){
      try{
        let signUpResult = await createNewAccount(this.state.account,this.state.password);
        console.log(signUpResult);
        if(signUpResult){this.setState({hasResgisted:true})}
        this.setState({hasResgisted:true})  
      }
        catch(e)
        {console.log(e);}
    }

    logOut(){
        this.delCookie('account')
        this.setState({hasSignedIn:false});
    }

    render(){
        return(
        <div>
            {
                this.state.hasSignedIn ? 
                    <UserView onlogOut = {this.logOut} account = {this.state.account}
                                                        onSetCookie = {this.setCookie}/>
                :
                    <RegisterView onsignIn = {this.signIn} 
                                  onsignUp = {this.signUp} 
                                  hasResgisted = {this.state.hasResgisted}
                                  onupdateAccountInfo = {this.updateAccountInfo}
                                  onupdatePasswordInfo = {this.updatePasswordInfo}/> }
        </div>
            
        );
    }
}

export default App;