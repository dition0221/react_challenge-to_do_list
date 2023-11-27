import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    bgOpacityColor: string;
    textColor: string;
    accentColor: string;
  }
}
