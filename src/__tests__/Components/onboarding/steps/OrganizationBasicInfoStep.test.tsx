import { render, screen, fireEvent } from '@testing-library/react';
import { OrganizationBasicInfoStep } from '../../../../components/onboarding/steps/OrganizationBasicInfoStep';

// Mock the common components
jest.mock('../../../../components/common', () => ({
  InputField: ({ label, value, onChange, placeholder, required, type }: any) => (
    <div data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      <input
        type={type || 'text'}
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

describe('OrganizationBasicInfoStep', () => {
  const mockFormData = {
    organizationOnboarding: {
      basicInfo: {
        name: '',
        industry: '',
        website: '',
        size: ''
      }
    }
  };

  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Check if all form fields are rendered
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText("Let's start with the fundamental details about your organization.")).toBeInTheDocument();
    
    // Check input fields
    expect(screen.getByTestId('input-organization-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-website')).toBeInTheDocument();
    
    // Check select fields
    expect(screen.getByTestId('select-industry')).toBeInTheDocument();
    expect(screen.getByTestId('select-company-size')).toBeInTheDocument();
  });

  it('displays correct industry options', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const industrySelect = screen.getByTestId('select-field-industry');
    const options = industrySelect.querySelectorAll('option');
    
    expect(options).toHaveLength(9); // Including placeholder
    expect(options[1]).toHaveValue('technology');
    expect(options[1]).toHaveTextContent('Technology');
    expect(options[2]).toHaveValue('healthcare');
    expect(options[2]).toHaveTextContent('Healthcare');
    expect(options[3]).toHaveValue('finance');
    expect(options[3]).toHaveTextContent('Finance');
    expect(options[4]).toHaveValue('education');
    expect(options[4]).toHaveTextContent('Education');
    expect(options[5]).toHaveValue('ecommerce');
    expect(options[5]).toHaveTextContent('E-commerce');
    expect(options[6]).toHaveValue('manufacturing');
    expect(options[6]).toHaveTextContent('Manufacturing');
    expect(options[7]).toHaveValue('consulting');
    expect(options[7]).toHaveTextContent('Consulting');
    expect(options[8]).toHaveValue('other');
    expect(options[8]).toHaveTextContent('Other');
  });

  it('displays correct company size options', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const sizeSelect = screen.getByTestId('select-field-company-size');
    const options = sizeSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(6); // Including placeholder
    expect(options[1]).toHaveValue('1-10');
    expect(options[1]).toHaveTextContent('1-10 employees');
    expect(options[2]).toHaveValue('11-50');
    expect(options[2]).toHaveTextContent('11-50 employees');
    expect(options[3]).toHaveValue('51-200');
    expect(options[3]).toHaveTextContent('51-200 employees');
    expect(options[4]).toHaveValue('201-1000');
    expect(options[4]).toHaveTextContent('201-1000 employees');
    expect(options[5]).toHaveValue('1000+');
    expect(options[5]).toHaveTextContent('1000+ employees');
  });

  it('calls updateFormData when organization name changes', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const nameInput = screen.getByTestId('input-field-organization-name');
    fireEvent.change(nameInput, { target: { value: 'TechCorp Solutions' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      basicInfo: {
        ...mockFormData.organizationOnboarding.basicInfo,
        name: 'TechCorp Solutions'
      }
    });
  });

  it('calls updateFormData when industry changes', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const industrySelect = screen.getByTestId('select-field-industry');
    fireEvent.change(industrySelect, { target: { value: 'technology' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      basicInfo: {
        ...mockFormData.organizationOnboarding.basicInfo,
        industry: 'technology'
      }
    });
  });

  it('calls updateFormData when website changes', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const websiteInput = screen.getByTestId('input-field-website');
    fireEvent.change(websiteInput, { target: { value: 'https://techcorp.com' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      basicInfo: {
        ...mockFormData.organizationOnboarding.basicInfo,
        website: 'https://techcorp.com'
      }
    });
  });

  it('calls updateFormData when company size changes', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const sizeSelect = screen.getByTestId('select-field-company-size');
    fireEvent.change(sizeSelect, { target: { value: '11-50' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      basicInfo: {
        ...mockFormData.organizationOnboarding.basicInfo,
        size: '11-50'
      }
    });
  });

  it('displays current form data values', () => {
    const formDataWithValues = {
      organizationOnboarding: {
        basicInfo: {
          name: 'TechCorp Solutions',
          industry: 'technology',
          website: 'https://techcorp.com',
          size: '11-50'
        }
      }
    };

    render(
      <OrganizationBasicInfoStep
        formData={formDataWithValues}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByTestId('input-field-organization-name')).toHaveValue('TechCorp Solutions');
    expect(screen.getByTestId('select-field-industry')).toHaveValue('technology');
    expect(screen.getByTestId('input-field-website')).toHaveValue('https://techcorp.com');
    expect(screen.getByTestId('select-field-company-size')).toHaveValue('11-50');
  });

  it('handles undefined form data gracefully', () => {
    const undefinedFormData = {
      organizationOnboarding: undefined
    };

    render(
      <OrganizationBasicInfoStep
        formData={undefinedFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
  });

  it('handles null form data gracefully', () => {
    const nullFormData = {
      organizationOnboarding: null
    };

    render(
      <OrganizationBasicInfoStep
        formData={nullFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
  });

  it('handles missing basicInfo object gracefully', () => {
    const incompleteFormData = {
      organizationOnboarding: {
        // Missing basicInfo object
      }
    };

    render(
      <OrganizationBasicInfoStep
        formData={incompleteFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
  });

  it('handles empty basicInfo object gracefully', () => {
    const emptyBasicInfoData = {
      organizationOnboarding: {
        basicInfo: {}
      }
    };

    render(
      <OrganizationBasicInfoStep
        formData={emptyBasicInfoData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
  });

  it('preserves existing basicInfo data when updating single field', () => {
    const formDataWithExistingValues = {
      organizationOnboarding: {
        basicInfo: {
          name: 'TechCorp Solutions',
          industry: 'technology',
          website: 'https://techcorp.com',
          size: '11-50'
        }
      }
    };

    render(
      <OrganizationBasicInfoStep
        formData={formDataWithExistingValues}
        updateFormData={mockUpdateFormData}
      />
    );

    const industrySelect = screen.getByTestId('select-field-industry');
    fireEvent.change(industrySelect, { target: { value: 'healthcare' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      basicInfo: {
        name: 'TechCorp Solutions',
        industry: 'healthcare',
        website: 'https://techcorp.com',
        size: '11-50'
      }
    });
  });

  it('website input has correct type attribute', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const websiteInput = screen.getByTestId('input-field-website');
    expect(websiteInput).toHaveAttribute('type', 'url');
  });

  it('all required fields have required attribute', () => {
    render(
      <OrganizationBasicInfoStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const nameInput = screen.getByTestId('input-field-organization-name');
    const industrySelect = screen.getByTestId('select-field-industry');
    const websiteInput = screen.getByTestId('input-field-website');
    const sizeSelect = screen.getByTestId('select-field-company-size');

    expect(nameInput).toHaveAttribute('required');
    expect(industrySelect).toHaveAttribute('required');
    expect(websiteInput).toHaveAttribute('required');
    expect(sizeSelect).toHaveAttribute('required');
  });
});
