define(function (require) {
  var ESCAPE_KEY = 27;
  var ENTER_KEY = 13;
  var createReactClass = require('create-react-class');
  var React = require('react');
  var Utils = require('./utils');
  var ReactDOM = require('react-dom');

  var TodoItem = createReactClass({
    displayName: 'TodoItem',

    handleSubmit: function handleSubmit(event) {
      var val = this.state.editText.trim();
      if (val) {
        this.props.onSave(val);
        this.setState({ editText: val });
      } else {
        this.props.onDestroy();
      }
    },

    handleEdit: function handleEdit() {
      this.props.onEdit();
      this.setState({ editText: this.props.todo.title });
    },

    handleKeyDown: function handleKeyDown(event) {
      if (event.which === ESCAPE_KEY) {
        this.setState({ editText: this.props.todo.title });
        this.props.onCancel(event);
      } else if (event.which === ENTER_KEY) {
        this.handleSubmit(event);
      }
    },

    handleChange: function handleChange(event) {
      if (this.props.editing) {
        this.setState({ editText: event.target.value });
      }
    },

    getInitialState: function getInitialState() {
      return { editText: this.props.todo.title };
    },

    /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.todo !== this.props.todo || nextProps.editing !== this.props.editing || nextState.editText !== this.state.editText;
    },

    /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
    componentDidUpdate: function componentDidUpdate(prevProps) {
      if (!prevProps.editing && this.props.editing) {
        var node = React.findDOMNode(this.refs.editField);
        node.focus();
        node.setSelectionRange(node.value.length, node.value.length);
      }
    },

    render: function render() {
      return React.createElement(
        'li',
        { className: Utils.classNames({
            completed: this.props.todo.completed,
            editing: this.props.editing
          }) },
        React.createElement(
          'div',
          { className: 'view' },
          React.createElement('input', {
            className: 'toggle',
            type: 'checkbox',
            checked: this.props.todo.completed,
            onChange: this.props.onToggle
          }),
          React.createElement(
            'label',
            { onDoubleClick: this.handleEdit },
            this.props.todo.title
          ),
          React.createElement('button', { className: 'destroy', onClick: this.props.onDestroy })
        ),
        React.createElement('input', {
          ref: 'editField',
          className: 'edit',
          value: this.state.editText,
          onBlur: this.handleSubmit,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown
        })
      );
    }
  });

  return TodoItem;
});
