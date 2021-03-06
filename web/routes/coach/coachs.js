'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('dorado:alluser');
var _ = require('underscore');

var settings = require('settings');
var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var userModels = require('../account/models');
var orderModels = require('../order/models');
var newsModels = require('../news/models');
var normalcompanyModels = require('../normalcompany/models');


router.get('/', function(req, res, next) {
	//console.log('alluser---------',req.user.id);

	var sqlquery = {is_coach:true};
	if(req.GET.conditions) {
		
		var conditions = req.GET.conditions.split(',');
		console.log('conditions---------',conditions);
		
		conditions.map(function(condition) {

			switch(condition)
			{
			case 'girl':
				sqlquery['six'] = 1
				console.log('conditions---------',1);
			  	break;
			case 'boy':
				sqlquery['six'] = 0;
				console.log('conditions---------',2);
			  	break;
			case 'win':
				sqlquery['baolying'] = 1;
				console.log('conditions---------',3);
			  	break;
			default:
			}
			
		})
	}


	console.log(sqlquery+"----------------------");




	userModels.User.find(sqlquery).exec(function(err, users) {
		if (err) {
			return next(err);
		}
		// console.log('alluser---------',users);

		orderModels.order.find().sort({_id:-1}).exec(function(err, orders) {
			console.log('alluser---------',orders);

			_.connectRelatedObj({
				local: {
					data: orders,
					field: 'sellerId'
				},
				relate: {
					model: userModels.User,
					field: 'seller'
				}
			}).then(function (data){

				_.connectRelatedObj({
					local: {
						data: orders,
						field: 'buyerId'
					},
					relate: {
						model: userModels.User,
						field: 'buyer'
					}
				}).then(function (data){


					normalcompanyModels.normalcompany.find().exec(function(err, normalcompanys) {

						console.log("normalcompany",normalcompanys);
						var _users = [];
						users.map(function(user){
							normalcompanys.map(function(normalcompany){
								if(normalcompany.ownerUserId == user._id){
									user.normalcompany =  normalcompany;
									if(req.GET.name){
										if(user.name == req.GET.name){
											_users.push(user);
										}
									}else{
										_users.push(user);
									}
									//console.log("========================="+req.GET.name+"===============================");
								}
							})
						})

						newsModels.news.find().sort({_id:-1}).exec(function(err,newses) {
							if (err) {
								return next(err);
							}
							
							var c = RequestContext(req, {
								users: _users,
								is_coach: req.user.is_coach,
								orders: data,
								newses: newses,
							});
							res.render('coach/coachs.html', c);
						});
					})


				})

				
			})


		})
	});

}.require(precondition.login_required));

router.isResource = true;
module.exports = router;


