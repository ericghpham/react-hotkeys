import React from 'react';
import { mount } from 'enzyme';
import Hotkeys, { manager } from './hotkeys';

describe('<Hotkeys />', () => {
  it('binds a single hotkey', () => {
    const component = mount(<Hotkeys keys="k" callback={jest.fn()} />);
    manager.trigger('k');
    expect(component.prop('callback')).toHaveBeenCalledTimes(1);
  });

  it('binds multiple hotkeys', () => {
    const keys = ['x', 'y', 'z'];
    const callback = jest.fn();
    const component = mount(<Hotkeys keys={keys} callback={callback} />);
    
    for (const key of keys) {
      manager.trigger(key);
    }
    expect(callback).toHaveBeenCalledTimes(keys.length);
  });

  it('ignores disabled hotkeys', () => {
    const component = mount(<Hotkeys keys="k" callback={jest.fn()} disabled />);
    manager.trigger('k');
    expect(component.prop('callback')).not.toHaveBeenCalled();
  });

  describe('with collisions', () => {
    it('binds the most recently declared hotkey', () => {
      const key = 'k';
      const first = jest.fn();
      const last = jest.fn();
      mount(
        <div>
          <Hotkeys keys={key} callback={first} />
          <Hotkeys keys={key} callback={last} />
        </div>
      );
      manager.trigger(key);
      expect(first).not.toHaveBeenCalled();
      expect(last).toHaveBeenCalledTimes(1);
    });
  });
});