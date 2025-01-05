import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Truck, MapPin, Users, Edit } from "lucide-react";
import { Button, Card, CardHeader, CardBody, Input, Badge } from "@nextui-org/react";
import useAuthCheck from "../hooks/useAuthCheck";
import { CreateProviders } from "../components/create/createProviders";
import { EditProvider } from "../components/edit/editProvider";


export const Providers = () => {
  const {store, actions} = useContext(Context);

  useAuthCheck();
  
  const providers = store.providers;

  useEffect(() => {
    actions.fetchProviders();
  }, []);

  return (
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Gestión de Proveedores</h1>
            <CreateProviders />
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
                        <p className="text-lg font-medium truncate">{provider.company_name}</p>
                        <Badge
                          color={provider.is_active === true ? "success" : "neutral"}
                        >
                          {provider.is_active === true ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardBody className="space-y-3 p-6">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Zonas: {provider.zone}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">Ingenieros: {provider.engineers.length}</span>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          Tickets Activos: {provider.tickets.length}
                        </span>
                      </div>
                      <div className="mt-6 flex justify-end space-x-2">
                       <EditProvider provider={provider} id={provider.id} />
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