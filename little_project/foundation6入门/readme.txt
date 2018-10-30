http://foundation.zurb.com


Install git node.js
npm install --global foundation-cli

Found project...


表单布局：
input-group: 组合文本
	一个搜索框
	<form>
		<div class="row">
			<div class="column small-10">
				<div class="input-group">
					<input type="seach" class="input-group-field">
					<div class="input-group-buton">
						<input type="submit" class="button" value="搜索">
					</div>
				</div>
			</div>
		</div>
	</form>


fieldset: 将相关或相似元素分组显示
	<form>
		<div class="row">
			<fieldset class="column fieldset small-10">
				<legend></legend>
				<label>
					姓名
					<input type="text" placeholder="姓名">
				</label>
				<label>
					工作
					<select>
						<option value="1">111</option>
						<option value="2">222</option>
						<option value="3">333</option>
					</select>
				</label>
				<button type="submit" class="button">提交</button>
			</fieldset>
		</div>
	</form>
