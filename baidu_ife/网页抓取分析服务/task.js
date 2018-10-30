const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');


(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const data = {
    code: "",
    msg: "",
    word: "puppeteer",
    time: "",
    dataList: []
  };


  try {
    await page.goto('https://www.baidu.com/s?wd=puppeteer', {waitUntil: 'networkidle'});
    // await page.screenshot({path: 'example.png'});

    // const seachInput = await page.$('input.s_ipt');
    // console.log(seachInput);
    // await seachInput.click();
    // await page.type('puppeteer');
    // const seachBtn = await page.$('input#su');
    // await seachBtn.click();
    // await page.click('input#su');


    await page.waitForSelector('.c-container');

    const dataList = await page.evaluate(() => {
      const list = [...document.querySelectorAll('.c-container')];
      // const list = Array.from(document.querySelectorAll('.c-container'));
      return list.map(el => {
        return {
          title: el.querySelector('h3.t').innerText,
          // 若不存在，会报错
          info: el.querySelector('.c-abstract') ? el.querySelector('.c-abstract').innerText : '',
          link: el.querySelector('h3.t a').href,
          pic: el.querySelector('.c-img.c-img6') ? el.querySelector('.c-img.c-img6').src : ''
        }
      })
    })

    data.dataList = dataList;
    console.log(JSON.stringify(data));

  } catch (e) {
    console.log(e);
  };
  // return JSON.stringify(data);

  // const content = await page.content();
  // const $ = cheerio.load(content, {decodeEntities: false});
  // $('.c-container').each((index, el) => {
  //   data.dataList.push({
  //     title: $(el).find('h3.t').text(),
  //     info: $(el).find('.c-abstract').text(),
  //     link: $(el).find('h3.t a').attr('href'),
  //     pic: $(el).find('.c-img.c-img6').attr('src')
  //   })
  // })


  await browser.close();
})();