import { ComponentMeta, ComponentStory } from "@storybook/react";
import store from "../store/UserStore";
import pokeTeam from "./poketeam.json";

import { userEvent, within } from "@storybook/testing-library";
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
    // <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
    //   <Container sx={{ display: "flex", flex: "1 1 auto" }}>

    //   </Container>
    // </div>
    <PokemonCard readOnly={readOnly} pokemon={pokemon} />
  );
};

export const Primary = Template.bind({});
Primary.args = { readOnly: true, pokemon: pokeTeam[2].pokemon[0] };

Primary.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByTestId("expand"));

  await userEvent.click(canvas.getByTestId("expand"))

  // await expect(canvas.getByText(/.*Speed.*/i)).toBeInTheDocument();
};
