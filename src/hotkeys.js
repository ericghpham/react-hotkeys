import React from 'react';
import PropTypes from 'prop-types';
import manager, { Manager } from './manager';

class Hotkeys extends React.Component {
  constructor(props) {
    super(props);
    this.handleHotkey = this.handleHotkey.bind(this);
  }

  handleHotkey(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { callback, disabled } = this.props;
    if ((disabled instanceof Function && !disabled()) || !disabled) {
      callback(e);
    }
  }

  componentWillMount() {
    manager.bindKeys(this.props.keys, this.handleHotkey);
  }

  componentWillReceiveProps() {
    if (this.props.keys !== nextProps.keys) {
      manager.unbindKeys(this.props.keys, this.handleHotkey);
      manager.bindKeys(nextProps.keys, this.handleHotkey);
    }
  }

  componentWillUnmount() {
    manager.unbindKeys(this.props.keys, this.handleHotkey);
  }

  render() {
    return null;
  }
}

Hotkeys.propTypes = {
  keys: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  callback: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
}

export default Hotkeys;
export { manager, Manager }