var GIPHY_PUB_KEY = 'SxRx4DudYvAGGZeaKeJBRex2DhO88xmD';
var GIPHY_API_URL = 'http://api.giphy.com';


App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText).then(response => console.log('Wynik wyszukiwania: ' + response));
	},

	getGif: function(searchingText) {
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
		return new Promise(
			function(resolve, reject) {
				const xhr = new XMLHttpRequest();
				xhr.onload = function() {
					if (this.status === 200) {
						resolve(this.response);
					} else {
						reject(new Error(this.statusText));
					}
				};
				xhr.onerror = function() {
					reject(new Error(
						`XMLHttpRequest Error: ${this.statusText}`));
				};
				xhr.open('GET', url);
				xhr.send();
			}
		)
	},


	render: function() {
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Wyszukiwarka GIFów!</h1>
				<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a> Naciskaj enter, aby pobrać następne gify.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		)
	}
});