const express = require('express');
const utils = require('utility');

const Router = express.Router()
const model = require('./model')
const Music = model.getModel('music');
const User = model.getModel('user');
const _filter = {'pwd':0,'__v':0}


Router.get('/getplaylist', (req, res) => {
	// Music.remove({},function(e,d){})
	Music.find({}, (err,doc) => {
		return res.json({code:0,data:doc});
	})
})



Router.post('/login', (req, res) => {
	const {telEml, pwd, saveCookie} = req.body;
	User.findOne({tel: telEml, pwd:md5Pwd(pwd)}, _filter, (err, doc) => {
		if (!doc) {
			return res.json({code:1,msg:'not find user'});
		}
		if (saveCookie) res.cookie('userid', doc._id);
		const {name} = doc;
		return res.json({code:0,data:{name}})
	})
})
Router.post('/register', (req, res) => {
	const {tel, pwd, name} = req.body;
	User.findOne({name}, (err, doc) => {
		if (doc) {
			return res.json({code:1,msg:'name repeat'})
		}
		const userModel = new User({tel, name, pwd:md5Pwd(pwd)})
		userModel.save((err, doc) => {
			if (err) {
				return res.json({code:1,msg:'save error'})
			}
			const {name, _id} = doc;
			// res.cookie('userid', _id)
			return res.json({code:0,data:{name}})
		})
	})
})

Router.get('/getuserinfo', (req, res) => {
	// 用户有没有cookie
	const { userid } = req.cookies;
	if (!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid} ,_filter , (err,doc) => {
		if (err) {
			return res.json({code:1, msg:'find error'})
		}
		if (doc) {
			return res.json({code:0,data:{name: doc.name}})
		}
	})

	
})

function md5Pwd(pwd){
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router