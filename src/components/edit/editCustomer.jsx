import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Edit } from "lucide-react";
import { FormCustomer } from "../form/formCustomer";

export const EditCustomer = (customer) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const openModal = () => onOpen();

  return (
    <>
      {" "}
      <Button
        onPress={openModal}
        className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
      >
        <Edit className="mr-2 h-4 w-4" /> 
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar Cliente</ModalHeader>
              <ModalBody>
                <FormCustomer btnCustomer={"Editar"} id={customer.id} customer={customer} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};