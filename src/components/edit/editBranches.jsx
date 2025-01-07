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
import { FormBranch } from "../form/formBranches";

export const EditBranch = ({branch}) => {
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
                <FormBranch btnBranch={"Editar"} id={branch.id} branch={branch} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};