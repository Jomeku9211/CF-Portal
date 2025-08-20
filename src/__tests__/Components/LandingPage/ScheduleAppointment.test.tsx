import { render, screen, fireEvent } from '@testing-library/react';
import ScheduleAppointment from '../../../components/LandingPage/ScheduleAppointment';

describe('ScheduleAppointment', () => {
  it('should render the component correctly', () => {
    render(<ScheduleAppointment />);
    
    const section = document.querySelector('#book');
    expect(section).toBeInTheDocument();
  });

  it('should have the correct section class', () => {
    render(<ScheduleAppointment />);
    
    const section = document.querySelector('#book');
    expect(section).toHaveClass('schedule-section');
  });

  it('should render the meeting details section', () => {
    render(<ScheduleAppointment />);
    
    const meetingDetails = document.querySelector('.meeting-details');
    expect(meetingDetails).toBeInTheDocument();
  });

  it('should render the meeting title', () => {
    render(<ScheduleAppointment />);
    
    const meetingTitle = screen.getByText('15-Min Meeting');
    expect(meetingTitle).toBeInTheDocument();
    expect(meetingTitle).toHaveClass('meeting-title');
  });

  it('should render the privacy notice', () => {
    render(<ScheduleAppointment />);
    
    const privacyNotice = screen.getByText(/To protect your information/);
    expect(privacyNotice).toBeInTheDocument();
    expect(privacyNotice).toHaveClass('privacy-notice');
  });

  it('should render the schedule content section', () => {
    render(<ScheduleAppointment />);
    
    const scheduleContent = document.querySelector('.schedule-content');
    expect(scheduleContent).toBeInTheDocument();
  });

  it('should render the schedule header', () => {
    render(<ScheduleAppointment />);
    
    const scheduleLabel = screen.getByText('SCHEDULE AN APPOINTMENT');
    const scheduleTitle = screen.getByText('Grow you team with Top Developers');
    
    expect(scheduleLabel).toBeInTheDocument();
    expect(scheduleLabel).toHaveClass('schedule-label');
    expect(scheduleTitle).toBeInTheDocument();
    expect(scheduleTitle).toHaveClass('schedule-title');
  });

  it('should render the founder info section', () => {
    render(<ScheduleAppointment />);
    
    const founderInfo = document.querySelector('.founder-info');
    expect(founderInfo).toBeInTheDocument();
  });

  it('should render the founder avatar', () => {
    render(<ScheduleAppointment />);
    
    const founderAvatar = document.querySelector('.founder-avatar');
    expect(founderAvatar).toBeInTheDocument();
  });

  it('should render the founder image', () => {
    render(<ScheduleAppointment />);
    
    const image = screen.getByAltText('Abhilasha Khandare');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/abhilasha-avatar.jpg');
  });

  it('should render the avatar placeholder', () => {
    render(<ScheduleAppointment />);
    
    const placeholder = document.querySelector('.avatar-placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveTextContent('AK');
    expect(placeholder).toHaveStyle({ display: 'none' });
  });

  it('should render the founder details', () => {
    render(<ScheduleAppointment />);
    
    const founderDetails = document.querySelector('.founder-details');
    expect(founderDetails).toBeInTheDocument();
  });

  it('should render the founder name', () => {
    render(<ScheduleAppointment />);
    
    const founderName = screen.getByText('Abhilasha Khandare');
    expect(founderName).toBeInTheDocument();
    expect(founderName).toHaveClass('founder-name');
  });

  it('should render the founder role', () => {
    render(<ScheduleAppointment />);
    
    const founderRole = screen.getByText('COO, CO-FOUNDER');
    expect(founderRole).toBeInTheDocument();
    expect(founderRole).toHaveClass('founder-role');
  });

  it('should handle image error and show placeholder', () => {
    render(<ScheduleAppointment />);
    
    const image = screen.getByAltText('Abhilasha Khandare');
    const placeholder = document.querySelector('.avatar-placeholder');
    
    // Initially placeholder should be hidden
    expect(placeholder).toHaveStyle({ display: 'none' });
    
    // Simulate image error
    fireEvent.error(image);
    
    // After error, image should be hidden and placeholder should be visible
    expect(image).toHaveStyle({ display: 'none' });
    expect(placeholder).toHaveStyle({ display: 'block' });
  });

  it('should have the correct container structure', () => {
    render(<ScheduleAppointment />);
    
    const container = document.querySelector('.schedule-container');
    expect(container).toBeInTheDocument();
    
    const meetingDetails = container?.querySelector('.meeting-details');
    const scheduleContent = container?.querySelector('.schedule-content');
    
    expect(meetingDetails).toBeInTheDocument();
    expect(scheduleContent).toBeInTheDocument();
  });

  it('should have the correct meeting info structure', () => {
    render(<ScheduleAppointment />);
    
    const meetingInfo = document.querySelector('.meeting-info');
    expect(meetingInfo).toBeInTheDocument();
    
    const meetingTitle = meetingInfo?.querySelector('.meeting-title');
    const privacyNotice = meetingInfo?.querySelector('.privacy-notice');
    
    expect(meetingTitle).toBeInTheDocument();
    expect(privacyNotice).toBeInTheDocument();
  });

  it('should have the correct schedule header structure', () => {
    render(<ScheduleAppointment />);
    
    const scheduleHeader = document.querySelector('.schedule-header');
    expect(scheduleHeader).toBeInTheDocument();
    
    const scheduleLabel = scheduleHeader?.querySelector('.schedule-label');
    const scheduleTitle = scheduleHeader?.querySelector('.schedule-title');
    
    expect(scheduleLabel).toBeInTheDocument();
    expect(scheduleTitle).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    expect(() => render(<ScheduleAppointment />)).not.toThrow();
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<ScheduleAppointment />);
    
    const firstRender = document.querySelector('#book');
    const firstStructure = firstRender?.innerHTML;
    
    rerender(<ScheduleAppointment />);
    
    const secondRender = document.querySelector('#book');
    const secondStructure = secondRender?.innerHTML;
    
    expect(firstStructure).toBe(secondStructure);
  });

  it('should have all required CSS classes', () => {
    render(<ScheduleAppointment />);
    
    const section = document.querySelector('#book');
    expect(section).toHaveClass('schedule-section');
    
    const container = section?.querySelector('.schedule-container');
    expect(container).toHaveClass('schedule-container');
    
    const meetingDetails = container?.querySelector('.meeting-details');
    expect(meetingDetails).toHaveClass('meeting-details');
    
    const scheduleContent = container?.querySelector('.schedule-content');
    expect(scheduleContent).toHaveClass('schedule-content');
  });
});
