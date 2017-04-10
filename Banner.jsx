import React from 'react';
import ReactDOM from 'react-dom';

var Banner = React.createClass({
	render:function(){
		return(
			<div className="banner">
				<img src="https://facebook.github.io/react/img/logo.svg" />
				<h1><span>React</span> ToDo List</h1>
				<h3>一个用React做的简单ToDoList小应用</h3>
			</div>
			);
	}
})

export default Banner;	