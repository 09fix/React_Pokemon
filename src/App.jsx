import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "./App.css";
import logo from "./assets/logo.jpg";

// 컴포넌트 임포트
import PokemonCard from "./components/pokemon_components/PokemonCard";
import PokemonModal from "./components/pokemon_components/PokemonModal";
import SearchBar from "./components/header_components/SearchBar";
import Header from "./components/header_components/Header";
import MyPage from "./components/login_components/MyPage";
import Login from "./components/login_components/Login";
import SignUp from "./components/login_components/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isKorean, setIsKorean] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  // 로그아웃
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("/"); // 홈으로 이동
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 포켓몬 리스트 불러오기
  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();

      const pokemonWithImages = await Promise.all(
        data.results.map(async (pokemon, index) => {
          const id = index + 1;
          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
          const speciesData = await speciesRes.json();
          const koreanNameEntry = speciesData.names.find(
            (entry) => entry.language.name === "ko"
          );

          return {
            ...pokemon,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            koreanName: koreanNameEntry ? koreanNameEntry.name : pokemon.name,
          };
        })
      );

      setPokemonList(pokemonWithImages);
      setFilteredList(pokemonWithImages);
    };

    fetchPokemonList();
  }, []);

  // 로그인 상태 체크
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 검색 필터
  const handleSearch = (keyword) => {
    const filtered = pokemonList.filter((pokemon) =>
      (isKorean ? pokemon.koreanName : pokemon.name)
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="px-6 py-10 max-w-6xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
        <Link to="/" className="flex justify-center items-center w-full">
          <img src={logo} alt="홈으로" className="mx-auto" />
        </Link>

        {/* 상단바 */}
        <div className="flex justify-between items-center mb-10">
          {/* 왼쪽: 토글 스위치들 */}
          <div className="flex items-center gap-8">
            {/* 한영 전환 */}
            <div className="flex items-center gap-2">
              <span className="text-sm">🇰🇷</span>
              <button
                onClick={() => setIsKorean((prev) => !prev)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out ${
                  isKorean ? "bg-green-500" : "bg-pink-500"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
                    isKorean ? "translate-x-0" : "translate-x-6"
                  }`}
                ></div>
              </button>
              <span className="text-sm">🇺🇸</span>
            </div>

            {/* 다크모드 전환 */}
            <div className="flex items-center gap-2">
              <span className="text-sm">☀️</span>
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out ${
                  darkMode ? "bg-gray-700" : "bg-yellow-400"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
                    darkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
              <span className="text-sm">🌙</span>
            </div>
          </div>

          {/* 오른쪽: 로그인 상태 버튼 */}
          <div className="flex gap-2">
            {user === null ? (
              <Link
                to="/login"
                className="px-6 py-2 text-base font-semibold rounded-full bg-green-100 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 text-black dark:text-white shadow transition-all duration-200 hover:scale-105"
              >
                로그인
              </Link>
            ) : (
              <>
                <Link
                  to="/mypage"
                  className="px-6 py-2 text-base font-semibold rounded-full bg-blue-100 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 text-black dark:text-white shadow transition-all duration-200 hover:scale-105"
                >
                  마이페이지
                </Link>
                <button
                  onClick={logOut}
                  className="px-6 py-2 text-base font-semibold rounded-full bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600 text-black dark:text-white shadow transition-all duration-200 hover:scale-105"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <div className="flex justify-center items-center mb-6">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredList.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.name}
                      pokemon={pokemon}
                      isKorean={isKorean}
                      onClick={() => setSelectedPokemon(pokemon)}
                    />
                  ))}
                </div>

                {selectedPokemon && (
                  <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                    user={user}
                  />
                )}
              </>
            }
          />
          <Route path="/mypage" element={<MyPage user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
