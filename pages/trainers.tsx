import userServices from "../services/UserServices"
import { selectUserTeam } from '../components/Login/loginSlice';
import { useSelector } from 'react-redux'
import TrainerList from "../components/TrainerList";
import { Button, Modal, Typography, Box, Container } from "@mui/material"
import { User } from "../models/UserModels";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

const Trainers = () => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Navbar />
      <Container sx={{ display: "flex", flex: "1 1 auto" }}>
        <TrainerList sx={{ my: 2 }} />
        {/* {trainers.map(trainer => )} */}
      </Container>
    </div>
  )
}
export default Trainers