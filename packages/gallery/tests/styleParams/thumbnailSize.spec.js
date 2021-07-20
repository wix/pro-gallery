import { GALLERY_CONSTS } from 'pro-gallery-lib';
import GalleryDriver from '../drivers/reactDriver';
import { expect } from 'chai';
import { images2 } from '../drivers/mocks/items';
import { styleParams, dimensions } from '../drivers/mocks/styles';

describe('styleParam - thumbnailSize', () => {
  let driver;
  const initialProps = {
    dimensions,
    items: images2,
    styles: styleParams,
  };
  beforeEach(() => {
    driver = new GalleryDriver();
  });
  it('should "thumbnailSize" of "300"', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.THUMBNAIL,
      thumbnailSize: 300,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const thumbnailItem = driver.find.selector('.thumbnailItem').at(0);
    const { height } = thumbnailItem.props().style;
    expect(height).to.eq(300);
    driver.detach.proGallery();
  });
  it('should "thumbnailSize" of "150"', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.THUMBNAIL,
      thumbnailSize: 150,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const thumbnailItem = driver.find.selector('.thumbnailItem').at(0);
    const { height } = thumbnailItem.props().style;
    expect(height).to.eq(150);
    driver.detach.proGallery();
  });
  it('should set the gallery height for thumbnailSize=300', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.THUMBNAIL,
      thumbnailSize: 300,
      thumbnailSpacings: 10,
      galleryThumbnailsAlignment: 'bottom',
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const galleryContainer = driver.find.selector('#pro-gallery-container');
    const { height } = galleryContainer.props().style;
    // expect to galleryContainer height without the thumbnails to be dimensions.height - thumbnails and margins
    expect(initialProps.dimensions.height - 300 - 3 * 10).to.eq(height);
    driver.detach.proGallery();
  });

  it('should set the gallery width for thumbnailSize=300', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.THUMBNAIL,
      thumbnailSize: 300,
      thumbnailSpacings: 10,
      galleryThumbnailsAlignment: 'left',
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const galleryContainer = driver.find.selector('#pro-gallery-container');
    const { width } = galleryContainer.props().style;
    // expect to galleryContainer width without the thumbnails to be dimensions.width - thumbnails and margins
    expect(initialProps.dimensions.width - 300 - 3 * 10).to.eq(width);
    driver.detach.proGallery();
  });
});
