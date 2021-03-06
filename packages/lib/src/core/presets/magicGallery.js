import LAYOUTS from '../../common/constants/layout';
import SCROLL_DIRECTION from '../../common/constants/scrollDirection';
import { featureManager } from '../helpers/versionsHelper';

export const fixedStyles = {
  galleryLayout: LAYOUTS.MAGIC,
  cubeImages: undefined,
  cubeRatio: undefined,
  isVertical: undefined,
  targetItemSize: undefined,
  collageAmount: undefined,
  collageDensity: undefined,
  groupTypes: undefined,
  oneRow: undefined, // later on in layoutHelper this can be changed if it is false, so not exactly fixed.
  imageMargin: undefined,
  scatter: undefined,
  galleryMargin: undefined,
  chooseBestGroup: undefined,
  smartCrop: undefined,
  cubeType: undefined,
  hasThumbnails: undefined,
  enableScroll: undefined,
  isGrid: undefined,
  isSlideshow: undefined,
  isSlider: undefined,
  isColumns: undefined,
  cropOnlyFill: undefined,
  fixedColumns: undefined,
  enableInfiniteScroll: undefined,
  slideshowLoop: false,
};

const getStyleBySeed = (seed) => {
  if (!seed > 0) {
    seed = 999999;
  }
  seed = Math.floor(seed);

  const strToSeed = (str) => {
    str = String(str);
    let total = 0;
    for (let s = 0; s < str.length; s++) {
      total += str.charCodeAt(s);
    }
    return total;
  };

  const mergeSeeds = (s1, s2) => {
    return Math.floor((s1 / s2 - Math.floor(s1 / s2)) * 10000000);
  };

  const numFromSeed = (min, max, strSeed) => {
    const seed2 = strToSeed(strSeed);
    const range = max - min + 1;
    return (mergeSeeds(seed, seed2) % range) + min;
  };

  const boolFromSeed = (strSeed) => {
    return !!numFromSeed(0, 1, strSeed);
  };

  const style = {
    cubeImages: boolFromSeed('cubeImages'),
    cubeRatio: numFromSeed(1, 25, 'cubeRatio') / 5,
    isVertical: boolFromSeed('isVertical'),
    targetItemSize: numFromSeed(300, 800, 'gallerySize'),
    collageAmount: numFromSeed(5, 10, 'collageAmount') / 10,
    collageDensity:
      (featureManager.supports.spacingCalculation
        ? numFromSeed(1, 100, 'collageDensity')
        : numFromSeed(5, 10, 'collageDensity')) / 100,
    groupTypes: ['1'].concat(
      '2h,2v,3t,3b,3l,3r,3h,3v'
        .split(',')
        .filter((type, i) => boolFromSeed('groupTypes' + i))
    ),
    oneRow: boolFromSeed('oneRow'), //we keep oneRow here as this is the string that defines the outcome of the seed.
    imageMargin: numFromSeed(
      0,
      featureManager.supports.spacingCalculation
        ? numFromSeed(300, 800, 'gallerySize') / 5
        : 5,
      'imageMargin'
    ),
    galleryMargin: featureManager.supports.spacingCalculation
      ? 0
      : numFromSeed(0, 5, 'imageMargin'),
    scatter: 0,
    rotatingScatter: '',
    chooseBestGroup: boolFromSeed('chooseBestGroup'),
    smartCrop: boolFromSeed('smartCrop'),
    cubeType: 'fill',
    enableScroll: true,
    isGrid: false,
    isSlideshow: false,
    isSlider: false,
    isColumns: false,
    cropOnlyFill: false,
    fixedColumns: 0,
    enableInfiniteScroll: 1,
  };

  //force adjustments
  if (style.oneRow) {
    style.isVertical = false;
    style.scrollDirection = SCROLL_DIRECTION.HORIZONTAL;
  } else {
    style.scrollDirection = SCROLL_DIRECTION.VERTICAL;
  }
  style.galleryType = style.isVertical ? 'Columns' : 'Strips';
  style.groupSize = parseInt(style.groupTypes.slice(-1)[0]);
  style.groupTypes = style.groupTypes.join(',');
  style.minItemSize = style.targetItemSize / style.groupSize / 2;

  return style;
};

export const createStyles = (styles) => {
  return {
    ...styles,
    ...fixedStyles,
    ...getStyleBySeed(styles.magicLayoutSeed),
  };
};
