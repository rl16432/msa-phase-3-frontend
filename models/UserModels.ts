export type Pokemon = {
  pokemonId: number
  pokemonNo: number
  name: string
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  image: string
}

export type User = {
  userId: number
  userName: string
  pokemon: Pokemon[]
}