

import React, {Component} from 'react';
import {render} from 'react-dom';
import About from '../../../../react-resource/blocks/about/src';
import BlockLayout from '../../layouts/blockLayout';

render(
  <BlockLayout>
    <About />
  </BlockLayout>,
  document.querySelector('#root')
);
if (module.hot) {
    module.hot.accept();
}


