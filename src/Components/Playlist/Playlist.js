import React from 'react';
import './Playlist.css';
import TrackList from './../TrackList/TrackList'

class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.state = {
			isRemoval: true
		}
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value)
	}

	render() {
		return (
			<div className="Playlist" >
				<input 
					defaultValue={this.props.playlistName}
					onChange={this.handleNameChange}
				/>
				<TrackList 
					playlistName={this.props.playlistName} 
					tracks={this.props.playlistTracks} 
					onRemove={this.props.onRemove}
					isRemoval={this.state.isRemoval}
				/>
				<a href="!#" className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		)
	}
}

export default Playlist;