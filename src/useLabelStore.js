import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

export const useLabelStore = createWithEqualityFn(() => ({
}), shallow)
