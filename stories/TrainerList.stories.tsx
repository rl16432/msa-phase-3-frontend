import { Container } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import pokeTeam from "./poketeam.json";

import TrainerList from "../components/TrainerList";

export default {
  title: "Components/TrainerList",
  component: TrainerList,
} as ComponentMeta<typeof TrainerList>;

const Template: ComponentStory<typeof TrainerList> = ({ trainers }) => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Container sx={{ display: "flex", flex: "1 1 auto" }}>
        <TrainerList trainers={trainers} sx={{ my: 2 }} />
      </Container>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = { trainers: pokeTeam };
