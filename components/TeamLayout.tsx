import { Alert, AlertProps, Box, Button, Container, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import PokemonCard from "./PokemonCard"
import { Pokemon } from "../models/UserModels"
import { useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import userService from "../services/UserServices"
import { useDispatch, useSelector } from "react-redux"
import { selectUserTeam, setUserTeam } from "./Login/loginSlice"

interface TeamLayoutProps {
  readOnly: boolean,
  userName: string,
  pokemons?: Pokemon[]
}

const TeamLayout = ({ readOnly, userName, pokemons }: TeamLayoutProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>()
  const [newPokemon, setNewPokemon] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<AlertProps["severity"]>("error")
  const dispatch = useDispatch()
  const userTeam = useSelector(selectUserTeam)

  const displayAlert = (success: AlertProps["severity"], message: string) => {
    setSuccess(success)
    setAlertMessage(message)

    setTimeout(() => {
      setAlertMessage(null)
    }, 2000)
  }

  const handleAddPokemon = () => {
    if (userTeam != null && newPokemon !== "") {
      setLoading(true)
      userService.addUserPokemon(userTeam?.userId, newPokemon)
        .then((res) => {
          userService.getUserPokemon(userTeam.userName)
            .then(res => {
              dispatch(setUserTeam(res))
              displayAlert("success", "Pokemon added")
              setLoading(false)
            })
        })
        .catch(err => {
          displayAlert("error", err.response.data)
          setLoading(false)
        })
    }
  }

  if (pokemons == null) {
    return <></>
  }

  return (
    <>
      <Container sx={{ my: 3 }}>
        {
          readOnly === false
            ?
            <>
              {alertMessage != null ? <Alert severity={success} sx={{ py: 0, my: 2 }}>{alertMessage}</Alert> : null}
              <Box sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
                alignItems: { xs: "center", md: "normal" },
                flexDirection: "row"
              }}>
                <TextField
                  sx={{
                    mr: 1,
                    ml: { xs: 0, md: 1 },
                    display: "flex"
                  }}
                  size="small"
                  label="Enter a Pokemon"
                  value={newPokemon}
                  onChange={(e) => setNewPokemon(e.target.value)}
                />
                <LoadingButton sx={{ typography: "caption" }} loading={loading}
                  onClick={handleAddPokemon} startIcon={<AddIcon />} variant="outlined">
                  Add Pokemon
                </LoadingButton>
              </Box>
            </>
            : null
        }
        {pokemons.map(pokemon =>
          <PokemonCard readOnly={readOnly} userName={userName?.toString() || ""} pokemon={pokemon} />
        )}
      </Container>
    </>
  )
}

export default TeamLayout