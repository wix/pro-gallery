import React from 'react';
import { GalleryComponent } from '../galleryComponent';

export default class TextItem extends GalleryComponent {
  getTextDimensions() {
    const { style, styleParams, cubeRatio } = this.props;
    const isVerticalItem = style.ratio < cubeRatio - 0.01;
    //text dimensions include scaling
    const textHeight =
      (isVerticalItem
        ? style.height / style.maxHeight
        : style.width / style.maxWidth) * style.maxHeight;
    const marginTop =
      styleParams.cubeType === 'fit' ? 0 : (style.height - textHeight) / 2;
    const transform =
      'translate(0, 0) scale(' +
      (isVerticalItem
        ? style.height / style.maxHeight
        : style.width / style.maxWidth) +
      ')';
    return {
      marginTop,
      width: style.maxWidth + 'px',
      height: style.maxHeight + 'px',
      transformOrigin: '0 0',
      WebkitTransform: transform,
      MsTransform: transform,
      OTransform: transform,
      transform,
    };
  }

  componentWillMount() {
    this.props.actions.setItemLoaded();
  }

  processInnerhtml(html) {
    // Remove html class name from inner html elements
    // In older version of the text editor we used font themes (set as classes). Without the iframe it clashes with Santa's css
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a dolor nec augue vehicula sodales. Proin scelerisque non nibh eget porta. Proin vestibulum sit amet felis non mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sed dui ut tortor elementum ultrices non ac quam. Nam tincidunt elementum libero. Quisque dignissim vel ante non commodo. Integer vehicula nibh urna. Maecenas vitae egestas neque. Quisque massa massa, pellentesque sed dui et, rutrum condimentum ante. Curabitur neque arcu, vulputate nec nunc et, lobortis imperdiet nunc. Ut fermentum vulputate elit id pulvinar. Aliquam et sapien nec justo suscipit pretium. Nunc ac arcu lacinia, facilisis risus condimentum, porta ante. Nunc et posuere magna. Nunc molestie vulputate felis, id lobortis dolor vulputate eget. Duis egestas turpis tempus arcu sodales pellentesque. Mauris molestie, velit at mattis consequat, velit lorem rutrum justo, at mattis magna ipsum ac felis. Fusce varius justo nisi, vel pulvinar neque tempor vitae. Nam a odio malesuada, condimentum orci ut, rhoncus justo. Nulla justo nibh, auctor sed rhoncus et, molestie a dui. Praesent dignissim elit at velit hendrerit efficitur. Nullam dapibus consequat turpis, vitae ornare mi euismod eu. Praesent venenatis et massa eget dapibus. Vestibulum non tellus non magna consequat bibendum ac ac augue. Sed condimentum nulla sem, vel cursus lorem hendrerit vitae. Nullam non rhoncus magna, quis ultricies urna. In tempus metus commodo nulla rhoncus tincidunt. Proin gravida in turpis at lacinia. Pellentesque ornare luctus imperdiet. Vestibulum ut nisl nec quam fermentum bibendum a vitae magna. Morbi non sem consectetur neque efficitur viverra vitae a ex. Aliquam ut quam eu risus pellentesque sagittis nec ultrices est. Duis egestas dui ac interdum fringilla. Suspendisse consequat quis mi vel vulputate. Proin et lacus hendrerit, ultricies nunc sed, aliquet ante. Aenean diam dui, mattis aliquam fermentum non, feugiat eu tellus. Phasellus nec ex sed odio dignissim fermentum. Fusce auctor egestas diam non finibus. Pellentesque purus risus, dictum eget ullamcorper id, ultricies vitae elit. Aenean mollis justo sed velit laoreet, ac elementum neque bibendum. Pellentesque lectus velit, egestas id semper nec, lacinia quis odio. Etiam sagittis lobortis blandit. Aenean lectus lacus, mollis sagittis volutpat eget, semper eu felis. Vestibulum nec nisi laoreet orci ornare congue ac nec metus. Duis auctor in leo in venenatis. Pellentesque dictum purus magna, tincidunt sagittis dui condimentum quis. Suspendisse ut vestibulum purus. Nam nec massa ligula. Morbi imperdiet nibh vel massa dapibus maximus. Curabitur semper luctus ullamcorper. Curabitur porta erat est. Ut vel ultricies sem. Vivamus nec neque sed ligula scelerisque maximus.`;
    const surface = this.props.imageDimensions.width * (this.props.imageDimensions.height - 80);
    const numberOfChars = surface / 205;
    const text = `<div>${lorem.slice(0, numberOfChars) + ' [[[END]]]'}</div>`;

    const title = '<div style="font-size: 24px; line-height: 36px" >This is the title</div>';

    const user = `<div><img style="width: 30px; height: 30px;"/> John Dow</div>`;
    return user + title + text;

    return  (`
      width: ${this.props.imageDimensions.width} <br/>
      height: ${this.props.imageDimensions.height}<br/>
      surface: ${this.props.imageDimensions.width * this.props.imageDimensions.height}
    `);
    try {
      return html.replace(/class="font_\d+"/gm, '');
    } catch (e) {
      return html;
    }
  }

  render() {
    const {
      id,
      styleParams,
      html,
      style,
      actions,
      imageDimensions,
    } = this.props;
    const processedHtml = this.processInnerhtml(html);
    const dimensions = this.getTextDimensions();
    const htmlParam = { dangerouslySetInnerHTML: { __html: processedHtml } };
    const changeBgColor = {
      style: Object.assign(
        {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          padding: 10
        },
        styleParams.cubeType === 'fit'
          ? { backgroundColor: style.bgColor }
          : {},
      ),
    };
    const attributes = {
      ...htmlParam,
      ...changeBgColor,
    };
    const itemContentStyle = {
      height: imageDimensions ? imageDimensions.height : 'inherit',
      backgroundColor:
        styleParams.cubeType !== 'fit' ? style.bgColor : 'inherit',
    };

    if (imageDimensions && imageDimensions.borderRadius) {
      itemContentStyle.borderRadius = imageDimensions.borderRadius;
    }

    return (
      <div className={'gallery-item-content'} style={itemContentStyle}>
        <div
          className={
            'gallery-item-visible gallery-item gallery-item-loaded text-item'
          }
          key={'item-text-' + id}
          onTouchStart={actions.handleItemMouseDown}
          onTouchEnd={actions.handleItemMouseUp}
          data-hook="text-item"
          {...attributes}
        />
      </div>
    );
  }
}
