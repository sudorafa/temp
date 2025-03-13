import { colors } from "./tokens/colors";
import { fontSize } from "./tokens/fonts";
import { lineHeight } from "./tokens/line-height";
import { space } from "./tokens/space";

const theme = {
  colors,
  space,
  fontSize,
  lineHeight
};
export type Theme = typeof theme;
export type ThemeProps = { theme?: Theme };

export type ColorType = keyof Theme["colors"];
export type LineHeight = keyof Theme["lineHeight"];
export type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SpaceIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;
  export type FontSizeIndex =
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9;

export default theme;