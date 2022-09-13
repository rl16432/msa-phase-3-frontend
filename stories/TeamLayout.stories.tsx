import { ComponentMeta, ComponentStory } from "@storybook/react";
import pokeTeam from "./poketeam.json";

import { Provider } from "react-redux";
import TeamLayout from "../components/TeamLayout";
import store from "../store/UserStore";

const pokemons = pokeTeam.map((u) => u.pokemon);

export default {
  title: "Components/TeamLayout",
  component: TeamLayout,
  decorators: [
    (Story) => (
      // Pass Redux store into component
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof TeamLayout>;

const Template: ComponentStory<typeof TeamLayout> = ({
  readOnly,
  pokemons,
}) => {
  return (
    <>
      <TeamLayout readOnly={readOnly} pokemons={pokemons} />
    </>
  );
};

export const FullTeamMobile = Template.bind({});
FullTeamMobile.args = {
  readOnly: false,
  pokemons: pokemons[2],
};

FullTeamMobile.parameters = {
  viewport: {
    defaultViewport: "iphone6",
  },
};

export const FullTeamLargeScreen = Template.bind({});
FullTeamLargeScreen.args = {
  readOnly: false,
  pokemons: pokemons[2],
};

export const FullTeamReadOnly = Template.bind({});
FullTeamReadOnly.args = {
  readOnly: true,
  pokemons: pokemons[2],
};


FullTeamLargeScreen.parameters = {
  viewport: {
    defaultViewport: "responsive",
  },
};

export const HalfFullTeam = Template.bind({});
HalfFullTeam.args = {
  readOnly: false,
  pokemons: pokemons[5],
};
