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

const exports = {
  getAllUsers,
  getUserPokemon
}

export default exports