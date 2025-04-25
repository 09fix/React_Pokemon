import React, { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyPage = ({ user }) => {
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchCaughtPokemons = async () => {
      try {
        const q = query(
          collection(db, "caught_pokemons"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const pokemons = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCaughtPokemons(pokemons);
      } catch (error) {
        console.error("포켓몬 목록 불러오기 실패:", error);
      }
    };

    fetchCaughtPokemons();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "caught_pokemons", id));
      setCaughtPokemons((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("포켓몬 삭제 실패:", error);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-lg">로그인이 필요합니다.</div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">내 포켓몬 목록</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          도감으로 돌아가기
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {caughtPokemons.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            잡은 포켓몬이 없습니다.
          </div>
        ) : (
          caughtPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={pokemon.image}
                alt={pokemon.koreanName}
                className="w-20 h-20 object-contain mx-auto mb-3"
              />
              <p className="text-center font-semibold text-lg">
                {pokemon.koreanName}
              </p>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                {pokemon.name}
              </p>
              <button
                onClick={() => handleDelete(pokemon.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-xs py-1 rounded-md transition"
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPage;
