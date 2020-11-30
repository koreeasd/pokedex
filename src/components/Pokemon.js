import React, { useState } from "react";
import mockData from "../mockData";
import { Typography, Link } from "@material-ui/core";
import { toFirstCharUppercase } from "../constants";

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Typography variant="h2">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        <Typography variant="h3">Pokemon info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}> {`${name}`}</Typography>;
        })}
      </>
    );
  };

  return <>{generatePokemonJSX()}</>;
};

export default Pokemon;
