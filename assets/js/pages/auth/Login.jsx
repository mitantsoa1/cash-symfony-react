import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login_check", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/frais");
      window.location.reload();
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col h-screen login-container">
      <div className="flex-grow p-4 overflow-y-auto h-1/3">
        <form onSubmit={handleSubmit} className="md:w-1/3 lg:w-1/3 sm:w-full">
          <Input
            parentClassName="mb-4"
            label="Email:"
            labelClassName="mb-2.5 block font-medium text-gray-400 dark:text-white"
            divInputClassName="relative"
            type="email"
            placeholder="john@doe.fr"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <Input
            parentClassName="mb-2"
            label="Password:"
            labelClassName="mb-2.5 block font-medium text-gray-400 dark:text-white"
            divInputClassName="relative"
            type="password"
            placeholder="*******"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />

          {error && <p className="mb-2 text-sm text-red-700">{error}</p>}

          <Input
            divInputClassName="mb-5"
            type="submit"
            value="Inserer"
            className="w-full py-2 font-medium text-white transition border rounded-md cursor-pointer bg-primary hover:bg-opacity-90"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
