import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ 'react-router' → 'react-router-dom' 수정
import { auth } from "../../../firebase-config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✨ 세션 기반 로그인 설정
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("로그인 성공", userCredential.user);
      navigate("/");
    } catch (error) {
      console.log("오류", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          로그인
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-gray-700 dark:text-gray-300"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="이메일 입력하기"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 text-gray-700 dark:text-gray-300"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력하기"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4"
        >
          로그인
        </button>

        <div className="text-center dark:text-white">
          <span>계정이 없으신가요?</span>
          <Link to="/signUp">
            <button className="ml-2 text-blue-500 hover:underline">
              회원가입
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
