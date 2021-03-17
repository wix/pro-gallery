import GalleryDriver from '../drivers/reactDriver';
import { GALLERY_CONSTS } from 'pro-gallery-lib';
import { images2 } from '../drivers/mocks/items';
import { styleParams, container } from '../drivers/mocks/styles';

describe('styleParam - slideAnimation', () => {
  const initialProps = {
    container,
    items: images2,
    styles: styleParams,
  };
  const notCurrentFadeAnimationStylesMock = {
    transition: 'opacity .4s ease',
    opacity: 0,
    display: 'block',
    transitionDelay: '',
  };
  const currentFadeAnimationStylesMock = {
    transition: 'opacity .4s ease',
    opacity: 1,
    display: 'block',
    transitionDelay: '.4s',
  };

  describe('Slideshow', () => {
    let driver;
    beforeEach(() => {
      driver = new GalleryDriver();
    });

    afterEach(() => {
      driver.detach.proGallery();
    });
    it('should set the correct "Fade" animation styles to the items', async () => {
      Object.assign(initialProps.styles, {
        galleryLayout: GALLERY_CONSTS.layout.SLIDESHOW,
        slideAnimation: GALLERY_CONSTS.slideAnimations.FADE,
      });
      driver.mount.proGallery(initialProps);
      await driver.update();
      const currentItem = driver.find.selector('.gallery-item-wrapper a').at(0);
      const nextItem = driver.find.selector('.gallery-item-wrapper a').at(1);
      expect(currentItem.props().style).toEqual(currentFadeAnimationStylesMock);
      expect(nextItem.props().style).toEqual(notCurrentFadeAnimationStylesMock);
      const button = driver.find.hook('nav-arrow-next');
      button.simulate('click');
      await driver.update(400);
      const prevItem = driver.find.selector('.gallery-item-wrapper a').at(0);
      expect(prevItem.props().style).toEqual(notCurrentFadeAnimationStylesMock);
    });
    it('should not have Fade animation styles when "slideAnimations" is "Scroll"', async () => {
      Object.assign(initialProps.styles, {
        galleryLayout: GALLERY_CONSTS.layout.SLIDESHOW,
        slideAnimation: GALLERY_CONSTS.slideAnimations.SCROLL,
      });
      driver.mount.proGallery(initialProps);
      await driver.update();
      const item = driver.find.selector('.gallery-item-wrapper a').at(0);
      expect(item.props().style).toEqual({});
    });
  });

  describe('Thumbnails', () => {
    let driver;
    beforeEach(() => {
      driver = new GalleryDriver();
    });

    afterEach(() => {
      driver.detach.proGallery();
    });
    it('should set the correct "Fade" animation styles to the items', async () => {
      Object.assign(initialProps.styles, {
        galleryLayout: GALLERY_CONSTS.layout.THUMBNAIL,
        slideAnimation: GALLERY_CONSTS.slideAnimations.FADE,
      });
      driver.mount.proGallery(initialProps);
      await driver.update();
      const currentItem = driver.find.hook('item-wrapper').at(0);
      const nextItem = driver.find.hook('item-wrapper').at(1);
      expect(currentItem.props().style).toMatchObject(
        currentFadeAnimationStylesMock
      );
      expect(nextItem.props().style).toMatchObject(
        notCurrentFadeAnimationStylesMock
      );
      const button = driver.find.hook('nav-arrow-next');
      button.simulate('click');
      await driver.update(400);
      const prevItem = driver.find.hook('item-wrapper').at(0);
      expect(prevItem.props().style).toMatchObject(
        notCurrentFadeAnimationStylesMock
      );
    });
    it('should not have Fade animation styles when "slideAnimations" is "Scroll"', async () => {
      Object.assign(initialProps.styles, {
        galleryLayout: GALLERY_CONSTS.layout.THUMBNAIL,
        slideAnimation: GALLERY_CONSTS.slideAnimations.SCROLL,
      });
      driver.mount.proGallery(initialProps);
      await driver.update();
      const item = driver.find.hook('item-wrapper').at(0);
      expect(item.props().style).not.toMatchObject(
        currentFadeAnimationStylesMock
      );
    });
  });
});
