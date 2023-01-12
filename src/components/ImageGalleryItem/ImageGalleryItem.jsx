import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageModal } from 'components/Modal/Modal';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallPic, tags, bigPic }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  // const openModal = () => {
  //   setIsOpenModal(true);
  //   console.log(isOpenModal);
  // };

  // const closeModal = () => {
  //   setIsOpenModal(false);
  //   console.log(isOpenModal);
  // };

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <Img src={smallPic} alt={tags} />
      </GalleryItem>
      {isOpenModal && (
        <ImageModal
          bigPic={bigPic}
          tags={tags}
          isOpen={isOpenModal}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallPic: PropTypes.string.isRequired,
  bigPic: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
