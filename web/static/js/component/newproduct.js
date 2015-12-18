/*
Copyright gaochuan
*/
var Regionalselect = React.createClass({

	displayName: 'Regionalselect',

	handleChange: function(e){
		this.props.onChanged(e.target.value);
	},

	render: function() {
		var optionNodes = this.props.regionals.map(function(regional){
			var Carrieroperator ;
			if(regional.ownCarrieroperator == 0){
				Carrieroperator = "电信";
			}
			else{
				Carrieroperator = "网通";
			}
			return (
				<option value={regional.id}>{regional.name}---{Carrieroperator}</option>
			)
		})

		return (
			<div className="form-group pt10">
				<label className="col-sm-2 control-label">{this.props.filedNmae}</label>
				<div className="col-sm-8">
					<select name="" id="" onChange={this.handleChange}>
						<option>请选择区服</option>
						{optionNodes}
					</select>
				</div>
			</div>
			
		)
	}
})


var Formcontrol = React.createClass({

	displayName:"Formcontrol",

	handleChange: function (e){
		this.props.onChanged(e.target.value);
	},

	render:function(){
		return (
			<div className="form-group pt10">
				<label className="col-sm-2 control-label">{this.props.filedNmae}</label>
				<div className="col-sm-8">
					<input type="" className="form-control xa-mode" onChange={this.handleChange} />
				</div>
			</div>
		)
	}
})


window.Newproduct = React.createClass({
	displayName: 'Newproduct',

	getInitialState: function() {
		return {
			ownerUserId : '',
			ownerRegional :'',
			price : '',
			gameTime : '',
			remark : '',
			mode : '',
			convention : '',
		}

	},
	handleSubmit:function(){
				var data = {};
				data.ownerUserId = this.props.userid;
				data.ownerRegional =  this.state.ownerRegional;
				data.price = this.state.price;
				data.gameTime = this.state.gameTime;
				data.remark = this.state.remark;
				data.mode = this.state.mode;
				console.log(data);
				
				W.Resource.put({
					resource: 'product.product',
					data: data,
					success: function(data) {
						W.showHint('success', '成功，重新加载页面...');
						_.delay(function() {
						    window.location.reload();
						}, 1000);
					},
					error: function() {
					W.showHint('error', '更新失败！');
	        		}
				})	
	},

	handleRgionalsChange: function(value) {
		this.setState({
			ownerRegional:value
		})
	},

	handleModeChange: function(value) {
		this.setState({
			mode:value
		})
	},

	handleGameTimeChange: function(value) {
		this.setState({
			gameTime:value
		})
	},

	handlePriceChange: function(value) {
		this.setState({
			price:value
		})
	},

	handleRemarkChange: function(value) {
		this.setState({
			remark:value
		})
	},

	render: function() {
		return (
			<div className="NewOrder">
				<Regionalselect regionals={this.props.regionals} filedNmae="选择大区" onChanged={this.handleRgionalsChange}/>
				<Formcontrol filedNmae="模式" onChanged={this.handleModeChange}/>
				<Formcontrol filedNmae="游戏时间" onChanged={this.handleGameTimeChange}/>
				<Formcontrol filedNmae="价格" onChanged={this.handlePriceChange}/>
				<Formcontrol filedNmae="备注" onChanged={this.handleRemarkChange}/>
				<div className="form-group pt10">
					<label className="col-sm-2 control-label"></label>
					<div className="col-sm-8">
						<div className="btn btn-primary" onClick={this.handleSubmit}>保存</div>
					</div>
				</div>
			</div>
		);
	}
	
});