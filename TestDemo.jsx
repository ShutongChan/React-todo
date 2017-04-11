import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'whatwg-fetch';

var TestDemo = React.createClass({
	render:function(){
		var names = ['a', 'b', 'c'];
		var arr = [
			<h1>Hello World</h1>,
			<h2>React is awsome</h2>
		];
		var data = 123;	
		return(
			<div>
				<TestClickComponent/>
				<TestInputComponent/>
				{
					names.map(function(name){
					return <div>Hello,{name}!</div>
					})
				}
				<div>{arr}</div>
				<HelloMessage name="Planti" />
				<NodeList>
					<span>hello</span>
					<span>world</span>
				</NodeList>

				<MyComponent />
				<MyTitle title={data} />
				<LikeButton />
				<Hello name="world" />
		    	<App source="https://api.github.com/users/octocat/gists" />
	    	</div>
			);
	}
});

var TestClickComponent = React.createClass({
	handleClick: function(event) {
		var tipE = ReactDOM.findDOMNode(this.refs.tip);
		if (tipE.style.display == 'none') {
			//console.log(tipE.display);
			tipE.style.display = 'inline';
		} else {
			//console.log(tipE.display);
			tipE.style.display = 'none';
		}

		event.stopPropagation();
		event.preventDefault();
	},
	render: function() {
		return(
			<div>
				<button onClick={this.handleClick}>显示|隐藏</button><span ref="tip">测试显示</span>
			</div>
		);
	}
});

var TestInputComponent = React.createClass({
	getInitialState: function() {
		return {
			inputContent: ''
		}
	},
	changeHandler: function(event) {
		this.setState({
			inputContent: event.target.value
		});
		event.stopPropagation();
		event.preventDefault();
	},
	render: function() {
		return (
			<div>
					<input type="text" onChange={this.changeHandler}/><span>{this.state.inputContent}</span>
				</div>
		);
	}
});

var HelloMessage = React.createClass({
	render: function() {
		return <h1>Hello {this.props.name}</h1>;
	}
});

var NodeList = React.createClass({
	render: function() {
		return (
			<ol>
				{
					React.Children.map(this.props.children,function(child){
						return <li>{child}</li>;
					})
				}
				</ol>
		);
	}
});

var MyComponent = React.createClass({
	handleClick: function() {
		this.refs.myTextInput.focus();
	},
	render: function() {
		return (
			<div>
					<input type='text' ref='myTextInput' />
					<input type="button" value="Focus the text input" onClick={this.handleClick} />
				</div>
		);
	}
});

var MyTitle = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired
	},
	render: function() {
		return <h1>{this.props.title}</h1>;
	}
});

var LikeButton = React.createClass({
	getInitialState: function() {
		return {
			liked: false
		};
	},
	handleClick: function(event) {
		this.setState({
			liked: !this.state.liked
		});
	},
	render: function() {
		var text = this.state.liked ? 'like' : 'haven\'t liked';
		return (
			<p onClick = {this.handleClick}>
					You {text} this. Click to toggle.
				</p>
		);
	}
});

var Hello = React.createClass({
	getInitialState: function() {
		return {
			opacity: 1.0
		};
	},
	componentDidMount: function() {
		this.timer = setInterval(function() {
			var opacity = this.state.opacity;
			opacity -= .05;
			if (opacity < 0.1) {
				opacity = 1.0
			}
			this.setState({
				opacity: opacity
			});
		}.bind(this), 100);
	},
	render: function() {
		return (
			<div style={{opacity:this.state.opacity}}>
					Hello {this.props.name}
				</div>
		);
	}
});

export default TestDemo;


