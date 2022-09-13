import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    // The viewports you want to use
    viewports: {
      ...INITIAL_VIEWPORTS,
      desktop: {
        name: "Desktop",
        styles: {
          width: "1920px",
          height: "1080px",
        },
      },
    },
    // Your own default viewport
    defaultViewport: "responsive",
  },
}