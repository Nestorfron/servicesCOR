import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Truck, MapPin, Users } from "lucide-react";
import { Button, Card, Input, Chip } from "@nextui-org/react";
import useAuthCheck from "../hooks/useAuthCheck";
import { CreateProviders } from "../components/create/createProviders";
import { EditProvider } from "../components/edit/editProvider";

export const Providers = () => {
  const { store, actions } = useContext(Context);

  useAuthCheck();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const providers = store.providers;

  useEffect(() => {
    actions.fetchProviders();
  }, []);

  // Variants for animations
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
            Gestión de Proveedores
          </motion.h1>
          <CreateProviders />
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
              placeholder="Buscar proveedores..."
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

        {/* Providers Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)] overflow-y-auto pr-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {providers
              .filter((provider) =>
                provider.company_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((provider) => (
                <motion.div
                  key={provider.id}
                  variants={itemVariants}
                  layout
                  className="h-fit"
                >
                  <Card className="relative overflow-hidden p-6 backdrop-blur-sm bg-blue-800/10 border border-blue-500/20 shadow-xl">
                    {/* Status and Actions */}
                    <div className="flex justify-between items-start mb-2">
                      <Chip
                        className={`px-4 py-1 text-xs rounded-full ${
                          provider.is_active
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {provider.is_active ? "Activo" : "Inactivo"}
                      </Chip>
                      <EditProvider provider={provider} size="xs" />
                    </div>

                    {/* Provider Name */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3 mb-1">
                        {provider.company_name}
                      </h3>
                      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                    </div>

                    {/* Provider Information */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span>Zonas</span>
                        <p>
                          <MapPin className="inline-block mr-1 text-gray-400" />
                          {provider.zone}
                        </p>
                      </div>
                      <div>
                        <span>Ingenieros</span>
                        <p>
                          <Users className="inline-block mr-1 text-gray-400" />
                          {provider.engineers.length}
                        </p>
                      </div>
                      <div>
                        <span>Tickets Activos</span>
                        <p>
                          <Truck className="inline-block mr-1 text-gray-400" />
                          {provider.tickets.length}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
