const puppeteer = require('puppeteer-core');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const hotels = [
  { hotelName: 'test', lat: 35.70211276879759, long: 51.36451619181062 },
  { hotelName: 'test2', lat: 42.0417985626, long: 27.9841025104 }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true
  });

  const page = await browser.newPage();

  for (const hotel of hotels) {
    const { hotelName, lat, long } = hotel;

    const url = `https://neshan.org/maps/search/${lat},${long}#c${lat}-${long}-17z-0p`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // جایگزین waitForTimeout
    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.setViewport({ width: 866, height: 220 });

    await page.screenshot({
      path: `${hotelName}.png`,
      clip: { x: 0, y: 0, width: 866, height: 220 }
    });

    console.log(`✅ Saved screenshot for: ${hotelName}`);
  }

  await browser.close();
})();