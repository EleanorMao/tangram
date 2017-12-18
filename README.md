# asumi-js-generator

> A asumi project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## shape
```
{
  key: 'root', // 唯一标志
  type: 'div', // 组件类型
  props: {
    style: {width: 800} // 属性
  },
  children: [], // 叶子元素
  controls: [], // 控制
  events: { // 事件
    onClick: [{ // 事件名
      functionName:  'handleClick', // 方法名(唯一)
      actions: [{ // 动作
        actionType: 'message', // 动作类型
        actionComp: '', // 联动组件Key
        actionConfig: { // 动作属性
          type: 'success',
          content: '提交成功！'
        }
      }]
  }
}
```
