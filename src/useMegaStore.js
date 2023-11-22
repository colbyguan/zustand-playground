import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

// Meant for demo-ing two level deep and one level deep dict access
export const useMegaStore = createWithEqualityFn(() => ({
  nestedObj: { labelToNum: {} },

  labelToNum: {},
}), shallow)
