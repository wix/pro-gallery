import { GALLERY_CONSTS } from 'pro-gallery-lib';
import GalleryDriver from '../../drivers/pptrDriver';
import { toMatchImageSnapshot } from '../../drivers/matchers';

expect.extend({ toMatchImageSnapshot });

describe('itemShadow - e2e', () => {
  let driver;

  beforeAll(async () => {
    driver = new GalleryDriver();
    await driver.openPage();
  });

  afterAll(async () => {
    await driver.closePage();
  });

  it('should have box-shadow of "15px -13px 5px rgba(250,0,0,1)" to the items', async () => {
    await driver.navigate({
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemEnableShadow: true,
      itemShadowDirection: 50,
      itemShadowSize: 20,
      itemShadowBlur: 5,
      itemShadowOpacityAndColor: 'rgba(250,0,0,1)',
    });
    await driver.waitFor.hookToBeVisible('item-container');
    await driver.waitFor.timer(200);
    const page = await driver.grab.elemScreenshot('.pro-gallery');
    expect(page).toMatchImageSnapshot();
  });

  it('should have box-shadow of "-5px 19px 5px rgba(0,250,0,1)" to the items', async () => {
    await driver.navigate({
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemEnableShadow: true,
      itemShadowDirection: 194,
      itemShadowSize: 20,
      itemShadowBlur: 5,
      itemShadowOpacityAndColor: 'rgba(0,250,0,1)',
    });
    await driver.waitFor.hookToBeVisible('item-container');
    await driver.waitFor.timer(200);
    const page = await driver.grab.elemScreenshot('.pro-gallery');
    expect(page).toMatchImageSnapshot();
  });

  it('should have box-shadow of "0px 20px 0px rgba(0,250,0,1)" to the items', async () => {
    await driver.navigate({
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemEnableShadow: true,
      itemShadowDirection: 180,
      itemShadowSize: 20,
      itemShadowBlur: 0,
      itemShadowOpacityAndColor: 'rgba(0,250,0,1)',
    });
    await driver.waitFor.hookToBeVisible('item-container');
    await driver.waitFor.timer(200);
    const page = await driver.grab.elemScreenshot('.pro-gallery');
    expect(page).toMatchImageSnapshot();
  });

  it('should not have any box-shadow in "oneRow" gallery', async () => {
    await driver.navigate({
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.HORIZONTAL,
      itemEnableShadow: true,
      itemShadowDirection: 50,
      itemShadowSize: 20,
      itemShadowBlur: 5,
      itemShadowOpacityAndColor: 'rgba(250,0,0,1)',
    });
    await driver.waitFor.hookToBeVisible('item-container');
    await driver.waitFor.timer(200);
    const page = await driver.grab.elemScreenshot('.pro-gallery');
    expect(page).toMatchImageSnapshot();
  });

  it('should not have any box-shadow when item "itemEnableShadow" "false"', async () => {
    await driver.navigate({
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemEnableShadow: false,
      itemShadowDirection: 50,
      itemShadowSize: 20,
      itemShadowBlur: 5,
      itemShadowOpacityAndColor: 'rgba(250,0,0,1)',
    });
    await driver.waitFor.hookToBeVisible('item-container');
    await driver.waitFor.timer(200);
    const page = await driver.grab.elemScreenshot('.pro-gallery');
    expect(page).toMatchImageSnapshot();
  });
});
