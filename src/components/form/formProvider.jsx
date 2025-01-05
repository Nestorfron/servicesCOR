import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import {
  Button,
  Input,
  Switch,
} from "@nextui-org/react";

export const FormProvider = ({id, btnProvider, provider: initialProvider}) => {
  const {actions} = useContext(Context);
  const [provider, setProvider] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    password: "",
    phone_number: "",
    state: "",
    zone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    {id ? actions.updateProvider(id, provider) : actions.createProvider(provider)};
  };

  useEffect(() => {
    actions.fetchProviders();
    if (initialProvider) {
      setProvider(initialProvider.provider);
    }
  }, []);


  return (
    <>
      <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          value={provider.company_name}
          onChange={(e) => setProvider({ ...provider, company_name: e.target.value })}          
        />
        <Input
          label="Contacto"
          value={provider.contact_person}
          onChange={(e) => setProvider({ ...provider, contact_person: e.target.value })}
        />
        <Input
          label="Email"
          value={provider.email}
          onChange={(e) => setProvider({ ...provider, email: e.target.value })}
        />
        <Input
          label="Contraseña"
          type="password"
          value={provider.password}
          onChange={(e) => setProvider({ ...provider, password: e.target.value })}
        />
        <Input
          label="Teléfono"
          value={provider.phone_number}
          onChange={(e) => setProvider({ ...provider, phone_number: e.target.value })}
        />
        <Input
          label="Estado"
          value={provider.state}
          onChange={(e) => setProvider({ ...provider, state: e.target.value })}
        />
        <Input
          label="Zona"
          value={provider.zone}
          onChange={(e) => setProvider({ ...provider, zone: e.target.value })}
        />
        <Button type="submit" color="primary" className="mt-4">
          {btnProvider}
        </Button>
      </form>
    </>
  );
};
