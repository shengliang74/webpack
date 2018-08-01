import _ from 'lodash';
import printMe from './print.js';
import header from './js/layout/header.js';
import $ from 'jquery';
import './css/normalize.css';

function getComponent() {
	// return import(/* webpackChunkName: "lodash" */ 'lodash').then( _ => {
		
	// }).catch(error => 'An error occurred while loading the component')
	var element = document.createElement('div');
		element.innerHTML = _.join(['Hello','webpack',' ']);
		return element;
}

$("#context").append('Some textc');

printMe();
document.body.appendChild(getComponent());