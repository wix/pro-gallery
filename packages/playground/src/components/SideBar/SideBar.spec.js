// import { GALLERY_CONSTS } from 'pro-gallery-lib';
import { expect } from 'chai';
import { galleryOptions } from 'pro-gallery-lib';
import { stylesList } from '../../constants/settings.js';

describe('styleParams - general', () => {

  it.only('should contain all style params in the sections list', () => {
    stylesList.forEach( styleParam => {
      expect(galleryOptions).to.contain(styleParam);
    })
  });
})
