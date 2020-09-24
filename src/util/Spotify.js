const clientId = 'd9a44706f05e4c70a45fccfa2bad0007'
let accessToken = '';
//const redirectUri = 'http://JAMMMING_URL.surge.sh/';
const redirectUri = 'http://localhost:3000';
const Spotify = {

	getAccessToken() {
		if(accessToken) {
			return accessToken
		}

		const token = window.location.href.match(/access_token=([^&]*)/);
		const expires = window.location.href.match(/expires_in=([^&]*)/);

		if (token && expires) {
			accessToken = token[1];
			let expiresIn = Number(expires[1]);

			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		}

	},

	search(term) {

		accessToken = Spotify.getAccessToken();

		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
       			'Authorization': `Bearer ${accessToken}`
   			}
		}).then(response => {
			return response.json()
		}).then(jsonResponse => {
			if (!jsonResponse.tracks) return [];
			return jsonResponse.tracks.items.map(track => {
				return {
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri
				}
			});
		});
	},

	savePlaylist(playlistName, trackURIs) {
		if(!playlistName || !trackURIs) {
			return;
		}

		let accessToken = Spotify.getAccessToken();
		let headers = {'Authorization': `Bearer ${accessToken}`};
		let userId;

		return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
		).then(response => response.json()
		).then(jsonResponse => {
			userId = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
				headers: headers,
				method: 'POST',
				body: JSON.stringify({name: playlistName})
			}
		).then(response => response.json()
		).then(jsonResponse => {
			let playlistId = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
				headers: headers,
				method: 'POST',
				body: JSON.stringify({uris: trackURIs})
				})
			})
		})
	}
}

export default Spotify;