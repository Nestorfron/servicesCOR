import React, { useState } from "react";
import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { Ticket, FileIcon, CreditCard, CheckCircle, Plus, Filter, Search, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardBody, CardFooter,Button, Input, Tabs, Tab } from "@nextui-org/react"


// Datos de ejemplo
const timeSeriesData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][i],
  tickets: Math.floor(Math.random() * 50) + 20,
  resueltos: Math.floor(Math.random() * 40) + 15,
}));

const statusData = [
  { name: "Abiertos", value: 40, color: "#3B82F6" },
  { name: "En Progreso", value: 30, color: "#EAB308" },
  { name: "Completados", value: 20, color: "#22C55E" },
  { name: "Pendiente Factura", value: 10, color: "#A855F7" },
  { name: "Pendiente Pago", value: 15, color: "#F97316" },
  { name: "Pagados", value: 25, color: "#059669" },
];

// Componente StatsCard
function StatsCard({ title, value, trend, icon: Icon, description }) {
  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              <div
                className={`flex items-center text-sm font-medium ${
                  trend > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend > 0 ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {trend > 0 ? "+" : ""}
                {trend}%
              </div>
            </div>
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardBody>
    </Card>
  );
}

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const analytics = {
    totalTickets: 80,
    pendingInvoiceTickets: 10,
    pendingPaymentTickets: 15,
    completedTickets: 20,
  };
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Panel de Control</h1>
            <p className="text-muted-foreground">Bienvenido de nuevo, aquí está el resumen de hoy.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => console.log("Crear nuevo ticket")}
              className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
            >
              <Plus className="mr-2 h-4 w-4" /> Nuevo Ticket
            </Button>
          </div>
        </div>
  
        {/* Cards de estadísticas */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Tickets"
            value={analytics.totalTickets}
            trend={+10}
            icon={Ticket}
            description="vs. período anterior"
          />
          <StatsCard
            title="Pendiente Facturación"
            value={analytics.pendingInvoiceTickets}
            trend={-5}
            icon={FileIcon}
            description="vs. período anterior"
          />
          <StatsCard
            title="Pendiente Pago"
            value={analytics.pendingPaymentTickets}
            trend={+2}
            icon={CreditCard}
            description="vs. período anterior"
          />
          <StatsCard
            title="Completados"
            value={analytics.completedTickets}
            trend={+15}
            icon={CheckCircle}
            description="vs. período anterior"
          />
        </div>
  
        {/* Gráfico de área */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Tendencia de Tickets</h3>
          </CardHeader>
          <CardBody>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="creados" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="tickets" stroke="#8B5CF6" fill="url(#creados)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
    );
};