import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TrainerList from "../components/TrainerList";
import { User } from "../models/UserModels";
import userServices from "../services/UserServices";

const Trainers = () => {
  const [trainers, setTrainers] = useState<User[]>([]);

  useEffect(() => {
    userServices
      .getAllUsers()
      .then((res) => {
        setTrainers(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Navbar />
      <Container sx={{ display: "flex", flex: "1 1 auto" }}>
        <TrainerList trainers={trainers} sx={{ my: 2 }} />
      </Container>
    </div>
  );
};
export default Trainers;
