import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar as Navbarui,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Sun, Moon, User, UserXIcon } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbarui
      className="bg-base-100 shadow-lg"
      color="foreground"
      position="static"
    >
      <NavbarContent>
        {jwt && <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />}
        <NavbarBrand>
          <Link to="/dashboard">ServiceCOR</Link>
        </NavbarBrand>
      </NavbarContent>
      {jwt && <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/dashboard">Inicio</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/tickets" aria-current="page">
            Reportes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/customers" aria-current="page">
            Clientes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/providers" aria-current="page">
            Proveedores
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/engineers" aria-current="page">
            Ingenieros
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/branches" aria-current="page">
            Sucursales
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/invoices" aria-current="page">
            Facturas
          </Link>
        </NavbarItem>
      </NavbarContent>}
      <NavbarContent justify="end">
      <NavbarItem>
          <div>
            {theme === "light" ? (
              <Moon className="h-6 w-6" onClick={() => setTheme("dark")} /> 
            ) : (
              <Sun className="h-6 w-6" onClick={() => setTheme("light")} />
            )}
          </div>
        </NavbarItem>
        {jwt && (
          <NavbarItem className="lg:flex">
            <Link to="/" onClick={logout}>
              <UserXIcon className="h-6 w-6" />
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
      {jwt && <>
        <NavbarMenuItem>
          <Link to="/dashboard">Inicio</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/tickets" aria-current="page">
            Reportes
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/customers" aria-current="page">
            Clientes
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/providers" aria-current="page">
            Proveedores
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/engineers" aria-current="page">
            Ingenieros
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/branches" aria-current="page">
            Sucursales
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/invoices" aria-current="page">
            Facturas
          </Link>
        </NavbarMenuItem>
      </>}
      </NavbarMenu>
    </Navbarui>
  );
}
