'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import { ThemeContext } from "styled-components";
import { ThemeProps } from "./theme";

import { getColor, getFontSize, getLineHeight, getSpace } from "./getters";
import { OmitThemeProp } from "./types";

function partialGetter<T extends (...args: any) => any>(
  getter: T,
  props: ThemeProps
) {
  return function x(...args: OmitThemeProp<Parameters<T>>): ReturnType<T> {
    return getter(...args, props);
  };
}

export default function useTheme() {
  const theme = useContext(ThemeContext) as ThemeProps;

  return useMemo(() => {
    const themeProps = { theme };

    return {
      color: partialGetter(getColor, themeProps as ThemeProps),
      space: partialGetter(getSpace, themeProps as ThemeProps),
      fontSize: partialGetter(getFontSize, themeProps as ThemeProps),
      lineHeight: partialGetter(getLineHeight, themeProps as ThemeProps)
    };
  }, [theme]);
}