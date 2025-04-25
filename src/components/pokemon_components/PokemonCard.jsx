function PokemonCard({ pokemon, onClick, isKorean }) {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:scale-105 transition-transform "
      onClick={onClick}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto mb-2 animate-bounce"
      />
      <p className="capitalize font-semibold dark:text-black">
        {isKorean ? pokemon.koreanName : pokemon.name}
      </p>
    </div>
  );
}

export default PokemonCard;
