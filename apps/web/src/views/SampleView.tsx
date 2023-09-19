import React, { useState } from 'react';
import { RatingModal } from 'ui/rating/rating-modal/RatingModal';
import { Button } from '@mantine/core';

// NOTE: This view is for testing of component/views(frontend only tasks)
// When used, please remove imports and components inside main before merging active PR
export const SampleView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <main>
      <Button ml={40} onClick={handleOpenModal}>
        Rate Me
      </Button>
      <RatingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
};
