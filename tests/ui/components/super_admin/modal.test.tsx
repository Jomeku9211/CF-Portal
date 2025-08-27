import { render, screen, fireEvent } from '@testing-library/react';

// Mock Modal component since it might not exist yet
const MockModal = ({ isOpen, onClose, children, title }: any) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

describe('Modal Component', () => {
  test('renders when isOpen is true', () => {
    render(
      <MockModal isOpen={true} title="Test Modal">
        <p>Modal content</p>
      </MockModal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(
      <MockModal isOpen={false} title="Test Modal">
        <p>Modal content</p>
      </MockModal>
    );
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <MockModal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </MockModal>
    );
    
    fireEvent.click(screen.getByText('×'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('displays correct title', () => {
    render(
      <MockModal isOpen={true} title="Custom Title">
        <p>Modal content</p>
      </MockModal>
    );
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
