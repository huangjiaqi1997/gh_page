$(function() {
  /* 方法一 */
  $('#file-input').on('change', function() {
    // 使用let formData = new FormData(this.form);
    // 无法获取文件内容

    // FileReader可以读取整个文件内容
    // input.files就是用户选中的文件
    let fileReader = new FileReader(),
        fileType = this.files[0].type;
    fileReader.onload = function() {
      if (/^image\/[jpeg|png|gif]/.test(fileType)) {
        // 读取结果在fileReader.result里
        $(`<img src="${this.result}" alt=""/>`).appendTo('body');
      }
    }

    // 原始File对象
    /*lastModified: 1503904591464
      lastModifiedDate: Mon Aug 28 2017 15:16:31 GMT+0800 (中国标准时间) {}
      name: "3e6c1ca0cbb208638baf40838e1d5dad.jpg"
      size: 91774
      type: "image/jpeg"
      webkitRelativePath: ""
      __proto__: File */
    console.log(this.files[0]);

    // 按base64的方式读取
    // 结果是base64，任何文件都可转成base64的形式
    // 以原始二进制方式读取
    // 读取结果可直接转成整数数组
    // fileReader.readAsArrayBuffer(this.files[0]);
    fileReader.readAsDataURL(this.files[0])
  });


  /* 方法二 */
  $('.img-container').on('dragover', function(event) {
    event.preventDefault();
  })
  .on('drop', function(event) {
    event.preventDefault();

    // 数据在event的dataTransfer对象里
    let file = event.originalEvent.dataTransfer.files[0];

    // 使用FileReader进行操作
    let fileReader = new FileReader(),
        fileType = file.type;
    fileReader.onload = function() {
      if (/^image\/[jpeg|png|gif]/.test(fileType)) {
        $('.img-container p').replaceWith(`<img src="${this.result}" alt=""/>`);
      }
    }
    fileReader.readAsDataURL(file);

    // 或者添加到FormData
    let formData = new FormData();
    formData.append('fileContent', file)
    console.log(formData);
  });


  /* 方法三 */
  $('#editor').on('paste', function(event) {

    // 粘贴的数据在event.clipboardData.files里
    let file = event.originalEvent.clipboardData.files[0];
    
    let fileReader = new FileReader(),
        fileType = file.type;
    fileReader.onload = function() {
      if (/^image\/[jpeg|png|gif]/.test(fileType)) {
        $('.img-container p').replaceWith(`<img src="${this.result}" alt=""/>`);
      }
    }
    fileReader.readAsDataURL(file);
  })
})