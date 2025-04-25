import { useEffect, useState } from "react";
import CatchPokemon from "./CatchPokemon";

function PokemonModal({ pokemon, onClose, user }) {
  const [details, setDetails] = useState(null);
  const [typeNames, setTypeNames] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await response.json();

      setDetails(data);

      const typePromises = data.types.map(async (typeInfo) => {
        const res = await fetch(typeInfo.type.url);
        const typeData = await res.json();
        const korean = typeData.names.find(
          (entry) => entry.language.name === "ko"
        );
        return korean ? korean.name : typeInfo.type.name;
      });

      const translatedTypes = await Promise.all(typePromises);
      setTypeNames(translatedTypes);
    };

    fetchDetails();
  }, [pokemon]);

  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:text-black">
      <div className="bg-white rounded-xl p-6 w-80 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-4 capitalize text-center">
          {pokemon.koreanName}
          <br />
          <span className="text-sm text-gray-500 capitalize">
            ({details.name})
          </span>
        </h2>

        <img
          src={details.sprites.front_default}
          alt={details.name}
          className="mx-auto mb-4"
        />

        <ul className="text-sm text-gray-700 space-y-2">
          <li>
            <strong>번호 :</strong> #{details.id}
          </li>
          <li>
            <strong>키: </strong> {details.height / 10}m
          </li>
          <li>
            <strong>몸무게: </strong> {details.weight / 10}kg
          </li>
          <li>
            <strong>타입: </strong> {typeNames.join(", ")}
          </li>
        </ul>

        {/* 잡기 버튼 */}
        <div className="text-center">
          <CatchPokemon user={user} pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
