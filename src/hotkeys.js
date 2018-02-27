import React from 'react';
import PropTypes from 'prop-types';
import manager, { Manager } from './manager';

const arrayify = x => Array.isArray(x) ? x : [x];

class Hotkeys extends React.Component {
  constructor(props) {
    super(props);
    this.handleHotkey = this.handleHotkey.bind(this);
    this.keys = arrayify(props.keys);
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
    manager.bindKeys(this.keys, this.handleHotkey);
  }

  componentWillUnmount() {
    manager.unbindKeys(this.keys, this.handleHotkey);
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