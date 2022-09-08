import type { NextPage } from 'next'
import pokemonServices from '../services/UserServices'
import { User, Pokemon } from '../models/UserModels'
import { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Card, Collapse, CardMedia, CardContent, Avatar, Box } from '@mui/material/'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar'
import Login from '../components/Login/Login'

type PokemonCardProps = {
  pokemon?: Pokemon
}

const Pokemon = ({ pokemon }: PokemonCardProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false)
  return (
    <Card sx={{ mx: "auto", my: 2 }}
      variant="outlined"
      onClick={() => setExpanded(expanded => !expanded)}
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
            <Typography variant="body1">
              Attack: {pokemon?.attack}
            </Typography>
            <Typography variant="body1">
              Attack: {pokemon?.attack}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  )
}

const PokemonCard = ({ pokemon }: PokemonCardProps): JSX.Element => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  )
}
const Home: NextPage = () => {
  const [user, setUser] = useState<User>()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    pokemonServices.getUserPokemon("Brock").then(res => {
      setUser(res)
    })
  }, [])

  return (<>
    <Navbar />
    <Container sx={{ my: 3 }}>
      {user?.pokemon.map(poke => {
        return (
          <Pokemon key={poke.pokemonNo} pokemon={poke} />
        )
      })}
    </Container>
  </>
  )
}

export default Home
