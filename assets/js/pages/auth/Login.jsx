import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState(""); // Pour le code 2FA
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisable(true);
    try {
      // Premier appel pour l'authentification
      const response = await axios.post("/api/login_check", {
        email,
        password,
      });

      // Si l'authentification requiert 2FA
      if (response.data.token && response.status == 200) {
        const fa = await axios.post("/api/two_factor", {
          email,
        });
        if (fa.data) {
          setRequires2FA(true);
          setError("");
        }
      }
      setIsDisable(false);
      // } else {
      //   localStorage.setItem("token", response.data.token);
      //   navigate("/frais");
      //   window.location.reload();
      // }
    } catch (error) {
      console.log("error");
      setIsDisable(false);

      setError("Invalid credentials");
    }
  };

  const handle2FASubmit = async (event) => {
    event.preventDefault();
    setIsDisable(true);
    try {
      // Vérifier le code 2FA
      const response = await axios.post("/api/two_factor_check", {
        email,
        auth_code: authCode,
      });
      if (response.data == true) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid OTP");
      }
      setIsDisable(false);
    } catch (error) {
      setError("Invalid OTP");
      setIsDisable(false);
    }
  };

  return (
    <div className="flex flex-col h-screen login-container">
      <div className="flex-grow p-4 overflow-y-auto h-1/3">
        <form
          onSubmit={requires2FA ? handle2FASubmit : handleSubmit}
          className="md:w-1/3 lg:w-1/3 sm:w-full"
        >
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
            disabled={requires2FA}
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
            disabled={requires2FA}
          />

          {requires2FA && (
            <Input
              parentClassName="mb-2"
              label="OTP:"
              labelClassName="mb-2.5 block font-medium text-gray-400 dark:text-white"
              divInputClassName="relative"
              type="text"
              placeholder="Enter your OTP"
              name="authCode"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              className="w-full py-2 pl-2 pr-10 bg-white border rounded-md outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          )}

          {error && <p className="mb-2 text-sm text-red-700">{error}</p>}

          <Input
            divInputClassName="mb-5"
            type="submit"
            disabled={isDisable}
            value={requires2FA ? "Submit" : "Login"}
            className="w-full py-2 font-medium text-white transition border rounded-md cursor-pointer bg-primary hover:bg-opacity-90"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
