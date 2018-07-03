'use strict';

var GIPHY_PUB_KEY = 'SxRx4DudYvAGGZeaKeJBRex2DhO88xmD';
var GIPHY_API_URL = 'http://api.giphy.com';

App = React.createClass({
	displayName: 'App',
	getInitialState: function getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},


	handleSearch: function handleSearch(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText).then( (response) => {
			this.setState({
				loading: false,
				gif: response
			})
			return console.log('Wynik wyszukiwania: ' + response.url);
		});
	},

	getGif: function getGif(searchingText) {
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				if (this.status === 200) {
					resolve(this.response);
				} else {
					reject(new Error(this.statusText));
				}
			};
			xhr.onerror = function () {
				reject(new Error('XMLHttpRequest Error: ' + this.statusText));
			};
			xhr.open('GET', url);
			xhr.send();
		});
	},

	render: function render() {
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return React.createElement(
			'div',
			{ style: styles },
			React.createElement(
				'h1',
				null,
				'Wyszukiwarka GIF\xF3w!'
			),
			React.createElement(
				'p',
				null,
				'Znajd\u017A gifa na ',
				React.createElement(
					'a',
					{ href: 'http://giphy.com' },
					'giphy'
				),
				' Naciskaj enter, aby pobra\u0107 nast\u0119pne gify.'
			),
			React.createElement(Search, { onSearch: this.handleSearch }),
			React.createElement(Gif, {
				loading: this.state.loading,
				url: this.state.gif.url,
				sourceUrl: this.state.gif.sourceUrl
			})
		);
	}
});
