import { render, screen, fireEvent } from '@testing-library/react';
import { PurposeIdentityStep } from '../../../../components/onboarding/steps/PurposeIdentityStep';

// Mock the common components
jest.mock('../../../../components/common', () => ({
  InputField: ({ label, value, onChange, placeholder, required }: any) => (
    <div data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        data-testid={`input-field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  ),
  MultiLineListInput: ({ label, value, onChange, placeholder, required, maxItems }: any) => (
    <div data-testid={`multiline-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        data-testid={`multiline-field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <small>Max items: {maxItems}</small>
    </div>
  )
}));

describe('PurposeIdentityStep', () => {
  const mockFormData = {
    organizationOnboarding: {
      purpose: {
        whyStatement: '',
        originStory: '',
        coreBeliefs: '',
        practices: ''
      }
    }
  };

  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Check if all form fields are rendered
    expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    expect(screen.getByText("Share your organization's deeper purpose and values to attract like-minded candidates.")).toBeInTheDocument();
    
    // Check input fields
    expect(screen.getByTestId('input-why-statement')).toBeInTheDocument();
    expect(screen.getByTestId('input-origin-story')).toBeInTheDocument();
    
    // Check multiline input fields
    expect(screen.getByTestId('multiline-core-beliefs')).toBeInTheDocument();
    expect(screen.getByTestId('multiline-key-practices')).toBeInTheDocument();
  });

  it('displays correct field labels', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByText('Why Statement')).toBeInTheDocument();
    expect(screen.getByText('Origin Story')).toBeInTheDocument();
    expect(screen.getByText('Core Beliefs')).toBeInTheDocument();
    expect(screen.getByText('Key Practices')).toBeInTheDocument();
  });

  it('displays correct placeholders', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const whyStatementInput = screen.getByTestId('input-field-why-statement');
    const originStoryInput = screen.getByTestId('input-field-origin-story');
    const coreBeliefsInput = screen.getByTestId('multiline-field-core-beliefs');
    const practicesInput = screen.getByTestId('multiline-field-key-practices');

    expect(whyStatementInput).toHaveAttribute('placeholder', 'Why does your organization exist? What problem are you solving?');
    expect(originStoryInput).toHaveAttribute('placeholder', 'How did your organization come to be? What inspired you to start?');
    expect(coreBeliefsInput).toHaveAttribute('placeholder', 'Add a core belief (press Enter)');
    expect(practicesInput).toHaveAttribute('placeholder', 'Add a key practice (press Enter)');
  });

  it('calls updateFormData when why statement changes', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const whyStatementInput = screen.getByTestId('input-field-why-statement');
    fireEvent.change(whyStatementInput, { target: { value: 'To solve world hunger' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      purpose: { ...mockFormData.organizationOnboarding.purpose, whyStatement: 'To solve world hunger' }
    });
  });

  it('calls updateFormData when origin story changes', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const originStoryInput = screen.getByTestId('input-field-origin-story');
    fireEvent.change(originStoryInput, { target: { value: 'Started as a college project' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      purpose: { ...mockFormData.organizationOnboarding.purpose, originStory: 'Started as a college project' }
    });
  });

  it('calls updateFormData when core beliefs change', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const coreBeliefsInput = screen.getByTestId('multiline-field-core-beliefs');
    fireEvent.change(coreBeliefsInput, { target: { value: 'Innovation; Quality' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      purpose: { ...mockFormData.organizationOnboarding.purpose, coreBeliefs: 'Innovation; Quality' }
    });
  });

  it('calls updateFormData when key practices change', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const practicesInput = screen.getByTestId('multiline-field-key-practices');
    fireEvent.change(practicesInput, { target: { value: 'Customer first; Agile' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      purpose: { ...mockFormData.organizationOnboarding.purpose, practices: 'Customer first; Agile' }
    });
  });

  it('displays current form data values', () => {
    const formDataWithValues = {
      organizationOnboarding: {
        purpose: {
          whyStatement: 'To innovate and create',
          originStory: 'Founded in 2020',
          coreBeliefs: 'Innovation; Quality',
          practices: 'Customer first; Agile'
        }
      }
    };

    render(
      <PurposeIdentityStep
        formData={formDataWithValues}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByTestId('input-field-why-statement')).toHaveValue('To innovate and create');
    expect(screen.getByTestId('input-field-origin-story')).toHaveValue('Founded in 2020');
    expect(screen.getByTestId('multiline-field-core-beliefs')).toHaveValue('Innovation; Quality');
    expect(screen.getByTestId('multiline-field-key-practices')).toHaveValue('Customer first; Agile');
  });

  it('handles undefined form data gracefully', () => {
    const undefinedFormData = {
      organizationOnboarding: undefined
    };

    render(
      <PurposeIdentityStep
        formData={undefinedFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-why-statement')).toHaveValue('');
    expect(screen.getByTestId('input-field-origin-story')).toHaveValue('');
    expect(screen.getByTestId('multiline-field-core-beliefs')).toHaveValue('');
    expect(screen.getByTestId('multiline-field-key-practices')).toHaveValue('');
  });

  it('handles null form data gracefully', () => {
    const nullFormData = {
      organizationOnboarding: null
    };

    render(
      <PurposeIdentityStep
        formData={nullFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-why-statement')).toHaveValue('');
    expect(screen.getByTestId('input-field-origin-story')).toHaveValue('');
    expect(screen.getByTestId('multiline-field-core-beliefs')).toHaveValue('');
    expect(screen.getByTestId('multiline-field-key-practices')).toHaveValue('');
  });

  it('handles missing purpose object gracefully', () => {
    const incompleteFormData = {
      organizationOnboarding: {
        // Missing purpose object
      }
    };

    render(
      <PurposeIdentityStep
        formData={incompleteFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Purpose & Identity')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-why-statement')).toHaveValue('');
    expect(screen.getByTestId('input-field-origin-story')).toHaveValue('');
    expect(screen.getByTestId('multiline-field-core-beliefs')).toHaveValue('');
    expect(screen.getByTestId('multiline-field-key-practices')).toHaveValue('');
  });

  it('preserves existing purpose data when updating single field', () => {
    const formDataWithExistingValues = {
      organizationOnboarding: {
        purpose: {
          whyStatement: 'To innovate and create',
          originStory: 'Founded in 2020',
          coreBeliefs: 'Innovation; Quality',
          practices: 'Customer first; Agile'
        }
      }
    };

    render(
      <PurposeIdentityStep
        formData={formDataWithExistingValues}
        updateFormData={mockUpdateFormData}
      />
    );

    const whyStatementInput = screen.getByTestId('input-field-why-statement');
    fireEvent.change(whyStatementInput, { target: { value: 'To solve world problems' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      purpose: {
        whyStatement: 'To solve world problems',
        originStory: 'Founded in 2020',
        coreBeliefs: 'Innovation; Quality',
        practices: 'Customer first; Agile'
      }
    });
  });

  it('all required fields have required attribute', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByTestId('input-field-why-statement')).toHaveAttribute('required');
    expect(screen.getByTestId('input-field-origin-story')).toHaveAttribute('required');
    expect(screen.getByTestId('multiline-field-core-beliefs')).toHaveAttribute('required');
    expect(screen.getByTestId('multiline-field-key-practices')).toHaveAttribute('required');
  });

  it('shows max items for multiline inputs', () => {
    render(
      <PurposeIdentityStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Check that both multiline inputs show max items
    const maxItemsElements = screen.getAllByText('Max items: 10');
    expect(maxItemsElements).toHaveLength(2);
  });
});
