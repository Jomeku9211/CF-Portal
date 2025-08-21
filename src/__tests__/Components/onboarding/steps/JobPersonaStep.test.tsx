import { render, screen, fireEvent } from '@testing-library/react';
import { JobPersonaStep } from '../../../../components/onboarding/steps/JobPersonaStep';

// Mock the common components
jest.mock('../../../../components/common', () => ({
  InputField: ({ label, value, onChange, placeholder, required }: any) => (
    <div data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      <input
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
  ),
  MultiLineListInput: ({ label, value, onChange, placeholder, required, maxItems }: any) => (
    <div data-testid={`multiline-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      <textarea
        value={Array.isArray(value) ? value.join('\n') : ''}
        onChange={(e) => onChange(e.target.value.split('\n').filter(Boolean))}
        placeholder={placeholder}
        required={required}
        maxLength={maxItems}
        data-testid={`multiline-field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  )
}));

describe('JobPersonaStep', () => {
  const mockFormData = {
    jobPersona: {
      title: '',
      expectations: '',
      experienceLevel: '',
      workStyle: '',
      skills: [],
      criteria: ''
    }
  };

  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Check if all form fields are rendered
    expect(screen.getByText('Job Persona')).toBeInTheDocument();
    expect(screen.getByText("Define the ideal candidate profile for your role to help us find the perfect match.")).toBeInTheDocument();
    
    // Check input fields
    expect(screen.getByTestId('input-job-title')).toBeInTheDocument();
    expect(screen.getByTestId('input-role-expectations')).toBeInTheDocument();
    expect(screen.getByTestId('input-success-criteria')).toBeInTheDocument();
    
    // Check select fields
    expect(screen.getByTestId('select-experience-level')).toBeInTheDocument();
    expect(screen.getByTestId('select-work-style-preference')).toBeInTheDocument();
    
    // Check multiline input
    expect(screen.getByTestId('multiline-required-skills')).toBeInTheDocument();
  });

  it('displays correct experience level options', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const experienceSelect = screen.getByTestId('select-field-experience-level');
    const options = experienceSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(4); // Including placeholder
    expect(options[1]).toHaveValue('entry');
    expect(options[1]).toHaveTextContent('Entry Level (0-2 years)');
    expect(options[2]).toHaveValue('mid');
    expect(options[2]).toHaveTextContent('Mid Level (3-7 years)');
    expect(options[3]).toHaveValue('senior');
    expect(options[3]).toHaveTextContent('Senior Level (8+ years)');
  });

  it('displays correct work style options', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const workStyleSelect = screen.getByTestId('select-field-work-style-preference');
    const options = workStyleSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(5); // Including placeholder
    expect(options[1]).toHaveValue('collaborative');
    expect(options[1]).toHaveTextContent('Collaborative');
    expect(options[2]).toHaveValue('independent');
    expect(options[2]).toHaveTextContent('Independent');
    expect(options[3]).toHaveValue('leadership');
    expect(options[3]).toHaveTextContent('Leadership');
    expect(options[4]).toHaveValue('specialist');
    expect(options[4]).toHaveTextContent('Specialist');
  });

  it('calls updateFormData when job title changes', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const jobTitleInput = screen.getByTestId('input-field-job-title');
    fireEvent.change(jobTitleInput, { target: { value: 'Senior Developer' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('jobPersona', { title: 'Senior Developer' });
  });

  it('calls updateFormData when role expectations change', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const expectationsInput = screen.getByTestId('input-field-role-expectations');
    fireEvent.change(expectationsInput, { target: { value: 'Lead development team' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('jobPersona', { expectations: 'Lead development team' });
  });

  it('calls updateFormData when experience level changes', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const experienceSelect = screen.getByTestId('select-field-experience-level');
    fireEvent.change(experienceSelect, { target: { value: 'senior' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('jobPersona', { experienceLevel: 'senior' });
  });

  it('calls updateFormData when work style changes', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const workStyleSelect = screen.getByTestId('select-field-work-style-preference');
    fireEvent.change(workStyleSelect, { target: { value: 'leadership' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('jobPersona', { workStyle: 'leadership' });
  });

  it('calls updateFormData when skills change', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const skillsInput = screen.getByTestId('multiline-field-required-skills');
    fireEvent.change(skillsInput, { target: { value: 'React\nTypeScript\nNode.js' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('jobPersona', { skills: ['React', 'TypeScript', 'Node.js'] });
  });

  it('calls updateFormData when success criteria changes', () => {
    render(
      <JobPersonaStep
        formData={mockFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    const criteriaInput = screen.getByTestId('input-field-success-criteria');
    fireEvent.change(criteriaInput, { target: { value: 'Complete project on time' } });

    expect(mockUpdateFormData).toHaveBeenCalledWith('jobPersona', { criteria: 'Complete project on time' });
  });

  it('displays current form data values', () => {
    const formDataWithValues = {
      jobPersona: {
        title: 'Frontend Developer',
        expectations: 'Build user interfaces',
        experienceLevel: 'mid',
        workStyle: 'collaborative',
        skills: ['React', 'CSS'],
        criteria: 'Deliver on time'
      }
    };

    render(
      <JobPersonaStep
        formData={formDataWithValues}
        updateFormData={mockUpdateFormData}
      />
    );

    expect(screen.getByTestId('input-field-job-title')).toHaveValue('Frontend Developer');
    expect(screen.getByTestId('input-field-role-expectations')).toHaveValue('Build user interfaces');
    expect(screen.getByTestId('select-field-experience-level')).toHaveValue('mid');
    expect(screen.getByTestId('select-field-work-style-preference')).toHaveValue('collaborative');
    expect(screen.getByTestId('multiline-field-required-skills')).toHaveValue('React\nCSS');
    expect(screen.getByTestId('input-field-success-criteria')).toHaveValue('Deliver on time');
  });

  it('handles empty skills array correctly', () => {
    const formDataWithEmptySkills = {
      jobPersona: {
        ...mockFormData.jobPersona,
        skills: []
      }
    };

    render(
      <JobPersonaStep
        formData={formDataWithEmptySkills}
        updateFormData={mockUpdateFormData}
      />
    );

    const skillsInput = screen.getByTestId('multiline-field-required-skills');
    expect(skillsInput).toHaveValue('');
  });

  it('handles undefined form data gracefully', () => {
    const undefinedFormData = {
      jobPersona: undefined
    };

    render(
      <JobPersonaStep
        formData={undefinedFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Job Persona')).toBeInTheDocument();
  });

  it('handles null form data gracefully', () => {
    const nullFormData = {
      jobPersona: null
    };

    render(
      <JobPersonaStep
        formData={nullFormData}
        updateFormData={mockUpdateFormData}
      />
    );

    // Should not crash and should render with empty values
    expect(screen.getByText('Job Persona')).toBeInTheDocument();
  });
});
