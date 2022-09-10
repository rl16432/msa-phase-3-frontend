import axios from "axios"
import { Pokemon, User } from "../models/UserModels"

const BASE_URL = process.env.NEXT_PUBLIC_POKETEAM_API_BASE_URI  // "https://localhost:7246" 

const getAllUsers = async (): Promise<User[]> => {
  return await axios
    .get(`${BASE_URL}/user`)
    .then(res => res.data)
}

const getUserPokemon = (userName: string): Promise<User> => {
  return axios
    .get(
      `${BASE_URL}/user/${userName}`
    )
    .then(res => res.data)
}

const createUser = (userName: string) => {
  return axios
    .post(
      `${BASE_URL}/user/${userName}`,
      { userName: userName }
    )
    .then(res => res.data)
}
const addUserPokemon = async (userId: number, pokemonName: string) => {
  return await axios
    .put(
      `${BASE_URL}/user/${userId}/pokemon`,
      null,
      { params: { pokemon: pokemonName } }
    ).then(res => res.data)
}

const deleteUserPokemon = async (userId: number, pokemonName: string) => {
  return await axios
    .delete(
      `${BASE_URL}/user/${userId}/pokemon`,
      { params: { pokemon: pokemonName } }
    ).then(res => res.data)
}

const exports = {
  getAllUsers,
  getUserPokemon,
  createUser,
  addUserPokemon,
  deleteUserPokemon
}

export default exports