import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, Input, Badge, Avatar } from "@nextui-org/react";
import { Plus, Search, Filter } from "lucide-react";

const engineers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    specialization: "Redes",
    provider: "TechServ Solutions",
    availability: true,
  },
  {
    id: 2,
    name: "Ana García",
    email: "ana@example.com",
    specialization: "Servidores",
    provider: "Network Pro Services",
    availability: false,
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos@example.com",
    specialization: "Seguridad",
    provider: "Security Systems Inc",
    availability: true,
  },
];

export const Engineers = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Ingenieros</h1>
        <Button
          className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
          startContent={<Plus className="h-4 w-4" />}
        >
          Nuevo Ingeniero
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Buscar ingenieros..." />
        </div>
        <Button
          variant="flat"
          className="border border-gray-300 hover:bg-gray-100"
          startContent={<Filter className="h-4 w-4" />}
        >
          Filtros
        </Button>
      </div>

      <div className="h-[calc(100vh-250px)] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineers.map((engineer) => (
            <motion.div
              key={engineer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      className="h-12 w-12"
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${engineer.name}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {engineer.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {engineer.email}
                      </p>
                    </div>
                    <Badge
                      color={engineer.availability ? "success" : "default"}
                    >
                      {engineer.availability ? "Disponible" : "No Disponible"}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Especialización:
                      </span>
                      <span className="text-sm font-medium">
                        {engineer.specialization}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Proveedor:</span>
                      <span className="text-sm font-medium">
                        {engineer.provider}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="flat" size="sm">
                      Editar
                    </Button>
                    <Button color="danger" variant="flat" size="sm">
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
  );
};
