import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pokemon } from "../models/UserModels";
import userServices from "../services/UserServices";
import { selectUserTeam, setUserTeam } from "./Login/loginSlice";

type PokemonCardProps = {
  readOnly: boolean;
  pokemon: Pokemon;
};

const PokemonCard = ({ readOnly, pokemon }: PokemonCardProps): JSX.Element => {
  type ObjectKey = keyof Pokemon;

  const stats: ObjectKey[] = [
    "hp",
    "attack",
    "defense",
    "specialAttack",
    "specialDefense",
    "speed",
  ];
  const statsCommonName: string[] = [
    "HP",
    "Attack",
    "Defense",
    "Special Attack",
    "Special Defense",
    "Speed",
  ];

  const dispatch = useDispatch();
  const userTeam = useSelector(selectUserTeam);
  const [expanded, setExpanded] = useState(false);

  const handleRemove = () => {
    if (userTeam != null) {
      userServices
        .deleteUserPokemon(userTeam?.id, pokemon.name)
        .then((res) => {
          dispatch(
            setUserTeam({
              ...userTeam,
              pokemon: userTeam.pokemon.filter((p) => p.name !== pokemon.name),
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onExpand = () => {
    action("expand/shrink")();
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mx: "auto", my: 2 }} variant="outlined">
      {readOnly === false ? (
        <Box sx={{ mt: 1, mr: 1 }} display="flex" flexDirection="row-reverse">
          <Button color="error" onClick={handleRemove}>
            Remove
          </Button>
        </Box>
      ) : null}
      <CardMedia
        component="img"
        height="250"
        image={pokemon?.image}
        title={pokemon?.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent data-testid="expand" onClick={onExpand}>
        <Accordion expanded={expanded} elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" noWrap>
              {pokemon?.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails data-testid="statsAccordion">
            <Grid container>
              {stats.map((stat, idx) => (
                <Grid key={stat} item xs={6}>
                  <Typography>
                    {statsCommonName[idx]}:{" "}
                    {pokemon != null ? pokemon[stat] : null}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
