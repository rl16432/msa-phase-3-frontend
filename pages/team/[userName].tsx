import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { selectUserTeam, setUserTeam } from '../../components/Login/loginSlice'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Typography } from "@mui/material"
import TeamLayout from '../../components/TeamLayout'
import userService from '../../services/UserServices'
import { User } from '../../models/UserModels'

const PokemonTeam = () => {
  const router = useRouter()
  const { userName } = router.query
  // const dispatch = useDispatch()
  const loggedInUserTeam = useSelector(selectUserTeam)
  const readOnly = userName !== loggedInUserTeam?.userName
  const [routeUserTeam, setRouteUserTeam] = useState<User>();

  useEffect(() => {
    if (typeof userName === "string") {
      userService.getUserPokemon(userName)
        .then(res => {
          console.log('hihihi', res)
          setRouteUserTeam(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [userName])

  return (
    <>
      <Navbar />
      <Container sx={{ my: 3 }}>
        {routeUserTeam != null
          ?
          <TeamLayout readOnly={readOnly}
            userName={userName?.toString() || ""}
            pokemons={readOnly === true ? routeUserTeam?.pokemon : loggedInUserTeam?.pokemon}
          />
          :
          null
        }
      </Container>
    </>
  )
}

export default PokemonTeam