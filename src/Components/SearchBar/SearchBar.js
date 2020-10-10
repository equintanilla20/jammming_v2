import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: ''
		};

		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleTermChange(event) {
		this.setState({search: event.target.value})
	}

	search() {
		this.props.onSearch(this.state.search);
	}

	handleKeyPress(event) {
		if(event.key === 'Enter') {
			//console.log('Enter pressed');
			this.props.onSearch(this.state.search);
		};
	}

	render() {
		return (
			<div className="SearchBar">
 				<input 
 					placeholder="Enter A Song, Album, or Artist" 
 					onChange={this.handleTermChange} 
 					onKeyUp={this.handleKeyPress}/>
  				<a href="#" onClick={this.search} >SEARCH</a>
			</div>
		)
	}
}

export default SearchBar;