'use strict';

var React = require('react'),
    withSideEffect = require('react-side-effect');

//传入每一个被挂载的组件的props属性，然后让开发者自己控制应该返回的state属性
function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
}

//重新计算得到的state会被传入到这个函数
function handleStateChangeOnClient(title) {
  var nextTitle = title || '';
  if (nextTitle !== document.title) {
    document.title = nextTitle;
  }
}

//接受一个DocumentTitle组件，返回一个SideEffect实例
var DocumentTitle = React.createClass({
  displayName: 'DocumentTitle',
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  //每次实例化一个DocumentTitle都会调用该render方法
  render: function render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

//调用方式如下：
/*
 <DocumentTitle title='Home'>
    <h1>Home, sweet home.</h1>
  </DocumentTitle>
*/ 
module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);
