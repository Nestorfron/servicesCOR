import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, User, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import { Button, Card, Input, Chip } from "@nextui-org/react";
import useAuthCheck from "../hooks/useAuthCheck";
import { CreateEngineers } from "../components/create/createEngineers";
import { EditEngineer } from "../components/edit/editEngineers";

export const Engineers = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const engineers = store.engineers;

  useAuthCheck();

  useEffect(() => {
    actions.fetchEngineers();
    actions.fetchProviders();
  }, []);

  // Función para obtener el nombre del proveedor
  const getProviderName = (providerId) => {
    const provider = store.providers.find((provider) => provider.id === providerId);
    return provider ? provider.name : 'Proveedor no encontrado';
  };

  // Filtros y búsqueda
  const filteredEngineers = engineers.filter((engineer) => {
    const searchString = searchTerm.toLowerCase();
    return (
      engineer.name.toLowerCase().includes(searchString) ||
      engineer.email.toLowerCase().includes(searchString) ||
      engineer.phone_number.toLowerCase().includes(searchString)
    );
  });

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Función para eliminar ingeniero
  const handleDelete = async (engineerId) => {
    await actions.deleteEngineer(engineerId);
    actions.fetchEngineers();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Gestión de Ingenieros
          </motion.h1>
          <CreateEngineers />
        </div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="backdrop-blur-xl"
              placeholder="Buscar ingenieros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="bordered"
            className="backdrop-blur-xl"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
        </motion.div>

        {/* Engineers Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)] overflow-y-auto pr-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredEngineers.length === 0 ? (
              <p className="text-center text-gray-500 text-lg mt-10">
                No se encontraron ingenieros
              </p>
            ) : (
              filteredEngineers.map((engineer) => (
                <motion.div
                  key={engineer.id}
                  variants={itemVariants}
                  layout
                  className="h-fit"
                >
                  <Card className="relative overflow-hidden p-6 backdrop-blur-sm bg-blue-800/10 border border-blue-500/20 shadow-xl">
                    {/* Status and Actions */}
                    <div className="flex justify-between items-start mb-2">
                      <Chip
                        className={`px-4 py-1 text-xs rounded-full ${engineer.is_active ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                      >
                        {engineer.is_active ? "Activo" : "Inactivo"}
                      </Chip>

                      <EditEngineer engineer={engineer} size="xs" />
                    </div>

                    {/* Engineer's Name */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3 mb-1 ">
                        {engineer.name}
                      </h3>
                      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span>Contacto</span>
                        <p>👤 {engineer.contact_person}</p>
                        <p>📞 {engineer.phone_number}</p>
                      </div>
                      <div>
                        <span>Email</span>
                        <p>📧 {engineer.email}</p>
                        <p>🏢 {getProviderName(engineer.provider_id)}</p>
                      </div>
                    </div>

                    {/* Delete Engineer */}
                    <div className="mt-6 flex justify-end">
                      <Button
                        color="danger"
                        size="sm"
                        onPress={() => handleDelete(engineer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
