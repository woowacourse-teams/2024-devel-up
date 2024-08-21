import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return { isModalOpen, handleModalClose, handleModalOpen, handleToggleModal };
};

export default useModal;
