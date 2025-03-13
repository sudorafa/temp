/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProps } from "./theme";

import { getColor, getSpace, getFontSize, getLineHeight } from "./getters";

import { OmitThemeProp, Resolver } from "./types";

function createSelector<T extends (...args: any[]) => any>(getter: T) {
  function x(...args: OmitThemeProp<Parameters<T>>): Resolver<ReturnType<T>>;
  function x(...args: Parameters<T>): ReturnType<T>;
  function x(...args: Parameters<T> | OmitThemeProp<Parameters<T>>): ReturnType<T> | Resolver<ReturnType<T>> {
    if (args.length === getter.length) {
      return getter(...args as Parameters<T>);
    }

    return (props: ThemeProps) => getter(...args, props);
  }

  return x;
}

export const space = createSelector(getSpace);
export const color = createSelector(getColor);
export const fontSize = createSelector(getFontSize);
export const lineHeight = createSelector(getLineHeight);