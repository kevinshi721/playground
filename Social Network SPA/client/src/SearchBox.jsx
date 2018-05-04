import React from 'react';
import { Input } from 'reactstrap';
import SearchList from './SearchList';

const SearchBox = ({onSearch, searchList, onRedirectToFriendProfilePage, onUpdateFriendAccountInfo}) => {

	const searchHandler = (event) => {
		onSearch(event.target.value);
	}

	// const clearHandler = () => {
	// 	document.querySelector('.search-value').value = null;
	// }

	return (
		<div className='search-box'>
			<div className="search-input">
				<Input className="search-value"
					   type="text" 
					   maxLength="50" 
					   placeholder="Search" 
					   onChange={searchHandler}/>
			</div>	
			<div className="search-list-div">
				<SearchList className="search-list"
							searchList={searchList}
							onRedirectToFriendProfilePage={onRedirectToFriendProfilePage}
							onUpdateFriendAccountInfo={onUpdateFriendAccountInfo}/>
			</div>
		</div>
	);

}

export default SearchBox;
