import { INPUT_TYPES } from '../utils/constants';

export default {
  title: 'Number Of Columns',
  description: `Set a fixed number of columns in the gallery. Note that this option relies on the options isVertical (set to "true")
  and oneRow (set to "false").`,
  isRelevantDescription:
    'Set a Horizontal scrolled gallery, set "Layout Orientation" to "columns", set "Responsive Type" to "Set Items Per Row".',
  isRelevant: (styleParams) =>
    !styleParams.oneRow &&
    styleParams.isVertical &&
    styleParams.gridStyle === 1,
  type: INPUT_TYPES.NUMBER,
  default: 0,
};
