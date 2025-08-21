import { render, screen, fireEvent } from '@testing-library/react';
import { OrganizationStep } from '../../../../components/onboarding/steps/OrganizationStep';

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
  SelectField: ({ label, options, value, onChange, placeholder, required }: any) => (
    <div data-testid={`select-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        data-testid={`select-field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}));

describe('OrganizationStep', () => {
  const mockFormData = {
    organization: {
      name: '',
      purpose: '',
      organizationType: '',
      teamSize: '',
      workingStyle: '',
      culture: ''
    }
  };

  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Check if all form fields are rendered
    expect(screen.getByText('Organization Profile')).toBeInTheDocument();
    expect(screen.getByText("Tell us about your organization to help candidates understand your culture and values.")).toBeInTheDocument();
    
    // Check input fields
    expect(screen.getByTestId('input-organization-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-organization-purpose')).toBeInTheDocument();
    
    // Check select fields
    expect(screen.getByTestId('select-organization-type')).toBeInTheDocument();
    expect(screen.getByTestId('select-team-size')).toBeInTheDocument();
    expect(screen.getByTestId('select-working-style')).toBeInTheDocument();
    expect(screen.getByTestId('select-company-culture')).toBeInTheDocument();
  });

  it('displays correct field labels', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByText('Organization Name')).toBeInTheDocument();
    expect(screen.getByText('Organization Purpose')).toBeInTheDocument();
    expect(screen.getByText('Organization Type')).toBeInTheDocument();
    expect(screen.getByText('Team Size')).toBeInTheDocument();
    expect(screen.getByText('Working Style')).toBeInTheDocument();
    expect(screen.getByText('Company Culture')).toBeInTheDocument();
  });

  it('displays correct placeholders', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const nameInput = screen.getByTestId('input-field-organization-name');
    const purposeInput = screen.getByTestId('input-field-organization-purpose');

    expect(nameInput).toHaveAttribute('placeholder', 'Enter your organization name');
    expect(purposeInput).toHaveAttribute('placeholder', "What is your organization's mission?");
  });

  it('displays correct select field placeholders as first option', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const typeSelect = screen.getByTestId('select-field-organization-type');
    const sizeSelect = screen.getByTestId('select-field-team-size');
    const styleSelect = screen.getByTestId('select-field-working-style');
    const cultureSelect = screen.getByTestId('select-field-company-culture');

    const typeOptions = typeSelect.querySelectorAll('option');
    const sizeOptions = sizeSelect.querySelectorAll('option');
    const styleOptions = styleSelect.querySelectorAll('option');
    const cultureOptions = cultureSelect.querySelectorAll('option');

    expect(typeOptions[0]).toHaveTextContent('Select organization type');
    expect(sizeOptions[0]).toHaveTextContent('Select team size');
    expect(styleOptions[0]).toHaveTextContent('Select working style');
    expect(cultureOptions[0]).toHaveTextContent('Select company culture');
  });

  it('displays correct organization type options', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const typeSelect = screen.getByTestId('select-field-organization-type');
    const options = typeSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(4); // Including placeholder
    expect(options[1]).toHaveValue('startup');
    expect(options[1]).toHaveTextContent('Startup (0-50 employees)');
    expect(options[2]).toHaveValue('scaleup');
    expect(options[2]).toHaveTextContent('Scaleup (50-500 employees)');
    expect(options[3]).toHaveValue('enterprise');
    expect(options[3]).toHaveTextContent('Enterprise (500+ employees)');
  });

  it('displays correct team size options', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const sizeSelect = screen.getByTestId('select-field-team-size');
    const options = sizeSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(5); // Including placeholder
    expect(options[1]).toHaveValue('1-10');
    expect(options[1]).toHaveTextContent('1-10 employees');
    expect(options[2]).toHaveValue('11-50');
    expect(options[2]).toHaveTextContent('11-50 employees');
    expect(options[3]).toHaveValue('51-200');
    expect(options[3]).toHaveTextContent('51-200 employees');
    expect(options[4]).toHaveValue('200+');
    expect(options[4]).toHaveTextContent('200+ employees');
  });

  it('displays correct working style options', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const styleSelect = screen.getByTestId('select-field-working-style');
    const options = styleSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(4); // Including placeholder
    expect(options[1]).toHaveValue('remote');
    expect(options[1]).toHaveTextContent('Remote-first');
    expect(options[2]).toHaveValue('hybrid');
    expect(options[2]).toHaveTextContent('Hybrid');
    expect(options[3]).toHaveValue('office');
    expect(options[3]).toHaveTextContent('Office-first');
  });

  it('displays correct company culture options', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const cultureSelect = screen.getByTestId('select-field-company-culture');
    const options = cultureSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(5); // Including placeholder
    expect(options[1]).toHaveValue('collaborative');
    expect(options[1]).toHaveTextContent('Collaborative');
    expect(options[2]).toHaveValue('autonomous');
    expect(options[2]).toHaveTextContent('Autonomous');
    expect(options[3]).toHaveValue('hierarchical');
    expect(options[3]).toHaveTextContent('Hierarchical');
    expect(options[4]).toHaveValue('flat');
    expect(options[4]).toHaveTextContent('Flat');
  });

  it('calls updateFormData when organization name changes', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const nameInput = screen.getByTestId('input-field-organization-name');
    fireEvent.change(nameInput, { target: { value: 'Acme Corp' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organization', { name: 'Acme Corp' });
  });

  it('calls updateFormData when organization purpose changes', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const purposeInput = screen.getByTestId('input-field-organization-purpose');
    fireEvent.change(purposeInput, { target: { value: 'To innovate and create' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organization', { purpose: 'To innovate and create' });
  });

  it('calls updateFormData when organization type changes', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const typeSelect = screen.getByTestId('select-field-organization-type');
    fireEvent.change(typeSelect, { target: { value: 'startup' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organization', { organizationType: 'startup' });
  });

  it('calls updateFormData when team size changes', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const sizeSelect = screen.getByTestId('select-field-team-size');
    fireEvent.change(sizeSelect, { target: { value: '11-50' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organization', { teamSize: '11-50' });
  });

  it('calls updateFormData when working style changes', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const styleSelect = screen.getByTestId('select-field-working-style');
    fireEvent.change(styleSelect, { target: { value: 'hybrid' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organization', { workingStyle: 'hybrid' });
  });

  it('calls updateFormData when company culture changes', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const cultureSelect = screen.getByTestId('select-field-company-culture');
    fireEvent.change(cultureSelect, { target: { value: 'collaborative' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organization', { culture: 'collaborative' });
  });

  it('displays current form data values', () => {
    const formDataWithValues = {
      organization: {
        name: 'Acme Corp',
        purpose: 'To innovate and create',
        organizationType: 'startup',
        teamSize: '11-50',
        workingStyle: 'hybrid',
        culture: 'collaborative'
      }
    };

    render(
      <OrganizationStep
        formData={formDataWithValues}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByTestId('input-field-organization-name')).toHaveValue('Acme Corp');
    expect(screen.getByTestId('input-field-organization-purpose')).toHaveValue('To innovate and create');
    expect(screen.getByTestId('select-field-organization-type')).toHaveValue('startup');
    expect(screen.getByTestId('select-field-team-size')).toHaveValue('11-50');
    expect(screen.getByTestId('select-field-working-style')).toHaveValue('hybrid');
    expect(screen.getByTestId('select-field-company-culture')).toHaveValue('collaborative');
  });

  it('handles undefined form data gracefully', () => {
    const undefinedFormData = {
      organization: undefined
    };

    render(
      <OrganizationStep
        formData={undefinedFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Organization Profile')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-organization-name')).toHaveValue('');
    expect(screen.getByTestId('input-field-organization-purpose')).toHaveValue('');
    expect(screen.getByTestId('select-field-organization-type')).toHaveValue('');
    expect(screen.getByTestId('select-field-team-size')).toHaveValue('');
    expect(screen.getByTestId('select-field-working-style')).toHaveValue('');
    expect(screen.getByTestId('select-field-company-culture')).toHaveValue('');
  });

  it('handles null form data gracefully', () => {
    const nullFormData = {
      organization: null
    };

    render(
      <OrganizationStep
        formData={nullFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Organization Profile')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-organization-name')).toHaveValue('');
    expect(screen.getByTestId('input-field-organization-purpose')).toHaveValue('');
    expect(screen.getByTestId('select-field-organization-type')).toHaveValue('');
    expect(screen.getByTestId('select-field-team-size')).toHaveValue('');
    expect(screen.getByTestId('select-field-working-style')).toHaveValue('');
    expect(screen.getByTestId('select-field-company-culture')).toHaveValue('');
  });

  it('handles missing organization object gracefully', () => {
    const incompleteFormData = {
      // Missing organization object
    };

    render(
      <OrganizationStep
        formData={incompleteFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Organization Profile')).toBeInTheDocument();
    expect(screen.getByTestId('input-field-organization-name')).toHaveValue('');
    expect(screen.getByTestId('input-field-organization-purpose')).toHaveValue('');
    expect(screen.getByTestId('select-field-organization-type')).toHaveValue('');
    expect(screen.getByTestId('select-field-team-size')).toHaveValue('');
    expect(screen.getByTestId('select-field-working-style')).toHaveValue('');
    expect(screen.getByTestId('select-field-company-culture')).toHaveValue('');
  });

  it('preserves existing organization data when updating single field', () => {
    const formDataWithExistingValues = {
      organization: {
        name: 'Acme Corp',
        purpose: 'To innovate and create',
        organizationType: 'startup',
        teamSize: '11-50',
        workingStyle: 'hybrid',
        culture: 'collaborative'
      }
    };

    render(
      <OrganizationStep
        formData={formDataWithExistingValues}
        updateFormData={mockUpdateFormData}
      />
    );

    const nameInput = screen.getByTestId('input-field-organization-name');
    fireEvent.change(nameInput, { target: { value: 'Acme Corporation' } });

    // The component should call updateFormData with the new name while preserving other fields
    expect(mockUpdateFormData).toHaveBeenCalledWith('organization', {
      name: 'Acme Corporation'
    });
  });

  it('all required fields have required attribute', () => {
    render(
      <OrganizationStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByTestId('input-field-organization-name')).toHaveAttribute('required');
    expect(screen.getByTestId('input-field-organization-purpose')).toHaveAttribute('required');
    expect(screen.getByTestId('select-field-organization-type')).toHaveAttribute('required');
    expect(screen.getByTestId('select-field-team-size')).toHaveAttribute('required');
    expect(screen.getByTestId('select-field-working-style')).toHaveAttribute('required');
    expect(screen.getByTestId('select-field-company-culture')).toHaveAttribute('required');
  });
});
