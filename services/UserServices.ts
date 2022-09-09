import axios from "axios"
import { Pokemon, User } from "../models/UserModels"
const BASE_URL = "https://localhost:7246"

const getAllUsers = (): Promise<User[]> => {
  return axios
    .get(`${BASE_URL}/user`)
    .then(res => res.data)
}

const getUserPokemon = async (userName: string): Promise<User> => {
  return axios
    .get(
      `${BASE_URL}/user/${userName}`
    )
    .then(res => res.data)
}

const addUserPokemon = (userId: number, pokemonName: string) => {
  return axios
    .put(
      `${BASE_URL}/user/${userId}/pokemon`,
      null,
      { params: { pokemon: pokemonName } }
    ).then(res => res.data)
}

const deleteUserPokemon = (userId: number, pokemonName: string) => {
  return axios
    .delete(
      `${BASE_URL}/user/${userId}/pokemon`,
      { params: { pokemon: pokemonName } }
    ).then(res => res.data)
}

const exports = {
  getAllUsers,
  getUserPokemon,
  addUserPokemon,
  deleteUserPokemon
}

export default exports