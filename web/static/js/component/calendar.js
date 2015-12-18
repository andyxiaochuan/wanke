/*
Copyright gaochuan
*/


window.Calendar = React.createClass({
	displayName: 'calendar',



	getInitialState: function() {



		return {
		    count: 1,
		};


	},

	handleAddClick: function (){
		if(this.state.count == this.props.maxCount)
			return
		this.setState({
            count: this.state.count+1
        });
        this.props.onChanged(this.state.count+1);
	},

	handleMinusClick: function (){
		if(this.state.count == 1)
			return
		alert(this.state.count);
		this.setState({
       		count: this.state.count-1
    	});
		
    	this.props.onChanged(this.state.count-1);
		
	},

	render: function () {
		
		return (
				<div className="bs-example" data-example-id="split-button-dropdown">
					<div className="btn-group">
						<button type="button" className="btn btn-default">年</button>
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span className="caret"></span>
							<span className="sr-only">Toggle Dropdown</span>
						</button>
						<ul className="dropdown-menu">
							<li><a href="#">2015</a></li>
							<li><a href="#">2016</a></li>
						</ul>
					</div>
					<div className="btn-group">
						<button type="button" className="btn btn-default">月</button>
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span className="caret"></span>
							<span className="sr-only">Toggle Dropdown</span>
						</button>
						<ul className="dropdown-menu">
							<li><a href="#">1</a></li>
							
						</ul>
					</div>
					<div className="btn-group">
						<button type="button" className="btn btn-default">日</button>
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span className="caret"></span>
							<span className="sr-only">Toggle Dropdown</span>
						</button>
						<ul className="dropdown-menu">
							
							<li><a href="#">1</a></li>
							
							
						</ul>
					</div>
				</div>
		)
	}
})