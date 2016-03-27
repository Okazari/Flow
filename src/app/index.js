/**
 * App entry point
 */

// Polyfills
import "babel-polyfill";

import es6Promise from 'es6-promise';
import 'whatwg-fetch';
es6Promise.polyfill();

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Component
import Flow from './components/Flow';

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router
document.addEventListener('DOMContentLoaded',() => {
    ReactDOM.render((
    <Flow>
    </Flow>
  ), document.getElementById(DOM_APP_EL_ID));
});