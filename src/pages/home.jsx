import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import { useTheme } from "next-themes";
import {
  Button,
  Input,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Logo from "../assets/logoBlanco.svg";
import { AbstractShapes } from "../components/abstract.jsx";
import { ParticlesBackground } from "../components/particles.jsx";
import { use } from "react";

function Home() {
  const {store, actions } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    
  },[]);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    actions.login(userName, password).then((res) => {
      setIsLoading(false);
      if (res) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#034AA6] to-[#0F6CA7]">
      <ParticlesBackground />
      <AbstractShapes />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md px-2"
      >
        
        <Card className=" backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-white/10 to-white/5 p-1 backdrop-blur-sm"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#034AA6] to-[#0F6CA7] flex items-center justify-center">
                  <img src={Logo} alt="Logo" className="w-40 h-40" />
                </div>
              </motion.div>
              <h1 className="mt-6 text-3xl font-bold text-white">
                ¡Bienvenido!
              </h1>
              <p className="mt-2 text-white/60">
                Ingresa a tu cuenta para continuar
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <h2 htmlFor="email" className="text-white">
                  Usuario
                </h2>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="nombre@empresa.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <h2 htmlFor="password" className="text-white">
                  Contraseña
                </h2>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="************"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 transition-all duration-300 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {password ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleSubmitLogin}
                type="submit"
                className="w-full bg-white text-[#034AA6] hover:bg-white/90 transition-all duration-300 font-medium rounded-lg py-2.5"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <CardFooter className="flex justify-center">
              <div className="mt-5">
                <a
                  href="#"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default Home;
