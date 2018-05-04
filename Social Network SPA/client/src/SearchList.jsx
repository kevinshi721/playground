import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


const SearchList = ({searchList, onRedirectToFriendProfilePage, onUpdateFriendAccountInfo}) => {

    const redirectToFriendProfilePage = async (userAccount) =>{
        await onUpdateFriendAccountInfo(userAccount);
        onRedirectToFriendProfilePage();
    }

    const getSearchList = () => {
        let SearchList = [];
        searchList.map((userAccount,index) => {
            SearchList.push(
                <ListGroupItem key = {index++} onClick = {() => redirectToFriendProfilePage(userAccount)}>{userAccount}</ListGroupItem>
           )
        });
        return (
            <ListGroup>
                {SearchList}
            </ListGroup>
        );
    }
        
    return(
        <div>
            {getSearchList()}
        </div>
    );
}

export default SearchList; 