import React from "react";
import {Navbar as Navbarui, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {theme, setTheme}= useTheme();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbarui className="bg-base-100 shadow-lg" color="foreground" position="static">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/">ServiceCOR</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem >
          <Link  to="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/tickets" aria-current="page">
            Nuevo Reporte
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/customers" aria-current="page">
            Clientes
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/providers" aria-current="page">
            Proveedores
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/engineers" aria-current="page">
            Ingenieros
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/branches" aria-current="page">
            Sucursales
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/invoices" aria-current="page">
            Facturas
          </Link>
        </NavbarItem>
        <NavbarItem>
        <div>
      
        <Button color="primary" onClick={() => setTheme("light")}>
          Light Mode
        </Button>
        <Button color="primary" onClick={() => setTheme("dark")}>
          Dark Mode
        </Button>
      </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" to="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              to="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbarui>
  );
}
