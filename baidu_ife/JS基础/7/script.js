/*生成表格
排序的列(按钮标识)
排序方式(默认方式)*/

(function() {
	function SortTable(data, options) {
		/*
		整合默认参数，包装成数组
		*/
		this.data = data;
		this.options = options;
		this.options.DEFAULT = {
			sortItems: '总分',
			sortModes: '倒序'
		}
		var sortItems = this.options.sortItems;
		var sortModes = this.options.sortModes;
		if (!sortItems) sortItems = this.options.DEFAULT.sortItems;
		if (!sortModes) sortModes = this.options.DEFAULT.sortModes;
		
		if (typeof sortItems === 'string') this.options.sortItems = [sortItems];
		if (typeof sortModes === 'string') this.options.sortModes = new Array(sortModes);
		/*
		渲染表头
		*/
		this.renderDOMThead();
	}

	SortTable.prototype = {
		renderDOMThead: function() {
			var container = document.getElementsByClassName('container')[0];
			var containerInnerHtml = '<table><thead><tr class="thead"><th>姓名</th><th>语文</th><th>数学</th><th>英语</th><th>总分</th></tr></thead></table>';
			container.innerHTML = containerInnerHtml;
			this.table = container.getElementsByTagName('table')[0];
			this.thead = container.getElementsByClassName('thead')[0];
			this.tbody = document.createElement('tbody');
			this.table.appendChild(this.tbody);
			/*
			渲染表头th中的select
			*/
			this.renderDOMSelect();
			/*
			渲染tbody
			*/
			this.renderDOMTbody();
		},
		/*
		循环遍历th，sortitems，sortModes
		*/
		renderDOMSelect: function() {
			var sortModes = this.options.sortModes;
			var sortItems = this.options.sortItems;
			for (var i = 0; i < this.thead.childNodes.length; i++) {
				for (var j = 0; j < sortItems.length; j++){
					if(this.thead.childNodes[i].innerHTML === sortItems[j]) {

						var selectModes = document.createElement('select');
						selectModes.className = 'col' + i;
						for(var k = 0; k < sortModes.length; k++) {
							var option = document.createElement('option');
							option.innerHTML = sortModes[k];
							selectModes.appendChild(option);
							this.thead.childNodes[i].appendChild(selectModes);
						}
					}
				
				}
			}
			/*
			绑定click事件
			*/
			this.optionHandler();
		},

		renderDOMTbody: function(sortItem, sortMode) {
			this.recombineData(sortItem, sortMode);
			var data = this.data;
			var tbodyHtml = '';
			for(var i = 0; i < this.data.length; i ++) {
				tbodyHtml += '<tr><td>'+data[i]["姓名"]+'</td><td>'+data[i]["语文"]+'</td><td>'+data[i]["数学"]+'</td><td>'+data[i]["英语"]+'</td><td>'+data[i]["总分"]+'</td></tr>';
			}
			this.tbody.innerHTML = tbodyHtml;
		},

		recombineData: function(sortItem, sortMode) {
			/*
			根据item，mode重新排序数据
			若传值，用传值
			若没有参数，用各默认参数第一项
			*/
			var item;
			var mode;
			if (sortItem) {
				item = sortItem;
			} else {
				item = this.options.sortItems[0];
			}
			if (sortMode) {
				mode = sortMode;
			} else {
				mode = this.options.sortModes[0];
			}
			/*
			根据item遍历selects切换className
			*/
			var selects = this.thead.getElementsByTagName('select');
			for (var i = 0; i < selects.length; i ++) {
				if (selects[i].parentNode.innerText === item) {
					selects[i].classList.add('used');
				} else {
					selects[i].classList.remove('used');
				}
			}

			if(mode === '正序') {
				return this.data.sort(compare);
			} else if(mode === '倒序') {
				var result = this.data.sort(compare);
				return result.reverse();
			} else {
				return;
			}
			
			function compare(value1, value2) {
				if(value1[item] > value2[item]) return 1;
				if(value1[item] < value2[item]) return -1;
				else return 0;
			}
		},
		/*
		option上不能触发事件，在select上采用事件委托
		** e.target 不是点击的option，而是select。
		*/
		optionHandler: function() {
			var selects = this.thead.getElementsByTagName('select');
			var _this = this;
			for (var i = 0; i < selects.length; i ++) {
				selects[i].addEventListener('click', function(e){
					var sortItem = e.target.previousSibling.nodeValue;
					var sortMode = e.target.value;
					_this.renderDOMTbody(sortItem, sortMode);
				}, false)
			}
			
		}
	};
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
	var table = new SortTable(data, {
		sortItems: ['总分','语文'],
		sortModes: ['倒序', '正序']
	});



})();
