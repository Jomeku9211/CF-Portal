import { render, screen } from '@testing-library/react';
import RoleInfoCard from '../../../components/LandingPage/RoleInfoCard';

// Mock the image import
jest.mock('../../../assets/LandingPage/developer.png', () => 'mocked-developer-image.png');

describe('RoleInfoCard', () => {
  it('should render the component correctly', () => {
    render(<RoleInfoCard />);
    
    const component = screen.getByTestId('RoleInfocardId');
    expect(component).toBeInTheDocument();
  });

  it('should have the correct main div class', () => {
    render(<RoleInfoCard />);
    
    const mainDiv = screen.getByTestId('RoleInfocardId');
    expect(mainDiv).toHaveClass('Role_Main_Div');
  });

  it('should render the main heading', () => {
    render(<RoleInfoCard />);
    
    const heading = document.querySelector('.Heading');
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toContain("make it easier together");
  });

  it('should render all role titles', () => {
    render(<RoleInfoCard />);
    
    const cto = screen.getByText('CTO');
    const agencyOwner = screen.getByText('Agency Owner');
    const seniorDeveloper = screen.getByText('Senior Developer');
    
    expect(cto).toBeInTheDocument();
    expect(agencyOwner).toBeInTheDocument();
    expect(seniorDeveloper).toBeInTheDocument();
  });

  it('should render the role text content', () => {
    render(<RoleInfoCard />);
    
    const roleText = document.querySelector('.Role_Text');
    expect(roleText).toBeInTheDocument();
    expect(roleText?.textContent).toContain("struggling to find developers");
  });

  it('should render the lorem ipsum text', () => {
    render(<RoleInfoCard />);
    
    const loremText = screen.getByText(/It is a long established fact that a reader will be distracted/);
    expect(loremText).toBeInTheDocument();
  });

  it('should render the developer section text with spans', () => {
    render(<RoleInfoCard />);
    
    const developerText = document.querySelector('.Developer_Div_Text');
    expect(developerText).toBeInTheDocument();
    expect(developerText?.textContent).toContain("immense pressure to deliver software");
  });

  it('should render the developer image', () => {
    render(<RoleInfoCard />);
    
    const image = document.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mocked-developer-image.png');
  });

  it('should have the correct role div structure', () => {
    render(<RoleInfoCard />);
    
    const roleDiv = document.querySelector('.Role_Div');
    expect(roleDiv).toBeInTheDocument();
    
    const roleTitles = roleDiv?.querySelector('.role');
    const roleText = roleDiv?.querySelector('.Role_Text');
    
    expect(roleTitles).toBeInTheDocument();
    expect(roleText).toBeInTheDocument();
  });

  it('should have the correct developer div structure', () => {
    render(<RoleInfoCard />);
    
    const developerDiv = document.querySelector('.Developer_Div');
    expect(developerDiv).toBeInTheDocument();
    
    const developerText = developerDiv?.querySelector('.Developer_Div_Text');
    const developerImage = developerDiv?.querySelector('img');
    
    expect(developerText).toBeInTheDocument();
    expect(developerImage).toBeInTheDocument();
  });

  it('should render all text content with proper spans', () => {
    render(<RoleInfoCard />);
    
    // Check for specific span content
    const highCodeQuality = document.querySelector('span');
    expect(highCodeQuality).toHaveTextContent('high code quality standards without consuming too much time.');
    
    const allSpans = document.querySelectorAll('span');
    expect(allSpans.length).toBeGreaterThan(0);
  });

  it('should render without crashing', () => {
    expect(() => render(<RoleInfoCard />)).not.toThrow();
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<RoleInfoCard />);
    
    const firstRender = screen.getByTestId('RoleInfocardId');
    const firstStructure = firstRender.innerHTML;
    
    rerender(<RoleInfoCard />);
    
    const secondRender = screen.getByTestId('RoleInfocardId');
    const secondStructure = secondRender.innerHTML;
    
    expect(firstStructure).toBe(secondStructure);
  });

  it('should have all required CSS classes', () => {
    render(<RoleInfoCard />);
    
    const mainDiv = screen.getByTestId('RoleInfocardId');
    expect(mainDiv).toHaveClass('Role_Main_Div');
    
    const roleDiv = mainDiv.querySelector('.Role_Div');
    expect(roleDiv).toHaveClass('Role_Div');
    
    const developerDiv = mainDiv.querySelector('.Developer_Div');
    expect(developerDiv).toHaveClass('Developer_Div');
  });

  it('should render the complete role information section', () => {
    render(<RoleInfoCard />);
    
    const roleDiv = document.querySelector('.Role_Div');
    expect(roleDiv).toBeInTheDocument();
    
    const roleTitles = roleDiv?.querySelector('.role');
    expect(roleTitles).toBeInTheDocument();
    
    const roleText = roleDiv?.querySelector('.Role_Text');
    expect(roleText).toBeInTheDocument();
  });

  it('should render the complete developer information section', () => {
    render(<RoleInfoCard />);
    
    const developerDiv = document.querySelector('.Developer_Div');
    expect(developerDiv).toBeInTheDocument();
    
    const developerText = developerDiv?.querySelector('.Developer_Div_Text');
    expect(developerText).toBeInTheDocument();
    
    const developerImage = developerDiv?.querySelector('img');
    expect(developerImage).toBeInTheDocument();
  });
});
