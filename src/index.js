import _ from 'lodash';
import './style.css';
import img from './assets/img/sl.jpg';
// import data from './data.json';
// import data2 from '@/data';
import printMe from './print';
import temple from './view/temple.html';
import test from './view/test.html';
import {cube} from './math.js';

console.log(process.env.NODE_ENV,"process.env.NODE_ENV");
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  $("#app").html(temple);
  $(".sl").click(printMe);
  console.log(Handlebars,"uuuuuuuuuuuuuuuuuuuuu");
  // console.log(handlebars);
  var template = Handlebars.compile(test);
  var data = { "name": "Alan", "hometown": "Somewhere, TX",
  "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
  var result = template(data);
  $('.right').append(result);
  // $(".sl").click(function(){
  //   console.log("nnnnnnnnnnnn")
  // });
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
    $("#app").children('.app').remove();
    // component(); // 重新渲染页面后，component 更新 click 事件处理
  });
  // module.hot.accept('./print.js', function() {
  //   document.body.removeChild(element);
  //   element = component(); // 重新渲染页面后，component 更新 click 事件处理
  //   document.body.appendChild(element);
  // })
}
