const puppeteer = require('puppeteer');
const url: string = process.argv[2];
let result: object = {'error': false, 'data':null, 'message':null};

if(!url) {
    console.log(JSON.stringify(result));
    process.exit(1);
}

(async () => {
  let regex = /[^0-9]/g;
  let likes: string;
  let views: string;
  let comments: string;

  const browser = await puppeteer.launch({args: ['--start-fullscreen', '--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']});
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForTimeout(2000);//.then(() => console.log('Waited a second!'));

  if(url.indexOf('cafe') > -1) {
    const frame = page.frames().find(frame => frame.name() === 'cafe_main');
    views = await frame.$eval('div.article_info span.count', (element) => element?element.innerText:'0');
    likes = await frame.$eval('[data-type="like"] em.u_cnt._count', (element) => element?element.innerText:'0');
    comments = await frame.$eval('a.button_comment strong.num', (element) => element?element.innerText:'0');
  } else {
    views = await page.$eval('span.content_viewcount__1OovO', (element) => element?element.innerText:'0');
    likes = await page.$eval('span.appraisal_point__3_xs9', (element) => element?element.innerText:'0');
    comments = await page.$eval('strong.header_count__LvnGz', (element) => element?element.innerText:'0');
  } 
  
  result['data'] = {'views': Number(views.replace(regex, "")), 
                    'likes': Number(likes.replace(regex, "")), 
                    'comments': Number(comments.replace(regex, ""))};

  console.log(JSON.stringify(result));
  await browser.close();
})();