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
					<input type="" value={this.props.defaultValue}  className="form-control" onChange={this.handleChange} />
				</div>
			</div>
		)
	}
})


/**
时间段输入框
*/

var TimesInput = React.createClass({
	getInitialState: function() {
		return {
			count:1
		}

	},

	handleAddTime: function(e){
		var node = e.target
		$(node).prev().after($(node).prev().clone());
		var $carts = $('.xa-remove-char');
		$carts.click(this.handleDlete);
		this.setState({
			count:$carts.length
		})
		this.showOrHide(1);
		
	
	},

	handleDlete: function(e){
		var $carts = $('.xa-remove-char');
		this.setState({
			count:$carts.length
		})
		$(e.target).parent().remove();
		this.showOrHide(1);
		
	},

	componentDidMount:function(){
		// alert("willmount")
		 this.showOrHide(1);
			
	},

	componentDidUpdate:function(){
		//alert('update')
		//this.showOrHide(1);
	},

	showOrHide:function(n){
		var $node=$('.xa-remove-char');
			
			if($node.length <= n){
				//alert('hide')
				$node.hide();
			}
			else{
				//alert('show')
				$node.show();
			}
	},


	render:function(){
		var deleteStyle = {
			padding: '0 3px',
			borderRadius: '15px'
		}
		
		return(
			<div className="form-group">
           		<div className="col-sm-8 mt5 form-inline">
					<div className="xa-timePoint mb10">
						<label >时：</label>
						<input type="number" className="form-control xa-timePoint-h w80"  />
						<label>分：</label>
						<input type="number" className="form-control xa-timePoint-m w80"  />
						<button type="button" style={deleteStyle} className="btn btn-danger glyphicon glyphicon-remove xa-remove-char " onClick={this.handleDlete} ></button>
					</div>
					<div  className="glyphicon glyphicon-plus " onClick={this.handleAddTime}>添加</div>
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
				



			var timePoints = [];
			$(".xa-timePoint").each(function() {
				// var $node = $('.xa-timePoint-h');
				// alert($node.length);
				var charpoint = {};
				charpoint.hour = $(this).find('.xa-timePoint-h').val();
				charpoint.minute = $(this).find('.xa-timePoint-m').val();
				// if(charpoint.x < charpoint.y){
				// 	error = true ;
				// 	errorinfo = '保存失败，请确保反馈问题数大于解决反馈问题数';
				// 	return error
				// }
				//charpoint.time = $(this).find('.xa-timePoint-time').val();
        		timePoints.push(charpoint);
			});		
			console.log(timePoints);
			//data.timePoints = JSON.stringify(timePoints)





				return;
				var data = {};
				data.ownerUserId = this.props.userid;
				data.ownerRegional =  this.state.ownerRegional;
				data.price = this.state.price;
				data.gameTime = this.state.gameTime;
				data.remark = this.state.remark;
				data.mode = this.state.mode;
				data.gameTimes = timePoints
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
				<Regionalselect regionals={this.props.data.regionals} filedNmae="选择大区" onChanged={this.handleRgionalsChange}/>
				<Formcontrol filedNmae="模式" defaultValue={this.props.data.product.mode} onChanged={this.handleModeChange}/>
				<Formcontrol filedNmae="游戏时间" defaultValue="2015/10/12" onChanged={this.handleGameTimeChange}/>
				<div className="form-group pt10">
				<label className="col-sm-2 control-label">游戏时间</label>
					<div className="col-sm-8">
						<TimesInput />
					</div>
				</div>
				<Formcontrol filedNmae="价格" defaultValue={this.props.data.product.price} onChanged={this.handlePriceChange}/>
				<Formcontrol filedNmae="备注" defaultValue={this.props.data.product.remark} onChanged={this.handleRemarkChange}/>
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