const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    let page = await browser.newPage();

    await page.goto('http://es6.ruanyifeng.com/#README');
    await page.waitForSelector('ol li a');

    let aTags = await page.evaluate(() => {
      let as = [...document.querySelectorAll('ol li a')];
      return as.map((a) =>{
          return {
            href: a.href.trim(),
            name: a.text
          }
      });
    });

    await page.pdf({path: `./es6-pdf/${aTags[0].name}.pdf`});
    page.close()

    // 这里也可以使用promise all，但cpu可能吃紧，谨慎操作
    for (var i = 1; i < aTags.length; i++) {
      page = await browser.newPage()

      var a = aTags[i];

      await page.goto(a.href);

      await page.waitForSelector('#留言');

      await page.pdf({path: `./es6-pdf/${a.name}.pdf`});

      page.close();
    }

    browser.close();
});