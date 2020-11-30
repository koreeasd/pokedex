import React, { useEffect, useState } from "react";
import {
  Typography,
  Link,
  CircularProgress,
  Button,
  Grid,
} from "@material-ui/core";
import { toFirstCharUppercase } from "../constants";
import axios from "axios";

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  /*1. pokemond=undefined, taht means we're getting the info
    -> return loading progress
    2. pokemon=good data, that means we've gotten the info
    -> return actual info
    3. pokemon=bad data / false 
    -> return pokemon not found
  */

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Grid container xs={12} justify="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h2">
              {`${id}.`} {toFirstCharUppercase(name)}
              <img src={front_default} alt="pokemon" />
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" spacing={3}>
          <Grid item xs={12} sm={6}>
            <img
              style={{ width: "300px", height: "300px" }}
              src={fullImageUrl}
              alt="pokemon"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">Pokemon info</Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" spacing={3}>
          <Grid item xs={6} sm={3}>
            <Typography>
              {"Species: "}
              <Link href={species.url}>{species.name}</Link>
            </Typography>
            <Typography>Height: {height}</Typography>
            <Typography>Weight: {weight}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6">Types:</Typography>
            {types.map((typeInfo) => {
              const { type } = typeInfo;
              const { name } = type;
              return <Typography key={name}> {`${name}`}</Typography>;
            })}
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      {pokemon !== undefined && (
        <Button
          variant="contained"
          onClick={() => history.push("/")}
          style={{ margin: "10px" }}
        >
          Back to pokedex
        </Button>
      )}
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
    </>
  );
};

export default Pokemon;
