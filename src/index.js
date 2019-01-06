import _ from 'lodash';
import './style.css';
import img from './assets/img/sl.jpg';
// import data from './data.json';
// import data2 from '@/data';
import printMe from './print';
import te from './view/temple.html';
import {cube} from './math.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

//     // Lodash, now imported by this script
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    
//     var imgIcon = new Image();
//     imgIcon.src=img;
//     element.appendChild(imgIcon);

//     console.log(data);
//     console.log(data.data2);
//     console.log(data2.data2,"ffff");
    document.body.appendChild(element)
    var hello = document.getElementsByClassName('hello');
    hello[0].innerHTML = te;
    var sl = document.getElementsByClassName('sl');
    sl[0].onclick = printMe;

    //代码分离之动态导入
    // function test(){
    //     return import(/*webpackChunkName: "lodash"*/ 'lodash').then(_=>{
    //         return _.join(['Hello', 'webpack'], ' ')
    //     })
    // }
    // test().then(a=>{
    //     var right = document.getElementsByClassName('right');
    //     right[0].innerHTML = a;
    // })
}

component();


if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
    var hello = document.getElementsByClassName('hello');
    console.log(hello);
    document.body.removeChild(hello[0]);
    // component(); // 重新渲染页面后，component 更新 click 事件处理
  });
  // module.hot.accept('./print.js', function() {
  //   document.body.removeChild(element);
  //   element = component(); // 重新渲染页面后，component 更新 click 事件处理
  //   document.body.appendChild(element);
  // })
}
