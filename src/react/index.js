import $ from 'jquery'

const React ={
  render,
  nextRootId:0
}

function render(element,container){
  // 为每个元素添加一个属性 方便获取这个元素
  const markUp = `<span data-reactId=${React.nextRootId}>${element}<span>`;
   $(container).html(markUp);
}


export default React;