import React from 'react';
import { storiesOf } from '@storybook/react';
import Hotkeys from './hotkeys';

storiesOf('Hotkeys', module)
  .add('with collision', () => (
  	<div>
	    <Hotkeys keys="up up down down" callback={() => alert('hi')} />
	    <Hotkeys keys="up up down down" callback={() => alert('hi2')} />
    </div>
  ))