import _ from 'lodash';
import './style.css';
// import img from './sl.jpg';

function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    
    // var imgIcon = new Image();
    // imgIcon.src=img;
    // element.appendChild(imgIcon);

    return element;
}

document.body.appendChild(component());