
import React from 'react';
import ProGallery from '../proGallery/proGallery';
import LAYOUTS from '../../../common/constants/layout';
import PLACEMENTS from '../../../common/constants/placements';
import {propsToStyles, layoutPropTypes, LAYOUT_PROPS} from './propTypes';

export const layoutStyles = {
  galleryLayout: LAYOUTS.COLLAGE,
  cubeImages: false,
  titlePlacement: PLACEMENTS.SHOW_ON_HOVER,
  
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  showArrows: false,
  groupSize: 3,
  groupTypes: '1,2h,2v,3t,3b,3l,3r',
  fixedColumns: 0,
  hasThumbnails: false,
  enableScroll: true,
  isGrid: false,
  isSlider: false,
  isMasonry: false,
  isColumns: false,
  isSlideshow: false,
  cropOnlyFill: false,
}

export const layoutProps = [
  LAYOUT_PROPS.ORIENTATION,
  LAYOUT_PROPS.RTL,
  LAYOUT_PROPS.SPACING,
  LAYOUT_PROPS.SCROLL_DIRECTION,
  LAYOUT_PROPS.ITEM_SIZE,
  LAYOUT_PROPS.INFO,
  LAYOUT_PROPS.PLAY,
  LAYOUT_PROPS.OVERLAY_ANIMATION,
  LAYOUT_PROPS.IMAGE_OVER_ANIMATION,
  LAYOUT_PROPS.SCROLL_ANIMATION,
  LAYOUT_PROPS.HOVERING_BEHAVIOUR,
]

export const createStyles = styles => {
  return {
    ...styles,
    ...layoutStyles,
    gallerySize: styles.modifiedGallerySize ? styles.gallerySize : Math.round(styles.gallerySize * 5 + 500),
    modifiedGallerySize: true
  }
}

export default class CollageGallery extends React.Component {

  static propTypes = layoutPropTypes(layoutProps)

  render() {
    return (
      <ProGallery
        {...this.props}
        styles={
          createStyles(propsToStyles(this.props))
        }
      />
    );
  }
}
