import { Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TrainerList from "../components/TrainerList";
import { User } from "../models/UserModels";
import userServices from "../services/UserServices";

const Trainers = () => {
  const [trainers, setTrainers] = useState<User[]>([]);

  useEffect(() => {
    // Get all the users and render
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
      <Head>
        <title>PokeTeam - Trainers</title>
      </Head>
      <Navbar />
      <Container sx={{ display: "flex", flex: "1 1 auto" }}>
        <TrainerList trainers={trainers} sx={{ my: 2 }} />
      </Container>
    </div>
  );
};
export default Trainers;
