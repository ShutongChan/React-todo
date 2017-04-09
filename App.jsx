import React from 'react';
import 'whatwg-fetch';

var App = React.createClass({
	getInitialState:function() {
		return{
			username:'',
			lastGisUrl:''
		};
	},
	componentDidMount:function() {
		var self = this;
		fetch(this.props.source).then(function(res) {
  		// res instanceof Response == true.
  		
		  if (res.ok) {
		    res.json().then(function(data) {
		    var lastGist = data[0];
		    //debugger;
		    self.setState({
		    		username:lastGist.owner.login,
		    		lastGisUrl:lastGist.html_url
		    	});
		    });
		  } else {
	    		console.log("Looks like the response wasn't perfect, got status", res.status);
	  		}
		}, function(e) {
  				console.log("Fetch failed!", e);
		});	
	},
	componentWillUnmount: function() {  
    	this.serverRequest.abort();  
  	},  
	render:function() {
		return (
			<div>
				{this.state.username} is last gist is
				<a href={this.state.lastGisUrl}>here</a>
			</div>
		);
	}
});
export default App;
