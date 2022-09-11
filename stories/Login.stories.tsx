import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../store/UserStore";

import { userEvent, within } from "@storybook/testing-library";
import Login from "../components/Login/Login";

export default {
  title: "Components/Login",
  component: Login,
  decorators: [
    (Story) => (
      // Pass Redux store into component
      <Provider store={store}>
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

  await userEvent.click(canvas.getByTestId("selectLogin"));

  await userEvent.click(canvas.getByTestId("returnToOptions"));
  await userEvent.click(canvas.getByTestId("selectRegister"));

  await userEvent.type(canvas.getByTestId("loginField"), "Brock");

  await userEvent.click(canvas.getByTestId("attempt"));
  // await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
};
