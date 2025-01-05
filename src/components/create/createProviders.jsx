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
import { Plus } from "lucide-react";
import { FormProvider } from "../form/formProvider";

export const CreateProviders = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const openModal = () => onOpen();

  return (
    <>
      {" "}
      <Button
        onPress={openModal}
        className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Nuevo Proveedor
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nuevo Proveeedor</ModalHeader>
              <ModalBody>
                <FormProvider btnprovider={"Crear"} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
