define(function (require) {
  var React = require('react');
  var Utils =require('./utils');
  var createReactClass = require('create-react-class');
  
  var TodoFooter = createReactClass({
    displayName: 'TodoFooter',

    render: function render() {
      var activeTodoWord = Utils.pluralize(this.props.count, 'item');
      var clearButton = null;

      if (this.props.completedCount > 0) {
        clearButton = React.createElement(
          'button',
          {
            className: 'clear-completed',
            onClick: this.props.onClearCompleted },
          'Clear completed'
        );
      }

      var nowShowing = this.props.nowShowing;
      return React.createElement(
        'footer',
        { className: 'footer' },
        React.createElement(
          'span',
          { className: 'todo-count' },
          React.createElement(
            'strong',
            null,
            this.props.count
          ),
          ' ',
          activeTodoWord,
          ' left'
        ),
        React.createElement(
          'ul',
          { className: 'filters' },
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              {
                href: '#/',
                className: Utils.classNames({ selected: nowShowing === Utils.ALL_TODOS }) },
              'All'
            )
          ),
          ' ',
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              {
                href: '#/active',
                className: Utils.classNames({ selected: nowShowing === Utils.ACTIVE_TODOS }) },
              'Active'
            )
          ),
          ' ',
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              {
                href: '#/completed',
                className: Utils.classNames({ selected: nowShowing === Utils.COMPLETED_TODOS }) },
              'Completed'
            )
          )
        ),
        clearButton
      );
    }
  });

  return TodoFooter;
});
