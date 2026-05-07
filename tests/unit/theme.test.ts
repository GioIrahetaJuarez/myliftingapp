import { describe, expect, it } from '@jest/globals';

import { Colors } from '@/constants/theme';

describe('theme colors', () => {
  it('defines readable text colors for light and dark themes', () => {
    expect(Colors.light.text).toBe('#11181C');
    expect(Colors.dark.text).toBe('#ECEDEE');
  });

  it('uses the light tint for the selected light tab icon', () => {
    expect(Colors.light.tabIconSelected).toBe(Colors.light.tint);
  });
});
