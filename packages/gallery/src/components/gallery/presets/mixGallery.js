
import React from 'react';
import ProGallery from '../proGallery/proGallery';
import LAYOUTS from '../../../common/constants/layout';

export const fixedStyles = {
  galleryLayout: LAYOUTS.MIX,
  
  //this params were moved from the presets in layoutHelper and were not tested and checked yet.
  sampleSize: 100,
  isVertical: true,
  gallerySize: 86,
  minItemSize: 50,
  groupSize: 3,
  chooseBestGroup: true,
  groupTypes: '1,2h,2v,3t,3b,3l,3r,3v,3h',
  rotatingGroupTypes: '1,2h,1,2h',
  cubeImages: true,
  cubeType: 'fill',
  smartCrop: false,
  collageDensity: 0.48,
  galleryMargin: 0,
  floatingImages: 0,
  cubeRatio: 1,
  fixedColumns: 1,
  groupsPerStrip: 0,
  oneRow: false,
  placeGroupsLtr: false,
  at: 1538490323024,
  rotatingCropRatios: '',
}
export default class MixGallery extends React.Component {

  render() {
    return (
      <ProGallery
        {...this.props}
        styles={{
          ...this.props.styles,
          ...fixedStyles
        }}
      />
    );
  }
}
