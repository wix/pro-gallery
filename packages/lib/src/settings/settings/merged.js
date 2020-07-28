import { defaultStyles } from 'pro-gallery-lib';
import newGallerySettings from './index';

const stylesSet = new Set([...Object.keys(newGallerySettings), ...Object.keys(isRelevant), ...Object.keys(content)]);
const styleList = [];
stylesSet.forEach(style => styleList.push(style))
const mergedSettings = styleList.reduce((obj, styleParam) => {
    const settingsData = newGallerySettings[styleParam];

    return {
      ...obj,
      [styleParam]: settingsData,
    }
  }, {});

  export default mergedSettings;
