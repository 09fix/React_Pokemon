import React from "react";
import { db } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const CatchPokemon = ({ user, pokemon }) => {
  const handleCatch = async () => {
    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    try {
      await addDoc(collection(db, "caught_pokemons"), {
        uid: user.uid,
        name: pokemon.name,
        koreanName: pokemon.koreanName,
        image: pokemon.image,
        caughtAt: new Date(),
      });
      alert(`${pokemon.koreanName}을(를) 잡았습니다!`);
    } catch (error) {
      console.error("포켓몬 저장 실패:", error);
    }
  };

  return (
    <button
      onClick={handleCatch}
      className="mt-2 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-200"
    >
      잡기
    </button>
  );
};

export default CatchPokemon;
