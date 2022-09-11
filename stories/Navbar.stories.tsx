import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import store from "../store/UserStore";

export default {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      // Pass Redux store into component
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Navbar />
    </div>
  );
};

export const Primary = Template.bind({});
