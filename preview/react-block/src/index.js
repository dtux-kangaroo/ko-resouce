import React from 'react';
import ReactDOM from 'react-dom'
import Routers from './router'
import "assets/styles/base.scss";
import '@babel/polyfill'

const render = Component =>
    ReactDOM.render(
      <Component />,
       document.getElementById('root')
    )
render(Routers)

if(module.hot) {
  module.hot.accept();
}
