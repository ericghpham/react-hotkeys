import { configure } from '@storybook/react';

function loadStories() {
  require('../src/hotkeys.stories.js');
}

configure(loadStories, module);