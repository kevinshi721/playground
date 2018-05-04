export const createNewAccount = (account,password) => {
    return fetch('/signUp', {
        method: 'POST',
        body: JSON.stringify({account,password})
    })
    .then( res => res.ok ? res.json() : Promise.reject(res.text()))
    .catch( () => Promise.reject('createNewAccount-fail') );
  }
        

export const logIn = (account,password) => {
    return fetch('/signIn', {
        method: 'PUT',
        body: JSON.stringify({account,password})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch(() => Promise.reject('login-fail'));
}

export const logOut = (account) => {
    return fetch(`user/${account}/logOut`, {
        method: 'PUT'
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch(() => Promise.reject('login-fail') );
}

export const follow = async(account,friendAccount) => {
    return await fetch(`user/${account}/follow`, {
        method: 'PUT',
        body: JSON.stringify({friendAccount})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch(() => Promise.reject('follow-fail') );
}

export const unfollow = async(account,friendAccount) => {
    return await fetch(`user/${account}/unfollow`, {
        method: 'PUT',
        body: JSON.stringify({friendAccount})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e) );
}

export const getNewFeeds = async(account) => {
    return await fetch(`user/${account}/getNewFeeds`)
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e));
}

export const uploadNewFeed = async(account, newFeed) => {
    return await fetch(`user/${account}/uploadNewFeed`, {
        method: 'POST',
        body: JSON.stringify({newFeed})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e) );
}

export const updateNewFeed = async(account, data) => {
    console.log('update')
    return await fetch(`user/${account}/updateNewFeed`, {
        method: 'POST',
        body: data
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    // .catch(() => Promise.reject('updateNewFeed-fail') );
    .catch((e) => console.log(e));
}

export const deleteNewFeed = async(account, newFeed) => {
    return await fetch(`user/${account}/deleteNewFeed`, {
        method: 'DELETE',
        body: JSON.stringify({newFeed})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e) );
}

export const upvotes = async(account, newFeed) => {
    console.log('upvote-service')
    return await fetch(`user/${account}/upvotes`,{
        method:'PUT',
        body: JSON.stringify({newFeed})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e) );
}

export const comments = async(account, newFeed, comment) => {
    return await fetch(`user/${account}/comments`,{
        method:'PUT',
        body: JSON.stringify({newFeed, comment})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e) );
}

export const searchUsers = async(account, searchKeyWord) => {
    return await fetch(`user/${account}/searchUsers`,{
        method:'PUT',
        body: JSON.stringify({searchKeyWord})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e) );
}

export const getProfile = async(account) => {
    console.log('profile-service')
    return await fetch(`user/${account}/getProfile`)
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) =>  console.log(e) );
};

export const getFriendInfo = async(account, friendAccount) => {
    return await fetch(`user/${account}/getFriendInfo`, {
        method:'PUT',
        body:JSON.stringify({friendAccount})
    })
    .then(res => res.ok ? res.json(): Promise.reject(res.text()))
    .catch((e) => console.log(e) );
};