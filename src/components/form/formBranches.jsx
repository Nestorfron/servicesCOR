/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Button, Input } from "@nextui-org/react";

export const FormBranch = ({ id, btnBranch, branch: initialBranch, onClose }) => {
  const { actions } = useContext(Context);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [branch, setBranch] = useState({
    customer_id: "",
    name: "",
    Social_Registration: "",
    address: "",
    colony: "",
    postal_code: "",
    city: "",
    municipality: "",
    state: "",
    contact_1: "",
    phone_1: "",
    contact_2: "",
    phone_2: "",
    email: "",
    schredule: "",
  });

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      actions.updateBranch(id, branch).then(() => {
        actions.fetchBranches();
        onClose();
      });
    } else {
      actions.createBranch(branch).then(() => {
        actions.fetchBranches();
        onClose();
      });
    }
  };

  useEffect(() => {
    actions.fetchCustomers().then((data) => setCustomers(data || []));

    if (initialBranch) {
      setBranch({
        customer_id: initialBranch.customer_id || "",
        name: initialBranch.name || "",
        Social_Registration: initialBranch.Social_Registration || "",
        address: initialBranch.address || "",
        colony: initialBranch.colony || "",
        postal_code: initialBranch.postal_code || "",
        city: initialBranch.city || "",
        municipality: initialBranch.municipality || "",
        state: initialBranch.state || "",
        contact_1: initialBranch.contact_1 || "",
        phone_1: initialBranch.phone_1 || "",
        contact_2: initialBranch.contact_2 || "",
        phone_2: initialBranch.phone_2 || "",
        email: initialBranch.email || "",
        schredule: initialBranch.schredule || "",
      });
    }
  }, [initialBranch]);

  return (
    <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          {/* Left Column */}
          <select
            value={selectedCustomer}
            onChange={(e) => {
              setSelectedCustomer(e.target.value);
              setBranch({ ...branch, customer_id: e.target.value });
            }}
            className="mt-2 p-2 border rounded"
          >
            <option value="" disabled>
              Seleccione un Cliente
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <Input
            label="Nombre"
            value={branch.name}
            onChange={(e) => setBranch({ ...branch, name: e.target.value })}
          />
          <Input
            label="Registro Social"
            value={branch.Social_Registration}
            onChange={(e) => setBranch({ ...branch, Social_Registration: e.target.value })}
          />
          <Input
            label="Dirección"
            value={branch.address}
            onChange={(e) => setBranch({ ...branch, address: e.target.value })}
          />
          <Input
            label="Colonia"
            value={branch.colony}
            onChange={(e) => setBranch({ ...branch, colony: e.target.value })}
          />
          <Input
            label="Código Postal"
            value={branch.postal_code}
            onChange={(e) => setBranch({ ...branch, postal_code: e.target.value })}
          />
          <Input
            label="Ciudad"
            value={branch.city}
            onChange={(e) => setBranch({ ...branch, city: e.target.value })}
          />
          <Input
            label="Municipio"
            value={branch.municipality}
            onChange={(e) => setBranch({ ...branch, municipality: e.target.value })}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {/* Right Column */}
          <Input
            label="Estado"
            value={branch.state}
            onChange={(e) => setBranch({ ...branch, state: e.target.value })}
          />
          <Input
            label="Contacto 1"
            value={branch.contact_1}
            onChange={(e) => setBranch({ ...branch, contact_1: e.target.value })}
          />
          <Input
            label="Teléfono 1"
            value={branch.phone_1}
            onChange={(e) => setBranch({ ...branch, phone_1: e.target.value })}
          />
          <Input
            label="Contacto 2"
            value={branch.contact_2}
            onChange={(e) => setBranch({ ...branch, contact_2: e.target.value })}
          />
          <Input
            label="Teléfono 2"
            value={branch.phone_2}
            onChange={(e) => setBranch({ ...branch, phone_2: e.target.value })}
          />
          <Input
            label="Email"
            value={branch.email}
            onChange={(e) => setBranch({ ...branch, email: e.target.value })}
          />
          <Input
            label="Horario"
            value={branch.schredule}
            onChange={(e) => setBranch({ ...branch, schredule: e.target.value })}
          />
        </div>
      </div>
      {/* Submit Button */}
      <Button type="submit" color="primary" className="mt-4">
        {btnBranch}
      </Button>
    </form>
  );
};

