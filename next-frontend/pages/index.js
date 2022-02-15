import { useState } from "react";
import Link from "next/link";
import { getPokemon } from "../graphql/getPokemon";
import { getPokemons } from "../graphql/getPokemons";
import css from "./index.module.css";

export default function Home({ pokemons }) {
  const [input, setInput] = useState("");
  const [pokiman, setPokiman] = useState(null);

  return (
    <div className={css.content}>
      <fieldset>
        <label htmlFor="pokiman">Pokemon:</label>
        <input
          type="text"
          name="pokiman"
          id="pokiman"
          value={input}
          onChange={async (e) => {
            setInput((_) => e.target.value);
            const pokemon = await getPokemon(input);
            if (pokemon !== null) {
              setPokiman((_) => pokemon);
            }
          }}
        />
      </fieldset>

      {pokiman !== null ? (
        <div className={css.pokiman}>
          <h1>{pokiman.name}</h1>
          <img src={pokiman.image} />
        </div>
      ) : (
        <p>...</p>
      )}

      <ul className={css.list}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <Link as={`/pokemon/${pokemon.name}`} href="/pokemon/[name]">
              <a>
                <h2 style={{ textTransform: "capitalize" }}>{pokemon.name}</h2>
                <img
                  src={pokemon.image}
                  alt={`${pokemon.name} picture`}
                  width={300}
                  height={300}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const pokemons = await getPokemons();
  return {
    props: {
      pokemons,
    },
  };
};
