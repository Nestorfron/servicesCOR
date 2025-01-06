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
import { FormEngineer } from "../form/formEngineers";

export const CreateEngineers = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openModal = () => onOpen();

  return (
    <>
      <Button
        onPress={openModal}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Nuevo Ingeniero
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nuevo Ingeniero
              </ModalHeader>
              <ModalBody>
                <FormEngineer btnEngineer={"Crear"} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
