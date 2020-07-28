import {SECTIONS, stylesList, sectionByStyle} from './sections';
import { gallerySettings } from 'pro-gallery';

const settingsManager = stylesList.reduce((obj, styleParam) => {
  const settingsData = gallerySettings[styleParam];

  return {
    ...obj,
    [styleParam]: {
      ...settingsData,
      section: sectionByStyle[styleParam]
    }
  }
}, {});

export {
  SECTIONS,
  settingsManager
}
