import _ from 'lodash';

console.log("0000000000s");
console.log(
    _.join(['another', 'modules', 'loadedaaa'], ' ')
);

function component() {
    console.log("fffmmmsskkk");
    $("#app").html("<div class='app'>dddn顶dddd顶顶顶</div>");
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