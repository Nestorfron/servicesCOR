import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export const BranchDetails = ({ branch, customerName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button variant="bordered" size="sm" onPress={handleOpen}>
        Detalles
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Detalles de la Sucursal</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Nombre:</h3>
                <p>{branch.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Cliente:</h3>
                <p>{customerName}</p>
              </div>
              <div>
                <h3 className="font-semibold">Registro Social:</h3>
                <p>{branch.Social_Registration || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Dirección:</h3>
                <p>{branch.address}</p>
              </div>
              <div>
                <h3 className="font-semibold">Colonia:</h3>
                <p>{branch.colony}</p>
              </div>
              <div>
                <h3 className="font-semibold">Código Postal:</h3>
                <p>{branch.postal_code}</p>
              </div>
              <div>
                <h3 className="font-semibold">Ciudad:</h3>
                <p>{branch.city}</p>
              </div>
              <div>
                <h3 className="font-semibold">Municipio:</h3>
                <p>{branch.municipality}</p>
              </div>
              <div>
                <h3 className="font-semibold">Estado:</h3>
                <p>{branch.state}</p>
              </div>
              <div>
                <h3 className="font-semibold">Contacto 1:</h3>
                <p>{branch.contact_1}</p>
              </div>
              <div>
                <h3 className="font-semibold">Teléfono 1:</h3>
                <p>{branch.phone_1}</p>
              </div>
              <div>
                <h3 className="font-semibold">Contacto 2:</h3>
                <p>{branch.contact_2 || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Teléfono 2:</h3>
                <p>{branch.phone_2 || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email:</h3>
                <p>{branch.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Horario:</h3>
                <p>{branch.schredule || "N/A"}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

