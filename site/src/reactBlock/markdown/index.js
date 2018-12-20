

import React, {Component} from 'react';
import {render} from 'react-dom';
import Markdown from '../../../../react-resource/blocks/markdown/src';
import BlockLayout from '../../layouts/blockLayout';

render(
  <BlockLayout>
    <Markdown />
  </BlockLayout>,
  document.querySelector('#root')
);

if (module.hot) {
    module.hot.accept();
}


