const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./router');

// const utils = require('utility');
// const Router = express.Router()
// const model = require('./model')
// const Music = model.getModel('music')
// const User = model.getModel('user');
// const _filter = {'pwd':0,'__v':0}

// const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(router);
// app.use('/user',userRouter)
app.listen(9093,function(){
	console.log('Node app start at port 9093')
})



// app.post('/login', (req, res) => {
// 	const {telEml, pwd} = req.body;
// 	User.findOne({telEml, pwd:md5Pwd(pwd)}, _filter, (err, doc) => {
// 		if (!doc) {
// 			return res.json({code:1,msg:'not find user'});
// 		}
// 		res.cookie('userid', doc._id);
// 		const {name} = doc;
// 		return res.json({code:0,data:name})
// 	})
// })
// app.post('/register', (req, res) => {
// 	const {tel, pwd, name} = req.body;
// 	User.findOne({name}, (err, doc) => {
// 		if (doc) {
// 			return res.json({code:1,msg:'name repeat'})
// 		}
// 		const userModel = new User({tel, name, pwd:md5Pwd(pwd)})
// 		userModel.save((err, doc) => {
// 			if (err) {
// 				return res.json({code:1,msg:'save error'})
// 			}
// 			const {name} = doc;
// 			res.cookie('userid', _id)
// 			return res.json({code:0,data:name})
// 		})
// 	})
// })
