import React from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import { act, create } from 'react-test-renderer';

import TodayBoard from '@/app/(tabs)/index';

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

const renderScreen = async () => {
  let renderer;

  await act(async () => {
    renderer = create(<TodayBoard />);
    await flushPromises();
  });

  return renderer;
};

const getTextValues = (renderer) =>
  renderer.root
    .findAllByType(Text)
    .flatMap((node) => node.props.children)
    .filter((child) => typeof child === 'string');

const expectText = (renderer, text) => {
  expect(getTextValues(renderer)).toContain(text);
};

const expectNoText = (renderer, text) => {
  expect(getTextValues(renderer)).not.toContain(text);
};

const findPressableByText = (renderer, text) =>
  renderer.root.findAllByType(Pressable).find((pressable) =>
    pressable.findAllByType(Text).some((node) => node.props.children === text)
  );

describe('TodayBoard index screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the default Push workout when no workout is saved', async () => {
    const renderer = await renderScreen();

    expectText(renderer, 'Push');
    expectText(renderer, 'Chest');
    expectText(renderer, 'Bench Press');
    expectText(renderer, 'Skip to Next Workout');
    expectText(renderer, 'Stats');
  });

  it('skips from Push to Pull and saves the next workout', async () => {
    const renderer = await renderScreen();
    const skipButton = findPressableByText(renderer, 'Skip to Next Workout');

    await act(async () => {
      await skipButton.props.onPress();
      await flushPromises();
    });

    expectText(renderer, 'Pull');
    expectText(renderer, 'Back');
    expectText(renderer, 'Deadlifts');
  });

  it('marks an exercise done, hides it, and disables skipping', async () => {
    const renderer = await renderScreen();
    const doneButton = findPressableByText(renderer, 'Done');
    const setsInput = renderer.root.findAllByType(TextInput)[0];

    await act(async () => {
      setsInput.props.onChangeText('5x5');
      await flushPromises();
    });

    await act(async () => {
      doneButton.props.onPress();
      await flushPromises();
    });

    const skipButton = findPressableByText(renderer, 'Skip to Next Workout');

    expectNoText(renderer, 'Bench Press');
    expect(skipButton.props.disabled).toBe(true);
  });
});
