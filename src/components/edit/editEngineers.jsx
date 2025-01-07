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
import { FormEngineer } from "../form/formEngineers";

export const EditEngineer = ({engineer}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const openModal = () => onOpen();

  return (
    <>
       <Button
        onPress={openModal}
        variant="bordered" size="sm"
      >
        <Edit className="mr-2 h-4 w-4" /> 
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar Ingeniero</ModalHeader>
              <ModalBody>
                <FormEngineer btnEngineer={"Editar"} id={engineer.id} engineer={engineer} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};