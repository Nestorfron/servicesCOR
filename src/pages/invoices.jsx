import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button, Card, Input, Badge } from "@nextui-org/react";


const invoices = [
  {
    id: "INV-001",
    ticketId: "TIC-001",
    client: "Empresa A",
    amount: 1500.0,
    status: "pending",
    dueDate: "2024-02-01",
  },
  {
    id: "INV-002",
    ticketId: "TIC-002",
    client: "Empresa B",
    amount: 2300.0,
    status: "paid",
    dueDate: "2024-01-15",
  },
  {
    id: "INV-003",
    ticketId: "TIC-003",
    client: "Empresa C",
    amount: 950.0,
    status: "overdue",
    dueDate: "2024-01-01",
  },
];

const statusConfig = {
  pending: { label: "Pendiente", class: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Pagada", class: "bg-green-100 text-green-800" },
  overdue: { label: "Vencida", class: "bg-red-100 text-red-800" },
};

export const Invoices = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Facturación</h1>
        <Button
          className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
          auto
        >
          <FileText className="mr-2 h-4 w-4" /> Generar Factura
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Buscar facturas..." fullWidth clearable />
        </div>
        <Button bordered auto>
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card shadow>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pagadas</p>
                <p className="text-2xl font-bold">$4,500.00</p>
              </div>
            </div>
          </div>
        </Card>

        <Card shadow>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold">$2,800.00</p>
              </div>
            </div>
          </div>
        </Card>

        <Card shadow>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Vencidas</p>
                <p className="text-2xl font-bold">$950.00</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-400px)] space-y-4">
        {invoices.map((invoice) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card shadow>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium">Factura #{invoice.id}</h3>
                      <p className="text-sm text-gray-500">Ticket: {invoice.ticketId}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[invoice.status].class}`}
                  >
                    {statusConfig[invoice.status].label}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-medium">{invoice.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monto</p>
                    <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de vencimiento</p>
                    <p className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                  </div>
                  <Button bordered auto size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};