import { ComponentMeta, ComponentStory } from "@storybook/react";
import store from "../store/UserStore";
import pokeTeam from "./poketeam.json";

import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { Provider } from "react-redux";
import PokemonCard from "../components/PokemonCard";

export default {
  title: "Components/PokemonCard",
  component: PokemonCard,
  decorators: [
    (Story) => (
      // Pass Redux store into component
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof PokemonCard>;

const Template: ComponentStory<typeof PokemonCard> = ({
  readOnly,
  pokemon,
}) => {
  return (
    <PokemonCard readOnly={readOnly} pokemon={pokemon} />
  );
};

export const Mobile = Template.bind({});

Mobile.args = { readOnly: true, pokemon: pokeTeam[2].pokemon[0] };

Mobile.parameters = {
  viewport: {
    defaultViewport: "iphone6",
  },
};

Mobile.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => userEvent.click(canvas.getByTestId("expand")));

  // Stats are shown
  await waitFor(() => expect(canvas.getByText(/.*Speed.*/i)).toBeVisible());

  await waitFor(() => userEvent.click(canvas.getByTestId("expand")));

  // Stats are hidden
  await waitFor(() => expect(canvas.getByText(/.*Speed.*/i)).not.toBeVisible());
};

export const LargeScreen = Template.bind({});

LargeScreen.args = { readOnly: true, pokemon: pokeTeam[2].pokemon[0] };

LargeScreen.parameters = {
  viewport: {
    defaultViewport: "ipad12p",
  },
};

LargeScreen.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => userEvent.hover(canvas.getByTestId("pokemonCard")));

  await waitFor(() => expect(canvas.getByTestId("hoverStats")).toBeVisible());

  await waitFor(() => userEvent.unhover(canvas.getByTestId("pokemonCard")));

  await waitFor(() =>
    expect(canvas.getByTestId("hoverStats")).not.toBeVisible()
  );
};
