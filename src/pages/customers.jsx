import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Button, Card, Input, Badge } from "@nextui-org/react";
import { CreateCustomers } from "../components/create/createCustomers";
import { EditCustomer } from "../components/edit/editCustomer";
import useAuthCheck from "../hooks/useAuthCheck";


export const Customers = () => {
  const {store, actions} = useContext(Context);

  useAuthCheck();
  
  const customers = store.customers;

  useEffect(() => {
    actions.fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <CreateCustomers />
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
        {customers.map((client, index) => (
          <motion.div
            key={client.id + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card key={client.id + index} className="p-4 shadow-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge
                    className={`px-3 py-1 rounded-full ${
                      client.is_active ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {client.is_active ? "Activo" : "Inactivo"}
                  </Badge>
                  <div>
                    <h3 className="font-medium text-lg">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.address}</p>
                    <p className="text-sm text-gray-500">{client.contact_person}</p>
                    <p className="text-sm text-gray-500">{client.phone_number}</p>
                    <p className="text-sm text-gray-400">{client.email}</p>
                  </div>
                </div>
                <EditCustomer customer={client} id={client.id} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

     
    </div>
  );
};