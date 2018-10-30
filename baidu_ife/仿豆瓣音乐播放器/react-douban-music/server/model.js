const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/react-douban-music');

const models = {
  music: {
    'name': {'type': String, 'require': true},
		'src':  {'type': String, 'require': true},
		// 布尔值
		'isColl': {type: Boolean},
		'lrc':  {'type': String},
		'img':  {'type': String},
		'cate': {'type': String},
		'singer': {'type': Object}
  },

	user: {
		'name': {type: String, 'require': true},
		'pwd':  {type:String, 'require':true},
		'tel':	{type:Number}
  }
}

// create
for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

// get
module.exports = {
	getModel(name) {
		return mongoose.model(name)
	}
}


