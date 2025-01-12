import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Button, Card, Input, Chip } from "@nextui-org/react";
import { CreateCustomers } from "../components/create/createCustomers";
import { EditCustomer } from "../components/edit/editCustomer";
import useAuthCheck from "../hooks/useAuthCheck";

export const Customers = () => {
  const { store, actions } = useContext(Context);

  useAuthCheck();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const customers = store.customers;

  useEffect(() => {
    actions.fetchCustomers();
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
            Gestión de Clientes
          </motion.h1>
          <CreateCustomers />
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
              className="backdrop-blur-xl "
              placeholder="Buscar clientes..."
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

        {/* Customers Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)] overflow-y-auto pr-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {customers
              .filter((client) =>
                client.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((client) => (
                <motion.div
                  key={client.id}
                  variants={itemVariants}
                  layout
                  className="h-fit"
                >
                  <Card className="relative overflow-hidden p-6 backdrop-blur-sm bg-blue-800/10 border border-blue-500/20 shadow-xl">
                    {/* Status and Actions */}
                    <div className="flex justify-between items-start mb-2">
                      <Chip
                        className={`px-4 py-1 text-xs rounded-full ${
                          client.is_active
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                               {client.is_active ? "Activo" : "Inactivo"}
                      </Chip>
               
                      <EditCustomer customer={client} size="xs" />
                    </div>

                    {/* Company Name */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3 mb-1 ">
                        {client.name}
                      </h3>
                      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4 text-sm ">
                      <div>
                        <span>Contacto</span>
                        <p>👤 {client.contact_person}</p>
                        Telefono
                        <p>📞 {client.phone_number}</p>
                      </div>
                      <div>
                        Email
                        <p>📧 {client.email}</p>
                        Dirección
                        <p>🏠 {client.address}</p>
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
