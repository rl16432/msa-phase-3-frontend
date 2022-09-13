import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Provider } from "react-redux";
import Login from "../components/Login/Login";
import { makeStore } from "../store/UserStore";
export default {
  title: "Components/Login",
  component: Login,
  decorators: [
    (Story) => (
      // Pass Redux store into component
      <Provider store={makeStore()}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#cc0000",
          }}
        >
          <Story />
        </div>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => {
  return (
    <Login
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        mx: 1,
        my: 2,
      }}
    />
  );
};

export const Options = Template.bind({});

Options.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByTestId("selectRegister"));

  await userEvent.click(canvas.getByTestId("returnToOptions"));
  await userEvent.click(canvas.getByTestId("selectLogin"));

  await userEvent.type(canvas.getByTestId("loginField"), "Brock");

  await userEvent.click(canvas.getByTestId("attempt"));
  
//   var xpath = "//p[@class='MuiTypography-root'][contains(., '')]";
//   var matchingElement = await document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
//   await expect(matchingElement.iterateNext()).toBeVisible();
};
 