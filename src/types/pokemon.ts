export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface PokemonDetails extends Pokemon {
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
