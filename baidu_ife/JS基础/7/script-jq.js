$(function() {
	function SortTable (data, options) {
		this.data = data;
		this.DEFAULTS = {
			items: '总分',
			methods: '倒序'
		}
		this.options = $.extend({}, this.DEFAULTS, options);
        var items = this.options.items;
        var methods = this.options.methods;
        if (typeof items === 'string') {
            this.options.items = [items];
        }
        if (typeof methods === 'string') {
            this.options.methods = [methods];
        }
		this.renderThead();
	}

	SortTable.prototype = {
		renderThead: function() {
            var methods = this.options.methods;
            var items = this.options.items;
            /*创建select*/
            var selectStr = '<select>';
            $(methods).each(function(i, item) {
                selectStr += '<option>' + item + '</option>'
            });
            selectStr += '</select>';
            /*创建thead并添加select*/
            var theadStr = '<table><thead><tr>';
            var mun;
            $.each(this.data[0],function(i, val) {
                theadStr += '<th>' + i;
                mun = i;
                $(items).each(function(j, item) {
                    if (mun === item) {
                        theadStr += selectStr;
                    }
                });
                theadStr += '</th>';
            });
            theadStr += '</tr></thead><tbody></body></table>';
            $('.container').html(theadStr);

            this.renderTrs();
            this.selectHandler();
        },
        renderTrs: function(item, method) {
            recombineData(item, method);
            var str = '';
            this.data.each(function(i, item) {
                str += '<tr><td>' + item[姓名] + '</td>' + '</td><td>'+data[i]["语文"]+'</td><td>'+data[i]["数学"]+'</td><td>'+data[i]["英语"]+'</td><td>'+data[i]["总分"]+'</td></tr>';
            });
            $('tbody').html(str);
        },
        recombineData: function(_item, _method) {
            var item, method;
            if (_item) {
                item = _item;
            } else {
                item = this.options.items[0];
            }
            if (_method) {
                method = _method;
            } else {
                method = this.options.methods[0];
            }

            /*为此时的item select添加class*/
           /* $('select').each(function(i, ele) {
                if (ele.)
            })*/
            if (method === '倒序') {
                return this.data.sort(compare);
            }

            function compare(v1, v2) {
                if (v1[item] > v2[item]) return 1;
                if (v1[item] < v2[item]) return -1;
                else return 0;
            },
            selectHandler: function() {
                var _this = this;
                $('select').on('click', 'option', function(event) {
                    var method = e.target.value;
                    var item = e.target.previousSibling.nodeValue;
                    _this.renderTrs(item, medth);
                });
            }
        }
        
	}
	var data = [
        {
            "姓名": "小红",
            "语文": 70,
            "数学": 60,
            "英语": 50,
            "总分": 180
        },
        {
            "姓名": "小明",
            "语文": 60,
            "数学": 40,
            "英语": 90,
            "总分": 190
        },
        {
            "姓名": "小亮",
            "语文": 50,
            "数学": 80,
            "英语": 70,
            "总分": 200
        }
    ];
    var sortTable = new SortTable(data);
})