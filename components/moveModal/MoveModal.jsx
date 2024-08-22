import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Divider } from "@nextui-org/divider";

import Formatter from "@/app/utils/AmountFormatter"

import './styles.css';

export default function MoveModal({ isModalOpen, move, onClose }) {

    const [isOpen, setIsOpen] = useState(isModalOpen);

    const closeModal = () => {
        setIsOpen(false);
        onClose();
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES'); // Ajusta el local según sea necesario
    };

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{move.detail}</ModalHeader>
                            <div className="flex items-center justify-center bg-gray-100">
                                <div className="bg-white p-6 rounded-lg w-full">
                                    <div className="flex justify-between items-center">
                                        <div className="w-1/2 text-left">
                                            <p className="text-md">Fecha del movimiento:</p>
                                        </div>
                                        <div className="w-1/2 text-right">
                                            <p className="text-md">{formatDate(move.date)}</p>
                                        </div>
                                    </div>
                                    <Divider className="my-4" />
                                    <div className="flex justify-between items-center">
                                        <div className="w-1/2 text-left">
                                            <p className="text-md">Monto:</p>
                                        </div>
                                        <div className="w-1/2 text-right">
                                            <p className="text-md">{Formatter.format(move.amount)}</p>
                                        </div>
                                    </div>
                                    <Divider className="my-4" />
                                    <div className="flex justify-between items-center">
                                        <div className="w-1/2 text-left">
                                            <p className="text-md">Tipo de movimiento:</p>
                                        </div>
                                        <div className="w-1/2 text-right">
                                            <p className="text-md">{move.moveType}</p>
                                        </div>
                                    </div>
                                    <Divider className="my-4" />
                                    <div className="flex justify-between items-center">
                                        <div className="w-1/2 text-left">
                                            <p className="text-md">Medio de pago:</p>
                                        </div>
                                        <div className="w-1/2 text-right">
                                            <p className="text-md">{move.payMethod}</p>
                                        </div>
                                    </div>
                                    <Divider className="my-4" />
                                    <div className="flex justify-between items-center">
                                        <div className="w-1/2 text-left">
                                            <p className="text-md">Categoría:</p>
                                        </div>
                                        <div className="w-1/2 text-right">
                                            <p className="text-md">{move.category ? move.category.category : ''}</p>
                                        </div>
                                    </div>
                                    <Divider className="my-4" />
                                    {move.lastUpdateBy &&
                                        <div className="flex justify-between items-center">
                                            <div className="w-1/2 text-left">
                                                <p className="text-md">Ultima modificación por:</p>
                                            </div>
                                            <div className="w-1/2 text-right">
                                                <p className="text-md">{move.lastUpdateBy}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <ModalFooter>
                                <Button color="teal" className="bg-teal text-white" onPress={closeModal}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
