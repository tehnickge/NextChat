import 'styled-components';
import { ITheme } from "../models/theme";

const theme: ITheme = {
  colors: {
    primary: "#1976d2",
    secondary: "#dc004e",
    background: "#f5f5f5",
    text: "#333",
  },
  fonts: {
    main: '"Roboto", sans-serif',
  },
};

export default theme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
