import PropTypes from 'prop-types';
import Modal from 'react-modal';
// import { Overlay, ModalImg } from './Modal.styled';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1200',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // maxWidth: 'calc(100vw - 48px)',
    // maxHeight: 'calc(100vh - 24px)',
    margin: 'auto',
    maxWidth: '80vw',
    maxHeight: '80vh',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    overflow: 'hidden',
  },
};

Modal.setAppElement('#root');

export const ImageModal = ({ bigPic, tags, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeOnEscape={true}
      style={modalStyles}
    >
      <img src={bigPic} alt={tags} />
    </Modal>
  );
};

ImageModal.propTypes = {
  bigPic: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
