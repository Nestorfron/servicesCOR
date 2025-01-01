import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { Button, Card, Input, Badge } from "@nextui-org/react";

const customers = [
  {
    id: "1",
    name: "Empresa Alpha",
    contact: "John Doe",
    email: "contacto@alpha.com",
    status: "active",
  },
  {
    id: "2",
    name: "Empresa Beta",
    contact: "Jane Smith",
    email: "contacto@beta.com",
    status: "inactive",
  },
];

export const Customers = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <Button
          onPress={() => setIsCreateDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Buscar clientes..."
            radius="lg"
            size="lg"
          />
        </div>
        <Button
          variant="bordered"
          className="flex items-center border-gray-300 text-gray-600 hover:border-gray-400"
        >
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      <div className="h-[calc(100vh-250px)] overflow-y-auto space-y-4">
        {customers.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-4 shadow-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge
                    className={`px-3 py-1 rounded-full ${
                      client.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {client.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                  <div>
                    <h3 className="font-medium text-lg">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.contact}</p>
                    <p className="text-sm text-gray-400">{client.email}</p>
                  </div>
                </div>
                <Button
                  variant="bordered"
                  size="sm"
                  className="text-gray-600"
                >
                  Ver Detalles
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

     
    </div>
  );
};