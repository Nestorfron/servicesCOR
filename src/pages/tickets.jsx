import React, {useState, useContext} from "react";
import { Context } from "../store/appContext.jsx";
import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { Button, Card, Input, Badge } from "@nextui-org/react";
import { CreateTicket } from "../components/create/createTicket.jsx";


export const Tickets = () => {
  const {store, actions} = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (ticketId) => {
    await actions.deleteTicket(ticketId);
    actions.fetchTickets();
  }

  const filteredTickets = store.tickets.filter((ticket) => {
    const searchString = searchTerm.toLowerCase();
    return (
      ticket.description.toLowerCase().includes(searchString) ||
      ticket.customer_id.toLowerCase().includes(searchString) ||
      ticket.provider_id.toLowerCase().includes(searchString) ||
      ticket.engineer_id.toLowerCase().includes(searchString) ||
      ticket.branch_id.toLowerCase().includes(searchString)
    );
  });
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Tickets</h1>
       <CreateTicket />
      </div>

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

      <div className="h-[calc(100vh-250px)] overflow-y-auto space-y-4">
        {filteredTickets.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No se encontraron tickets
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
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
                        {ticket.description}
                      </h3>
                      <Badge color="primary">
                        {ticket.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardBody className="space-y-3 p-6">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">
                        {ticket.customer_id}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{ticket.provider_id}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{ticket.engineer_id}</span>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                      <BranchDetails branch={ticket.branch_id} />
                      <EditBranch branch={ticket.branch_id} />
                      <Button color="danger" size="sm" onPress={() => handleDelete(ticket.id)}>
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