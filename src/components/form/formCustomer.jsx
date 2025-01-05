import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import {
  Button,
  Input,
  Switch,
} from "@nextui-org/react";

export const FormCustomer = ({id, btnCustomer, customer: initialCustomer}) => {
  const {actions} = useContext(Context);
  const [isSelected, setIsSelected] = React.useState(true);
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    contact_person: "",
    email: "",
    phone_number: "",
    is_active: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    {id ? actions.updateCustomer(id, customer) : actions.createCustomer(customer)};
  };

  useEffect(() => {
    actions.fetchCustomers();
    if (initialCustomer) {
      setCustomer(initialCustomer.customer);
      setIsSelected(initialCustomer.customer.is_active);
    }
  }, []);


  return (
    <>
      <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <Input
          label="Dirección"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        />
        <Input
          label="Contacto"
          value={customer.contact_person}
          onChange={(e) => setCustomer({ ...customer, contact_person: e.target.value })}
        />
        <Input
          label="Email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        />
        <Input
          label="Teléfono"
          value={customer.phone_number}
          onChange={(e) => setCustomer({ ...customer, phone_number: e.target.value })}
        />
        <Switch
          label="Activo"
          checked={customer.is_active}
          isSelected={customer.is_active}
          onChange={(e) => setCustomer({ ...customer, is_active: e.target.checked })}
        >Activo</Switch>
        <Button type="submit" color="primary" className="mt-4">
          {btnCustomer}
        </Button>
      </form>
    </>
  );
};
