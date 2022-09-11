import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardMedia, Container, Typography
} from "@mui/material/";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Pokemon, User } from "../models/UserModels";
import pokemonServices from "../services/UserServices";

type PokemonCardProps = {
  pokemon?: Pokemon;
};

const Pokemon = ({ pokemon }: PokemonCardProps): JSX.Element => {
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
  const [user, setUser] = useState<User>();

  useEffect(() => {
    pokemonServices.getUserPokemon("Brock").then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ my: 3 }}>
        {user?.pokemon.map((poke) => {
          return <Pokemon key={poke.pokemonNo} pokemon={poke} />;
        })}
      </Container>
    </>
  );
};

export default Home;
