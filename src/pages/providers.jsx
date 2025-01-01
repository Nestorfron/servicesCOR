import React from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Truck, MapPin, Users } from "lucide-react";
import { Button, Card, CardHeader, CardBody, Input, Badge } from "@nextui-org/react";

const providers = [
    {
      id: 1,
      name: "TechServ Solutions",
      zones: ["Norte", "Centro"],
      engineers: 5,
      activeTickets: 3,
      status: "active",
    },
    {
      id: 2,
      name: "Network Pro Services",
      zones: ["Sur", "Este"],
      engineers: 8,
      activeTickets: 6,
      status: "active",
    },
    {
      id: 3,
      name: "Security Systems Inc",
      zones: ["Oeste", "Centro"],
      engineers: 4,
      activeTickets: 2,
      status: "inactive",
    },
  ];

export const Providers = () => {
    return (
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Gestión de Proveedores</h1>
            <Button
              color="gradient"
              startContent={<Plus className="h-4 w-4" />}
              className="bg-gradient-to-r from-violet-500 to-purple-500"
            >
              Nuevo Proveedor
            </Button>
          </div>
    
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar proveedores..."
                className="pl-10"
              />
            </div>
            <Button variant="bordered" startContent={<Filter className="h-4 w-4" />}>
              Filtros
            </Button>
          </div>
    
          <div className="h-[calc(100vh-250px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader className="flex items-center space-x-4 p-6">
                      <div className="p-2 bg-violet-100 rounded-full">
                        <Truck className="h-6 w-6 text-violet-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-medium truncate">{provider.name}</p>
                        <Badge
                          color={provider.status === "active" ? "success" : "neutral"}
                        >
                          {provider.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardBody className="space-y-3 p-6">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Zonas: {provider.zones.join(", ")}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Ingenieros: {provider.engineers}</span>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          Tickets Activos: {provider.activeTickets}
                        </span>
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
      );
};