import '../../styles/LandingPage/ScheduleAppointment.css';

const ScheduleAppointment = () => {
  return (
    <section id="book" className="schedule-section">
      <div className="schedule-container">
        {/* Left side - Meeting Details */}
        <div className="meeting-details">
          <div className="meeting-info">
            <h3 className="meeting-title">15-Min Meeting</h3>
            <p className="privacy-notice">
              To protect your information, our booking process is encrypted, Please review our Privacy Policy. Procced with further by clicking "Confirm".
            </p>
          </div>
        </div>

        {/* Right side - Schedule Form */}
        <div className="schedule-content">
          <div className="schedule-header">
            <p className="schedule-label">SCHEDULE AN APPOINTMENT</p>
            <h2 className="schedule-title">Grow you team with Top Developers</h2>
          </div>
          
          <div className="founder-info">
            <div className="founder-avatar">
              <img 
                src="/images/abhilasha-avatar.jpg" 
                alt="Abhilasha Khandare"
                onError={(e) => {
                  const target = e.currentTarget;
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) {
                    target.style.display = 'none';
                    placeholder.style.display = 'block';
                  }
                }}
              />
              <div className="avatar-placeholder" style={{display: 'none'}}>
                <span>AK</span>
              </div>
            </div>
            <div className="founder-details">
              <h4 className="founder-name">Abhilasha Khandare</h4>
              <p className="founder-role">COO, CO-FOUNDER</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleAppointment;
