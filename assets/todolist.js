var amdPrefix = location.protocol + '//' + location.host + '/ralltiir-application-demo-react';

require.config({
  paths: {
    'app': amdPrefix + '/assets/app',
    'todoItem': amdPrefix + '/assets/todoItem',
    'todoList': amdPrefix + '/assets/todoList',
    'todoModel': amdPrefix + '/assets/todoModel',
    'utils': amdPrefix + '/assets/utils',
    'footer': amdPrefix + '/assets/footer',
    'react': 'https://unpkg.cnpmjs.org/react@16/umd/react.production.min',
    'react-dom': 'https://unpkg.cnpmjs.org/react-dom@16/umd/react-dom.production.min',
    'create-react-class': 'https://unpkg.cnpmjs.org/create-react-class/create-react-class.min'
  },
});

var $view = $(document.currentScript).closest('.rt-view');

require(['app'], function (app) {
  var el = $view.find('.todoapp').get(0);
  app.start(el);
});
