import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome'

var glist = ["Learn React",
			"Write a ToDo List",
			"Debugger",
			"Keep Learning & Moving"];
var ToDo = React.createClass({
	//父组件state存储数据，react的思想是建议将数据存储放在state中，通过props传给子组件
	getInitialState:function() {
		return{
			//state用来控制todolist
			todolist:["Learn React",
			"Write a ToDo List",
			"Debugger",
			"Keep Learning & Moving"],
			serachtext:""
		};	
	},
	handleChange:function(rows){
		//当发生增删改查时改变state重新渲染
		this.setState({
			todolist:rows
		});
	},
	render:function(){
		return(
			//添加子组件
			<div className="toDoContainer">
			<SearchBox ss={this.state} search={this.handleChange} />
			//todo 将todolist的数据传入到组件，用于组件展示数据
				<TypeNew todo={this.state.todolist} add={this.handleChange} />
				<ListToDo todo={this.state.todolist} change={this.handleChange} />
			</div>
		)
	}
});

var SearchBox = React.createClass({
	  handleChange:function(e){
	  	//var rows = this.props.ss.todolist;
	  	var before = glist;
	  	//var _self = this;
	  	var text = e.target.value.trim();
	  	if (text != '') {
	  		var todoItems = before.filter(function(item){
	  			return item.toLowerCase().indexOf(text.toLowerCase()) == 0;
	  		});
	  		
	  		this.props.search(todoItems);
	  	}
	  	else{
	 
	  		this.props.search(before);

	  	}
	  	

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
			//获取数据
			var newthing = inputDom.value.trim();
			var rows = this.props.todo;
			//如果输入的数据为空值则返回提示无法添加
			if (newthing == '') {
				alert("数据不能为空");
				return;
			}
			//向数组内添加新数据
			rows.push(newthing);
			//回调改变state
			this.props.add(rows);
			glist = rows;
			//清空输入框
			inputDom.value = '';
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
				<div className="row">
					<form onSubmit={this.handleSubmit}>
						<div className="col-lg-12">
							<div className="input-group">
								<input type="text" className="form-control"  ref="inputnew" placeholder="typing a newthing to do" autoComplete="off" onKeyDown={this.handleKeyDown} />
								<span className="input-group-btn">
									<input type="button" className="btn btn-default" value="提交" onClick={this.handleAdd} />																	
								</span>
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
				changevalue:''
				}
		},
		handleDel:function(event){
			var rows = this.props.todo;
			//获取index
			var index = event.target.getAttribute('data-index');
			//根据index删除数据
			rows.splice(index,1);
			//回调给父组件改变state
			this.props.change(rows);
			glist = rows;
			this.setState({
				changenum:-1
			});

		},
		//点击修改按钮后改变state
		handleChange:function(e){

			var index = e.target.getAttribute('data-index');
			var msg = this.props.todo[index];
			this.setState({
				changenum:index,
				changevalue:msg
			});

		},
		handleText:function(e){
			this.setState({
				changevalue:e.target.value
			})
		},
		handleSave:function(){
			var inputDom = ReactDOM.findDOMNode(this.refs.inputnew);
			var newthing = inputDom.value.trim();
			var rows = this.props.todo;
			if (newthing == '') {
				alert("数据不能为空");
				return;
			}
			var index = this.state.changenum;
			//rows[index]改变为更新的数据
			rows[index] = newthing;
			//回调
			this.props.change(rows);
			glist = rows;
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
							//如果有点击修改则在此处渲染成type框
							if (this.state.changenum == i) {
								return(
									<li key={i} className="editActive" >
										<input type="text" ref="inputnew" value={this.state.changevalue} autoFocus="autofocus" onChange={this.handleText} />
										<img src="public/images/done.png" onClick={this.handleSave} />
									</li>
									);
							}
							else{
								return(
									<li key={i}>
										<span>{item}</span>
										<img src="public/images/delete.png" onClick={this.handleDel} data-index={i} />
										<img src="public/images/edit.png" onClick={this.handleChange} data-index={i} />
										
									
										
									</li>
								);
							}
							
						}.bind(this))
					}
				</ul>
			);
		}
	});



export default ToDo;
//React.render(<ToDo />, document.body);