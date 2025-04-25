import { useState } from "react";
import { auth } from "../../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("회원가입 성공", userCredential.user);
      navigate("/");
    } catch (error) {
      console.log("회원가입 오류", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          회원가입
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

        <div className="mb-4">
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

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-gray-700 dark:text-gray-300"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호 다시 입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
