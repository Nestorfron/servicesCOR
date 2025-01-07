import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Building2, MapPin, Phone, Mail } from "lucide-react";
import { Button, Card, CardHeader, CardBody, Input, Badge } from "@nextui-org/react";

const branches = [
  {
    id: 1,
    name: "Sucursal Centro",
    address: "Av. Principal 123",
    city: "Ciudad de México",
    zone: "Centro",
    phone: "+52 55 1234 5678",
    email: "centro@empresa.com",
    status: "active",
  },
  {
    id: 2,
    name: "Sucursal Norte",
    address: "Blvd. Industrial 456",
    city: "Monterrey",
    zone: "Norte",
    phone: "+52 81 8765 4321",
    email: "norte@empresa.com",
    status: "active",
  },
  {
    id: 3,
    name: "Sucursal Sur",
    address: "Calle Reforma 789",
    city: "Mérida",
    zone: "Sur",
    phone: "+52 99 9876 5432",
    email: "sur@empresa.com",
    status: "maintenance",
  },
];

export const Branches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Sucursales</h1>
        <Button
          color="gradient"
          startContent={<Plus className="h-4 w-4" />}
          className="bg-gradient-to-r from-violet-500 to-purple-500"
        >
          Nueva Sucursal
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar sucursales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="bordered" startContent={<Filter className="h-4 w-4" />}>
          Filtros
        </Button>
      </div>

      <div className="h-[calc(100vh-250px)] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader className="flex items-center space-x-4 p-6">
                  <div className="p-2 bg-violet-100 rounded-full">
                    <Building2 className="h-6 w-6 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium truncate">{branch.name}</p>
                    <Badge
                      color={branch.status === "active" ? "success" : "neutral"}
                    >
                      {branch.status === "active" ? "Activa" : "En Mantenimiento"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody className="space-y-3 p-6">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{branch.address}, {branch.city}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{branch.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{branch.email}</span>
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="bordered" size="sm">
                      Ver Detalles
                    </Button>
                    <Button variant="bordered" size="sm">
                      Editar
                    </Button>
                    <Button color="danger" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );};