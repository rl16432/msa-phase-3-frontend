export type Pokemon = {
  id: number
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
  id: number
  userName: string
  pokemon: Pokemon[]
}