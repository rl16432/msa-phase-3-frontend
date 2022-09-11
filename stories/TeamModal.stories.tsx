import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useEffect, useState } from "react";
import pokeTeam from "./poketeam.json";

import TeamModal from "../components/TeamModal";

export default {
  title: "Components/TeamModal",
  component: TeamModal,
} as ComponentMeta<typeof TeamModal>;

const Template: ComponentStory<typeof TeamModal> = ({ isOpen, user }) => {
  const [isOpenModal, setIsOpenModal] = useState(isOpen);

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  const onClose = () => setIsOpenModal(!isOpenModal);

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <TeamModal isOpen={isOpenModal} handleClose={onClose} user={user} />
    </div>
  );
};

export const FullTeam = Template.bind({});
FullTeam.args = {
  isOpen: true,
  user: pokeTeam.find((user) => user.userName === "Brock"),
};

export const EmptyTeam = Template.bind({});
EmptyTeam.args = {
  isOpen: true,
  user: pokeTeam.find((user) => user.userName === "Ash"),
};
