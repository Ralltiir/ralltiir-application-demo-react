var amdPrefix = location.protocol + '//' + location.host + '/ralltiir-application-demo-react';

require.config({
  baseUrl: /rt-debug/.test(location.search) ? 'amd_modules' : '//unpkg.cnpmjs.org',
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
  waitSeconds: 30
})

// apmjs auto-creates these entries when installed locally
define('ralltiir', function (require) {
    return require('ralltiir/src/index')
})
define('ralltiir-application', function (require) {
    return require('ralltiir-application/service')
})

require(['ralltiir', 'ralltiir-application', 'ralltiir-application/view/view'], function (rt, Service, View) {
    View.backHTML = '<i class="fa fa-arrow-left"></i>'
    rt.services.register('/home', {title: 'Ralltiir Application'}, Service)
    rt.services.register('/todolist', {title: 'React Todo List'}, Service)

    rt.action.start({
      root: '/ralltiir-application-demo-react'
    })
})
