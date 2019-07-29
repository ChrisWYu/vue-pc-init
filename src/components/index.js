const files = require.context('.', true, /\.vue/);
const excludeComponents = [];
const Components = {
  install: function(Vue) {
    files.keys().forEach(key => {
      if (key !== "./index.js") {
        const keysList = key.split("/");
        const resultKey = keysList[keysList.length - 1].replace(/(\.\/|\.vue)/g, '');
        if (excludeComponents.indexOf(resultKey) === -1) {
          Vue.component(resultKey, files(key).default);
        }
        return true;
      }
    });
  }
};
// 导出组件
export default Components;
