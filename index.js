const puppeteer = require('puppeteer');
const fs = require('fs');

const hotels = [
  { hotelName: 'test', lat: 41.0417988626, long: 28.9841025404 },
  { hotelName: 'test2', lat: 42.0417985626, long: 27.9841025104 }
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const hotel of hotels) {
    const { hotelName, lat, long } = hotel;

    // ساخت URL نشان
    const url = `https://neshan.org/maps/search/${lat},${long}#c${lat}-${long}-17z-0p`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // منتظر بماند تا نقشه لود شود
    await page.waitForTimeout(3000);

    // اندازه ویوپورت را تنظیم کن
    await page.setViewport({ width: 866, height: 220 });

    // عکس بگیر
    await page.screenshot({ path: `${hotelName}.png`, clip: { x: 0, y: 0, width: 866, height: 220 } });

    console.log(`✅ Saved screenshot for: ${hotelName}`);
  }

  await browser.close();
})();
