import _ from 'lodash';

function getBtn(){
	var element = document.createElement('buttom');
	element.innerHTML = _.join(['click','click2']);
	return element
}

document.body.appendChild(getBtn());