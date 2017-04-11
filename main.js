import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from './ToDo.jsx';
import TestDemo from './TestDemo.jsx'
import Banner from './Banner.jsx';

require("./style.css");



ReactDOM.render(
	 <div>
	    <Banner />
	    <ToDo />
	</div>
	,
	document.getElementById('app'));

//ReactDOM.render(<App />, document.getElementById('app'))