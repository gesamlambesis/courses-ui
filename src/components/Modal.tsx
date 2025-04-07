import styled from 'styled-components'

type ModalProps = {
  isOpen: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: #FFFFFF;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <CloseButton onClick={onClose}>×</CloseButton>
        )}

        {children}
      </ModalContainer>
    </Backdrop>
  )
}

export default Modal
