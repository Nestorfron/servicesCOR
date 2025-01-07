import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion } from "framer-motion";
import { Plus, Search, Filter, User, Phone, Mail, Edit, Building2, MapPin, Trash2 } from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Badge,
} from "@nextui-org/react";
import useAuthCheck from "../hooks/useAuthCheck";
import { CreateBranch } from "../components/create/createBranches";
import { EditBranch } from "../components/edit/editBranches";
import { BranchDetails } from "../components/details/branchDetails";

export const Branches = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (branchId) => {
    await actions.deleteBranch(branchId);
    actions.fetchBranches();
  }


  useEffect(() => {
    actions.fetchBranches();
    actions.fetchCustomers();
  }, []);

  const getCustomerName = (customer_id) => {
    const customer = store.customers.find((c) => c.id === customer_id);
    return customer ? customer.name : "Unknown Customer";
  };

  const filteredBranches = store.branches.filter((branch) => {
    const searchString = searchTerm.toLowerCase();
    return (
      branch.name.toLowerCase().includes(searchString) ||
      branch.address.toLowerCase().includes(searchString) ||
      branch.city.toLowerCase().includes(searchString) ||
      branch.state.toLowerCase().includes(searchString) ||
      getCustomerName(branch.customer_id).toLowerCase().includes(searchString)
    );
  });
  

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Sucursales</h1>
        <CreateBranch />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Buscar sucursales..." 
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
        {filteredBranches.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No se encontraron sucursales
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex items-center space-x-4 p-6">
                    <div className="p-2 bg-violet-100 rounded-full">
                      <Building2 className="h-6 w-6 text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium truncate">
                        {branch.name}
                      </h3>
                      <Badge color="primary">
                        {getCustomerName(branch.customer_id)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardBody className="space-y-3 p-6">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">
                        {branch.address}, {branch.city}, {branch.state}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{branch.phone_1}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{branch.email}</span>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                      <BranchDetails branch={branch} customerName={getCustomerName(branch.customer_id)} />
                      <EditBranch branch={branch} />
                      <Button color="danger" size="sm" onPress={() => handleDelete(branch.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

