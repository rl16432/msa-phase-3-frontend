import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  ThemeProvider,
  Typography
} from "@mui/material/";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Pokemon } from "../models/UserModels";

type PokemonCardProps = {
  pokemon?: Pokemon;
};

const Pokemon = ({ pokemon }: PokemonCardProps): JSX.Element => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{ mx: "auto", my: 2 }}
      variant="outlined"
      onClick={() => setExpanded((expanded) => !expanded)}
    >
      <CardMedia
        component="img"
        height="250"
        image={pokemon?.image}
        title={pokemon?.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Accordion expanded={expanded} elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" noWrap>
              {pokemon?.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Attack: {pokemon?.attack}</Typography>
            <Typography variant="body1">Attack: {pokemon?.attack}</Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

const Home: NextPage = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>PokeTeam</title>
      </Head>
      <Navbar />
      <Container sx={{ my: 3, py: 2, px: 0 }}>
        <Typography sx={{ textAlign: "center", my: 3 }} variant="h4">
          Login or register to get started
        </Typography>

        <Typography sx={{ textAlign: "center", my: 3 }} variant="h4">
          Create your team
        </Typography>
        <Box
          sx={{
            display: "block",
            mx: "auto",
            my: 3,
            width: { xs: "100%", md: "80%" },
          }}
          component="img"
          src="/create_team.png"
          alt="Create team page"
        />

        <Typography sx={{ textAlign: "center", my: 3 }} variant="h4">
          Explore trainers
        </Typography>
        <Box
          sx={{
            display: "block",
            mx: "auto",
            mt: 3,
            width: { xs: "100%", md: "80%" },
          }}
          component="img"
          src="/explore_trainers.png"
          alt="Explore trainers page"
        />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
