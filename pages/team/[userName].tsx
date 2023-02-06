import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserTeam } from "../../components/Login/loginSlice";
import Navbar from "../../components/Navbar/Navbar";
import TeamLayout from "../../components/TeamLayout";
import { User } from "../../models/UserModels";
import userService from "../../services/UserServices";

const PokemonTeam = () => {
  const router = useRouter();
  const { userName } = router.query;
  const loggedInUserTeam = useSelector(selectUserTeam);
  const readOnly = userName !== loggedInUserTeam?.userName;
  const [routeUserTeam, setRouteUserTeam] = useState<User>();

  useEffect(() => {
    if (typeof userName === "string") {
      userService
        .getUserPokemon(userName)
        .then((res) => {
          setRouteUserTeam(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userName, loggedInUserTeam]);

  return (
    <>
      <Head>
        <title>{`${userName}\'s team`}</title>
      </Head>
      <Navbar />
      <Container sx={{ my: 3 }}>
        {routeUserTeam != null ? (
          <TeamLayout
            readOnly={readOnly}
            pokemons={
              readOnly === true
                ? routeUserTeam?.pokemon
                : loggedInUserTeam?.pokemon
            }
          />
        ) : null}
      </Container>
    </>
  );
};

export default PokemonTeam;
