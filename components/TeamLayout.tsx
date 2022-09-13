import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertProps,
  Box,
  Container,
  Grid,
  TextField
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pokemon } from "../models/UserModels";
import userService from "../services/UserServices";
import { selectUserTeam, setUserTeam } from "./Login/loginSlice";
import PokemonCard from "./PokemonCard";

interface TeamLayoutProps {
  readOnly: boolean;
  pokemons?: Pokemon[];
}

const TeamLayout = ({ readOnly, pokemons }: TeamLayoutProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>();
  const [newPokemon, setNewPokemon] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<AlertProps["severity"]>("error");
  const dispatch = useDispatch();
  const userTeam = useSelector(selectUserTeam);

  const displayAlert = (success: AlertProps["severity"], message: string) => {
    setSuccess(success);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertMessage(null);
    }, 2000);
  };

  const handleAddPokemon = () => {
    if (userTeam != null && newPokemon !== "") {
      setLoading(true);
      userService
        .addUserPokemon(userTeam?.id, newPokemon)
        .then((res) => {
          userService
            .getUserPokemon(userTeam.userName)
            .then((res) => {
              dispatch(setUserTeam(res));
              setLoading(false);
              displayAlert("success", "Pokemon added");
            })
            .catch((err) => {
              displayAlert("error", "Internal Server Error");
            });
        })
        .catch((err) => {
          setLoading(false);
          displayAlert("error", err?.response?.data);
        });
    }
  };

  if (pokemons == null) {
    return <></>;
  }

  return (
    <>
      <Container sx={{ my: 3 }}>
        {readOnly === false ? (
          <>
            {alertMessage != null ? (
              <Alert severity={success} sx={{ py: 0, my: 2 }}>
                {alertMessage}
              </Alert>
            ) : null}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
                alignItems: { xs: "center", md: "normal" },
                flexDirection: "row",
              }}
            >
              <TextField
                sx={{
                  mr: 1,
                  ml: { xs: 0, md: 1 },
                  display: "flex",
                }}
                size="small"
                label="Enter a Pokemon"
                value={newPokemon}
                onChange={(e) => setNewPokemon(e.target.value)}
              />
              <LoadingButton
                sx={{ typography: "caption" }}
                loading={loading}
                onClick={handleAddPokemon}
                startIcon={<AddIcon />}
                variant="outlined"
              >
                Add Pokemon
              </LoadingButton>
            </Box>
          </>
        ) : null}
        <Grid container sx={{ display: "flex", flexWrap: "wrap" }} spacing={2}>
          {pokemons.map((pokemon, idx) => (
            <Grid item key={pokemon.id} sx={{ flex: 1 }} xs={12} md={6} lg={4}>
              <PokemonCard readOnly={readOnly} pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TeamLayout;
