import { render, screen, fireEvent } from '@testing-library/react';
import { FinancialSnapshotStep } from '../../../../components/onboarding/steps/FinancialSnapshotStep';

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

describe('FinancialSnapshotStep', () => {
  const mockFormData = {
    organizationOnboarding: {
      financials: {
        fundingStatus: '',
        investors: '',
        revenueStatus: '',
        profitabilityStatus: ''
      }
    }
  };

  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Check if all form fields are rendered
    expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
    expect(screen.getByText("Help candidates understand your organization's financial position and growth stage.")).toBeInTheDocument();
    
    // Check select fields
    expect(screen.getByTestId('select-funding-status')).toBeInTheDocument();
    expect(screen.getByTestId('select-revenue-status')).toBeInTheDocument();
    expect(screen.getByTestId('select-profitability-status')).toBeInTheDocument();
    
    // Check input field
    expect(screen.getByTestId('input-key-investors-if-applicable')).toBeInTheDocument();
  });

  it('displays correct funding status options', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const fundingSelect = screen.getByTestId('select-field-funding-status');
    const options = fundingSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(8); // Including placeholder
    expect(options[1]).toHaveValue('bootstrapped');
    expect(options[1]).toHaveTextContent('Bootstrapped');
    expect(options[2]).toHaveValue('seed');
    expect(options[2]).toHaveTextContent('Seed Stage');
    expect(options[3]).toHaveValue('series-a');
    expect(options[3]).toHaveTextContent('Series A');
    expect(options[4]).toHaveValue('series-b');
    expect(options[4]).toHaveTextContent('Series B');
    expect(options[5]).toHaveValue('series-c');
    expect(options[5]).toHaveTextContent('Series C+');
    expect(options[6]).toHaveValue('public');
    expect(options[6]).toHaveTextContent('Public Company');
    expect(options[7]).toHaveValue('profitable');
    expect(options[7]).toHaveTextContent('Profitable');
  });

  it('displays correct revenue status options', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const revenueSelect = screen.getByTestId('select-field-revenue-status');
    const options = revenueSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(6); // Including placeholder
    expect(options[1]).toHaveValue('pre-revenue');
    expect(options[1]).toHaveTextContent('Pre-revenue');
    expect(options[2]).toHaveValue('early-revenue');
    expect(options[2]).toHaveTextContent('Early Revenue');
    expect(options[3]).toHaveValue('growing');
    expect(options[3]).toHaveTextContent('Growing Revenue');
    expect(options[4]).toHaveValue('established');
    expect(options[4]).toHaveTextContent('Established Revenue');
    expect(options[5]).toHaveValue('scaled');
    expect(options[5]).toHaveTextContent('Scaled Revenue');
  });

  it('displays correct profitability options', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const profitabilitySelect = screen.getByTestId('select-field-profitability-status');
    const options = profitabilitySelect.querySelectorAll('option');
    
    expect(options).toHaveLength(5); // Including placeholder
    expect(options[1]).toHaveValue('not-profitable');
    expect(options[1]).toHaveTextContent('Not Profitable');
    expect(options[2]).toHaveValue('breakeven');
    expect(options[2]).toHaveTextContent('Breakeven');
    expect(options[3]).toHaveValue('profitable');
    expect(options[3]).toHaveTextContent('Profitable');
    expect(options[4]).toHaveValue('highly-profitable');
    expect(options[4]).toHaveTextContent('Highly Profitable');
  });

  it('calls updateFormData when funding status changes', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const fundingSelect = screen.getByTestId('select-field-funding-status');
    fireEvent.change(fundingSelect, { target: { value: 'series-a' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      financials: {
        ...mockFormData.organizationOnboarding.financials,
        fundingStatus: 'series-a'
      }
    });
  });

  it('calls updateFormData when investors change', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const investorsInput = screen.getByTestId('input-field-key-investors-if-applicable');
    fireEvent.change(investorsInput, { target: { value: 'Y Combinator, Sequoia Capital' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      financials: {
        ...mockFormData.organizationOnboarding.financials,
        investors: 'Y Combinator, Sequoia Capital'
      }
    });
  });

  it('calls updateFormData when revenue status changes', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const revenueSelect = screen.getByTestId('select-field-revenue-status');
    fireEvent.change(revenueSelect, { target: { value: 'growing' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      financials: {
        ...mockFormData.organizationOnboarding.financials,
        revenueStatus: 'growing'
      }
    });
  });

  it('calls updateFormData when profitability status changes', () => {
    render(
      <FinancialSnapshotStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const profitabilitySelect = screen.getByTestId('select-field-profitability-status');
    fireEvent.change(profitabilitySelect, { target: { value: 'profitable' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      financials: {
        ...mockFormData.organizationOnboarding.financials,
        profitabilityStatus: 'profitable'
      }
    });
  });

  it('displays current form data values', () => {
    const formDataWithValues = {
      organizationOnboarding: {
        financials: {
          fundingStatus: 'series-a',
          investors: 'Y Combinator',
          revenueStatus: 'growing',
          profitabilityStatus: 'profitable'
        }
      }
    };

    render(
      <FinancialSnapshotStep
        formData={formDataWithValues}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByTestId('select-field-funding-status')).toHaveValue('series-a');
    expect(screen.getByTestId('input-field-key-investors-if-applicable')).toHaveValue('Y Combinator');
    expect(screen.getByTestId('select-field-revenue-status')).toHaveValue('growing');
    expect(screen.getByTestId('select-field-profitability-status')).toHaveValue('profitable');
  });

      it('handles undefined form data gracefully', () => {
      const undefinedFormData = {
        organizationOnboarding: undefined
      };

      render(
        <FinancialSnapshotStep
          formData={undefinedFormData}
          updateFormData={mockUpdateFormData}
        />
      );

      // Should not crash and should render with empty values
      expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
    });

  it('handles null form data gracefully', () => {
    const nullFormData = {
      organizationOnboarding: null
    };

    render(
      <FinancialSnapshotStep
        formData={nullFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
  });

  it('handles missing financials object gracefully', () => {
    const incompleteFormData = {
      organizationOnboarding: {
        // Missing financials object
      }
    };

    render(
      <FinancialSnapshotStep
        formData={incompleteFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
  });

  it('handles empty financials object gracefully', () => {
    const emptyFinancialsData = {
      organizationOnboarding: {
        financials: {}
      }
    };

    render(
      <FinancialSnapshotStep
        formData={emptyFinancialsData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Financial Snapshot')).toBeInTheDocument();
  });

  it('preserves existing financial data when updating single field', () => {
    const formDataWithExistingValues = {
      organizationOnboarding: {
        financials: {
          fundingStatus: 'bootstrapped',
          investors: 'Self-funded',
          revenueStatus: 'pre-revenue',
          profitabilityStatus: 'not-profitable'
        }
      }
    };

    render(
      <FinancialSnapshotStep
        formData={formDataWithExistingValues}
        updateFormData={mockUpdateFormData}
      />
    );

    const fundingSelect = screen.getByTestId('select-field-funding-status');
    fireEvent.change(fundingSelect, { target: { value: 'seed' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('organizationOnboarding', {
      financials: {
        fundingStatus: 'seed',
        investors: 'Self-funded',
        revenueStatus: 'pre-revenue',
        profitabilityStatus: 'not-profitable'
      }
    });
  });
});
