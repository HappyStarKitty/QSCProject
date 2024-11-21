// useModal hook
import React, {createContext, useContext, useState, ReactNode} from "react";


interface ModalData {
  component: React.FC<any>;
  props: any;
}

interface ModalContextType {
  isOpen: boolean;
  modalData: ModalData | null;
  openModal: (component: React.FC<any>, props: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (component: React.FC<any>, props:any) => {
    setIsOpen(true);
    setModalData({component, props});
  }
  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalData, openModal, closeModal }}>
      {children}
      {
        isOpen && modalData && (
          <modalData.component {...modalData.props} />
        )
      }
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}