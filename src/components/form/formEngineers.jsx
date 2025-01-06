/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Button, Input } from "@nextui-org/react";

export const FormEngineer = ({ id, btnEngineer, engineer: initialEngineer, onClose }) => {
  const { actions } = useContext(Context);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [engineer, setEngineer] = useState({
    provider_id: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      actions.updateEngineer(id, engineer).then(() => {
        actions.fetchEngineers();
        onClose()
      });
    } else {
      actions.createEngineer(engineer).then(() => {
        actions.fetchEngineers();
        onClose()
      });
    }
   
  };

  useEffect(() => {
    actions.fetchProviders().then((data) => setProviders(data || []));

    if (initialEngineer) {
      setEngineer({
        provider_id: initialEngineer.provider_id || "",
        name: initialEngineer.name || "",
        email: initialEngineer.email || "",
        password: initialEngineer.password || "",
        phone_number: initialEngineer.phone_number || "",
      });
    }
  }, [initialEngineer]);

  return (
    <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}>
      {/* Dropdown for Providers */}
      <select
        value={selectedProvider}
        onChange={(e) => {
          setSelectedProvider(e.target.value);
          setEngineer({ ...engineer, provider_id: e.target.value }); // Update provider_id in engineer state
        }}
        className="mt-2"
      >
        <option value="" disabled>
          Seleccione un Proveedor
        </option>
        {providers.map((provider) => (
          <option key={provider.id} value={provider.id}>
            {provider.company_name}
          </option>
        ))}
      </select>

      {/* Input Fields */}
      <Input
        label="Nombre"
        value={engineer.name}
        onChange={(e) => setEngineer({ ...engineer, name: e.target.value })}
      />
      <Input
        label="Email"
        value={engineer.email}
        onChange={(e) => setEngineer({ ...engineer, email: e.target.value })}
      />
      <Input
        label="Password"
        value={engineer.password}
        type= "password"
        onChange={(e) => setEngineer({ ...engineer, password: e.target.value })}
      />
      <Input
        label="Teléfono"
        value={engineer.phone_number}
        onChange={(e) =>
          setEngineer({ ...engineer, phone_number: e.target.value })
        }
      />

      {/* Submit Button */}
      <Button type="submit" color="primary" className="mt-4">
        {btnEngineer}
      </Button>
    </form>
  );
};
