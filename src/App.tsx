
import { useRoutes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Configuracoes from "./pages/Configuracoes";
import Consultas from "./pages/Consultas";
import Dashboard from "./pages/Dashboard";
import Exames from "./pages/Exames";
import Financeiro from "./pages/Financeiro";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pacientes from "./pages/Pacientes";
import { useLayoutEffect } from "react";

const setFavicon = () => {
  const links = document.querySelectorAll("link[rel*='icon']");
  links.forEach(link => link.remove());
  
  const newIcon = document.createElement('link');
  newIcon.rel = 'icon';
  newIcon.href = '/favicon-eye.ico';
  document.head.appendChild(newIcon);
};

function App() {
  useLayoutEffect(() => {
    setFavicon();
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "pacientes",
          element: <Pacientes />,
        },
        {
          path: "consultas",
          element: <Consultas />,
        },
        {
          path: "exames",
          element: <Exames />,
        },
        {
          path: "financeiro",
          element: <Financeiro />,
        },
        {
          path: "configuracoes",
          element: <Configuracoes />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <AuthProvider>{routes}</AuthProvider>;
}

export default App;
