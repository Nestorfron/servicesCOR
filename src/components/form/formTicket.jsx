import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Button, Input, Switch, Select, SelectItem } from "@nextui-org/react";

export const FormTicket = ({
  id,
  btnTicket,
  ticket: initialTicket,
  onClose,
}) => {
  const { store, actions } = useContext(Context);
  const [isSelected, setIsSelected] = React.useState(true);
  const [ticket, setTicket] = useState({
    customer_id: "",
    provider_id: "",
    engineer_id: "",
    branch_id: "",
    activity: "",
    status: "",
    created_at: "",
    updated_at: "",
    completed_at: "",
    return_process: false,
    billing_status: "",
    payment_status: "",
  });

  const handleSelect = (field) => (e) => {
    const value = e.target.value;
    console.log(`${field} seleccionado:`, value); // Muestra el campo y el valor seleccionado
    setTicket((prevTicket) => ({
      ...prevTicket,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting ticket:", ticket);
    {
      id ? actions.updateTicket(id, ticket) : actions.createTicket(ticket);
      console.log("Datos del ticket a enviar:", ticket);
    }
  };

  useEffect(() => {
    actions.fetchCustomers();
    actions.fetchProviders();
    actions.fetchEngineers();
    actions.fetchBranches();
    if (initialTicket) {
      setTicket(initialTicket.ticket);
      setIsSelected(initialTicket.ticket.is_active);
    }
  }, []);

  return (
    <>
      <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}>
        <Select
          label="Cliente"
          value={ticket.customer_id}
          onChange={handleSelect("customer_id")}
        >
          {store.customers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {customer.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Proveedor"
          value={ticket.provider_id}
          onChange={handleSelect("provider_id")}
        >
          {store.providers.map((provider) => (
            <SelectItem key={provider.id} value={provider.id}>
              {provider.company_name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Ingeniero"
          value={ticket.engineer_id}
          onChange={handleSelect("engineer_id")}
        >
          {store.engineers.map((engineer) => (
            <SelectItem key={engineer.id} value={engineer.id}>
              {engineer.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Sucursal"
          value={ticket.branch_id}
          onChange={handleSelect("branch_id")}
        >
          {store.branches.map((branch) => (
            <SelectItem key={branch.id} value={branch.id}>
              {branch.name}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="Actividad"
          
          value={ticket.activity}
          onChange={(e) => setTicket({ ...ticket, activity: e.target.value })}
          required
        />

        <Switch
          checked={ticket.status}
          onChange={(e) => setTicket({ ...ticket, status: e.target.checked })}
        >
          Estado
        </Switch>

        <Input
          label="Fecha de creación"
          type="date"
          value={ticket.created_at}
          onChange={(e) => setTicket({ ...ticket, created_at: e.target.value })}
        />
        <Input
          label="Fecha de actualización"
          type="date"
          value={ticket.updated_at}
          onChange={(e) => setTicket({ ...ticket, updated_at: e.target.value })}
        />
        <Input
          label="Fecha de finalización"
          type="date"
          value={ticket.completed_at}
          onChange={(e) =>
            setTicket({ ...ticket, completed_at: e.target.value })
          }
        />
        

        <Button type="submit" color="primary" className="mt-4">
          {btnTicket}
        </Button>
      </form>
    </>
  );
};
