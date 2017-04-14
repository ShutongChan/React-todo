import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import ReactHighcharts from 'react-highcharts';


var glist = [{"item1":3},
			{"item2":4},
			{"item3":5},
			{"item4":6}];
var chartDiv = '';
var ToDo = React.createClass({
	//父组件state存储数据，react的思想是建议将数据存储放在state中，通过props传给子组件
	getInitialState:function() {
		return{
			//state用来控制todolist
			todolist:[],
			serachtext:""
		};
			
	},
	componentDidMount:function() {
		
		var init = localStorage.getItem("mylist");
		if(init == null){
			localStorage.setItem("mylist", glist);
		}		
		var initlist = localStorage.getItem("mylist").split(",");
		this.setState({
			todolist:glist,
			serachtext:""

		}); 
	},
	handleChange:function(rows){
		//当发生增删改查时改变state重新渲染
		this.setState({
			todolist:rows
		});
		localStorage.setItem("mylist", glist);

	},
	render:function(){
		return(
			//添加子组件
			<div>
				<div className="toDoContainer">
				<SearchBox ss={this.state} search={this.handleChange} />
				//todo 将todolist的数据传入到组件，用于组件展示数据
					<TypeNew todo={this.state.todolist} add={this.handleChange} />
					<ListToDo todo={this.state.todolist} change={this.handleChange} />
					<Chart todo={this.state.todolist} />
				</div>
				
			</div>
		)
	}
});


var SearchBox = React.createClass({
	  handleChange:function(e){
	  	//var rows = this.props.ss.todolist;
	  	//var _self = this;
	  	var before = glist;
	  	var text = e.target.value.trim();
	  	if (text != '') {
	  		var todoItems = before.filter(function(item){
	  			for(var key in item){
				return key.toLowerCase().indexOf(text.toLowerCase()) == 0;
			}
	  			
	  		});
	  		
	  		this.props.search(todoItems);
	  	}
	  	else{
	 
	  		this.props.search(before);

	  	}
	  	chartDiv.style.display = 'none';

	  },
	  render: function() {
	    return (
	      <div className="searchBox">
	        <input type="text" className="form-control searchInput" ref="inputserach" onChange={this.handleChange}  placeholder="typing keywords to search"/>
	      </div>
	    );
	  }
});

//输入框组件用于新增数据
	var TypeNew = React.createClass({
		handleAdd:function(){
			//获取真实DOM 虚拟DOM无法获取表单元素的数据
			var inputDom = ReactDOM.findDOMNode(this.refs.inputnew);
			var inputNumDom = ReactDOM.findDOMNode(this.refs.inputnewnum); 
			//获取数据
			var newthing = inputDom.value.trim();
			var newnum = inputNumDom.value.trim();
			var newVote ={};
			newVote[newthing] = newnum;
			var rows = this.props.todo;
			//如果输入的数据为空值则返回提示无法添加
			if (newthing == '' || newnum == '') {
				alert("数据不能为空");
				return;
			}
			//向数组内添加新数据
			rows.push(newVote);
			glist = rows;
			//回调改变state
			this.props.add(rows);
			
			//清空输入框
			inputDom.value = '';
			inputNumDom.value = '';
			inputDom.focus();
			chartDiv.style.display = 'none';
		},
		handleKeyDown:function(e){
			 //alert(e.keyCode);
			 if(e.keyCode == 13)  
				this.handleAdd(); 
			
		},
		handleSubmit:function(e){
			e.preventDefault(); 
			return false;
		},
		render:function(){
			return(
				<div>
					<form onSubmit={this.handleSubmit} >
						<div>
							<div className="input-div">
								
								<input type="text" className="input-control"  ref="inputnew" placeholder="项目名称" autoComplete="off" onKeyDown={this.handleKeyDown} />
								<input type="number" className="input-control" onKeyDown={this.handleKeyDown} ref="inputnewnum" autoComplete="off" placeholder="投票数" />
								<input type="button" className="btn btn-default sub_btn" value="提交" onClick={this.handleAdd} />																																
							</div>
							
						</div>
					</form>
				</div>
				);
		}

	});

//用于展示数据、删除、修改数据
	var ListToDo = React.createClass({
		//子组件state用于记录修改状态
		getInitialState:function() {
			return{
				//changenum是记录哪一个list要修改，changevalue记录要修改的list的值
				changenum:-1,
				changevotekey:'',
				changevotenum:0
				}
		},
		handleDel:function(event){
			var rows = this.props.todo;
			//获取index
			var index = event.target.getAttribute('data-index');
			//根据index删除数据
			rows.splice(index,1);
			glist = rows;
			//回调给父组件改变state
			this.props.change(rows);
			
			this.setState({
				changenum:-1
			});
			chartDiv.style.display = 'none';

		},
		//点击修改按钮后改变state
		handleChange:function(e){

			var index = e.target.getAttribute('data-index');
			var msg = this.props.todo[index];
			for(var key in msg){
				var votekey = key;
				var votenum = msg[key];
			}
			this.setState({
				changenum:index,
				changevalue:votekey,
				changevotenum:votenum
			});
			chartDiv.style.display = 'none';

		},
		handleVoteKey:function(e){
			this.setState({
				changevalue:e.target.value
			})
		},
		handleVoteNum:function(e){
			this.setState({
				changevotenum:e.target.value
			})
		},
		handleSave:function(){
			var inputDom = ReactDOM.findDOMNode(this.refs.inputnew);
			var inputNumDom = ReactDOM.findDOMNode(this.refs.inputnewnum);
			var newthing = inputDom.value.trim();
			var newnum = inputNumDom.value.trim();
			var newVote ={};
			newVote[newthing] = newnum;
			var rows = this.props.todo;
			if (newthing == '' || newnum == '') {
				alert("数据不能为空");
				return;
			}
			var index = this.state.changenum;
			//rows[index]改变为更新的数据
			rows[index] = newVote;
			glist = rows;
			//回调
			this.props.change(rows);
			
			//改变当前state回到展示状态
			this.setState({
				changenum:-1
			})

		},
		render:function(){
			return(
				<ul id="todolist">
					{
						//遍历数据
						this.props.todo.map(function(item,i){
							for(var key in item){
							//如果有点击修改则在此处渲染成type框
							if (this.state.changenum == i) {
								return(
									<li key={i} className="editActive" >
										<div>
											<input type="text" ref="inputnew" value={this.state.changevalue} autoFocus="autofocus" onChange={this.handleVoteKey} />
											<input type="num" ref="inputnewnum" value={this.state.changevotenum} onChange={this.handleVoteNum} />
										</div>
										<img src="public/images/done.png" onClick={this.handleSave} />
									</li>
									);
							}
							else{
								return(
									<li key={i}>
										<div>
											<span>{key}</span>
											<span>得票数：{item[key]}</span>
										</div>
										<img src="public/images/delete.png" onClick={this.handleDel} data-index={i} />
										<img src="public/images/edit.png" onClick={this.handleChange} data-index={i} />
										
									
										
									</li>
								);
							}
						}
						}.bind(this))
					}
				</ul>
			);
		}
	});

	var Chart = React.createClass({
	getInitialState() {
		return{
			numTotal:0,
			config:{
				chart:{
			  	type: 'column'
			  },
			  title:{
			  	text:'项目投票百分比'
			  },
			  xAxis: {
			    categories: []
			  },
			  yAxis: {
			      min: 0,
			      max:100,
			      title: {
			         text: '投票百分比 (%)'         
			      }      
			   },
			  series: [{
			    data: []
			  }],
			  tooltip:{
			      valueSuffix: '%'
			   },
			   plotOptions: {
                    column:{
                        dataLabels:{
                            enabled:true,
                        }
                    }
      			}
			}
		}
			
	},
	createChart:function(){
		var rows = this.props.todo;
		var numTotal = 0;
		var voteNum = [];
		var voteKey = [];
		rows.map(function(item,i){
			for(var key in item){
				numTotal += parseInt(item[key]); 
			}
		});
		for(var i = 0;i < rows.length;i++){
			for(var key in rows[i]){
				voteNum.push((parseInt(rows[i][key]))*100/numTotal);
				voteKey.push(key);
			}
		};
		var config = this.state.config;
		config['xAxis']['categories'] = voteKey;
		config['series'][0]['data'] = voteNum;
		this.setState({
			numTotal:numTotal,
			config:config
		});
		ReactDOM.findDOMNode(this.refs.HighCharts).style.display = 'block';
		chartDiv = ReactDOM.findDOMNode(this.refs.HighCharts);

	},
	render:function(){
		return(
			<div>
				<button className="btn btn-default chart_button" onClick={this.createChart}>确认</button>
				<div className="HighCharts" ref="HighCharts">
					<ReactHighcharts config={this.state.config} />
				</div>
			</div>
		)
	}
})


export default ToDo;
//React.render(<ToDo />, document.body);