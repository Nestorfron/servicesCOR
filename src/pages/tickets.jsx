import React from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { Button, Card, Input, Badge } from "@nextui-org/react";

const tickets = [
  {
    id: "1",
    clientId: "client1",
    branchId: "branch1",
    providerId: "provider1",
    engineerId: "engineer1",
    status: "open",
    priority: "high",
    description: "Network connectivity issues",
    activities: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    clientId: "client2",
    branchId: "branch2",
    providerId: "provider2",
    engineerId: "engineer2",
    status: "in_progress",
    priority: "medium",
    description: "Server maintenance required",
    activities: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];


export const Tickets = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Tickets</h1>
        <Button
          onPress={() => setIsCreateDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Ticket
        </Button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Buscar tickets..."
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

      {/* Lista de Tickets */}
      <div className="h-[calc(100vh-250px)] overflow-y-auto space-y-4">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-4 shadow-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge
                    className="px-3 py-1 rounded-full"
                  >
                    {ticket.status}
                  </Badge>
                  <div>
                    <h3 className="font-medium text-lg">
                      Ticket #{ticket.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {ticket.description}
                    </p>
                  </div>
                </div>
                <Button variant="bordered" size="sm" className="text-gray-600">
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