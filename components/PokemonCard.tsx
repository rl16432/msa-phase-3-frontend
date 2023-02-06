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
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pokemon } from "../models/UserModels";
import userServices from "../services/UserServices";
import { selectUserTeam, setUserTeam } from "./Login/loginSlice";

type PokemonCardProps = {
  readOnly: boolean;
  pokemon?: Pokemon;
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
    "Sp. Atk",
    "Sp. Def",
    "Speed",
  ];
  const breakpoint = "md";

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(breakpoint));
  const dispatch = useDispatch();
  const userTeam = useSelector(selectUserTeam);
  const [expanded, setExpanded] = useState(false);
  const [showPokemon, setShowPokemon] = useState(true);

  const handleRemove = () => {
    if (pokemon == null) {
      return;
    }
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
    action("expandOrShrink")();
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mx: "auto", my: 2 }} variant="outlined">
      {/* Remove button */}
      {readOnly === false ? (
        <Box sx={{ mt: 1, mr: 1 }} display="flex" flexDirection="row-reverse">
          <Button color="error" onClick={handleRemove}>
            Remove
          </Button>
        </Box>
      ) : null}

      <Box
        onMouseEnter={() => {
          action("hoverImage")();
          setShowPokemon(false);
        }}
        onMouseLeave={() => {
          action("unhoverImage")();
          setShowPokemon(true);
        }}

        data-testid="pokemonCard"
      >
        {isSmallScreen || showPokemon === true ? (
          // Show image if small screen, otherwise show only if 'showPokemon' is true
          <CardMedia
            component="img"
            height="250"
            image={pokemon?.image}
            title={pokemon?.name}
            sx={{ objectFit: "contain" }}
          />
        ) : (
          // Show stats on hover (only on breakpoint up)
          <CardContent
            sx={{
              height: 250,
              position: "relative",
              "&:hover": {
                visibility: { [breakpoint]: "visible" },
              },
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              p: "0 !important",
            }}
          >
            <Grid container data-testid="hoverStats" spacing={0}>
              {stats.map((stat, idx) => (
                <Grid
                  key={stat}
                  sx={{
                    p: 0,
                    m: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  item
                  xs={6}
                >
                  <Typography sx={{ p: 0, m: 0 }}>
                    {statsCommonName[idx]}:{" "}
                    {pokemon != null ? pokemon[stat] : null}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}
      </Box>
      <CardContent
        sx={{ display: { xs: "none", [breakpoint]: "block" }, px: 4, pb: 4 }}
      >
        <Typography variant="subtitle1" noWrap>
          {pokemon?.name}
        </Typography>
      </CardContent>
      {/* Show stats in accordion on breakpoint down */}
      <CardContent
        sx={{ display: { md: "none" } }}
        data-testid="expand"
        onClick={onExpand}
      >
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
