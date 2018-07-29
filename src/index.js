import _ from 'lodash';
import printMe from './print.js';

function getComponent() {
	// return import(/* webpackChunkName: "lodash" */ 'lodash').then( _ => {
		
	// }).catch(error => 'An error occurred while loading the component')
	var element = document.createElement('div');
		element.innerHTML = _.join(['Hello','webpack',' ']);
		return element;
}

function getBtn(){
	var element = document.createElement('buttom');
	element.innerHTML = _.join(['click','click2']);
	return element
}
printMe();

// getComponent().then(component => {
// 	document.body.appendChild(component);
// })
document.body.appendChild(getComponent());
document.body.appendChild(getBtn());