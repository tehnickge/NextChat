import "styled-components";
import { ITheme } from "../models/theme";

const theme: ITheme = {
  colors: {
    primary: "#1976d2",
    secondary: "#dc004e",
    background: "#1b191b",
    backgroundDatk: "#181618",
    backgroundLight: "#2e2c2e",
    text: "#90a0ad",
    textHover: "#bad9f1",
    textSamy: "#656e74",
  },
  fonts: {
    main: '"Roboto", sans-serif',
  },
};

export default theme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
