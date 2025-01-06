import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion } from "framer-motion";
import { Plus, Search, Filter, User, Phone, Mail, Edit, Building } from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Badge,
} from "@nextui-org/react";
import useAuthCheck from "../hooks/useAuthCheck";
import { CreateEngineers } from "../components/create/createEngineers";
import { EditEngineer } from "../components/edit/editEngineers";

export const Engineers = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    actions.fetchEngineers();
    actions.fetchProviders();
  }, []);

  const getProviderName = (provider_id) => {
    const provider = store.providers.find((p) => p.id === provider_id);
    return provider ? provider.company_name : "Unknown Provider";
  };

  const filteredEngineers = store.engineers.filter((engineer) => {
    const searchString = searchTerm.toLowerCase();
    return (
      engineer.name.toLowerCase().includes(searchString) ||
      engineer.email.toLowerCase().includes(searchString) ||
      engineer.phone_number.toLowerCase().includes(searchString) ||
      getProviderName(engineer.provider_id).toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Ingenieros</h1>
        <CreateEngineers />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Buscar ingenieros..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="bordered"
          startContent={<Filter className="h-4 w-4" />}
        >
          Filtros
        </Button>
      </div>

      <div className="h-[calc(100vh-250px)] overflow-y-auto">
        {filteredEngineers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No se encontraron ingenieros
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEngineers.map((engineer) => (
              <motion.div
                key={engineer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex items-center space-x-4 p-6">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium truncate">
                        {engineer.name}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody className="space-y-3 p-6">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">
                        {getProviderName(engineer.provider_id)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{engineer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{engineer.phone_number}</span>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                      <EditEngineer engineer={engineer} />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

