import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle } from 'lucide-react';
export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  // Mock available dates and slots
  const availableDates = ['2023-11-15', '2023-11-16', '2023-11-18', '2023-11-22', '2023-11-23'];
  const timeSlots = {
    '2023-11-15': [{
      id: '1',
      time: '10:00 AM - 11:30 AM',
      participants: 2,
      max: 4
    }, {
      id: '2',
      time: '2:00 PM - 3:30 PM',
      participants: 1,
      max: 4
    }],
    '2023-11-16': [{
      id: '3',
      time: '11:00 AM - 12:30 PM',
      participants: 3,
      max: 4
    }],
    '2023-11-18': [{
      id: '4',
      time: '9:00 AM - 10:30 AM',
      participants: 0,
      max: 4
    }, {
      id: '5',
      time: '1:00 PM - 2:30 PM',
      participants: 2,
      max: 4
    }],
    '2023-11-22': [{
      id: '6',
      time: '10:00 AM - 11:30 AM',
      participants: 1,
      max: 4
    }],
    '2023-11-23': [{
      id: '7',
      time: '3:00 PM - 4:30 PM',
      participants: 2,
      max: 4
    }]
  };
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  // Handle booking confirmation
  const handleBookSlot = () => {
    if (selectedDate && selectedSlot) {
      alert(`Booking confirmed for ${formatDate(selectedDate)} at ${timeSlots[selectedDate].find(slot => slot.id === selectedSlot)?.time}`);
      // Reset selections after booking
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  };
  return <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            1. Select a Date
          </h2>
          <div className="space-y-3">
            {availableDates.map(date => <button key={date} onClick={() => {
            setSelectedDate(date);
            setSelectedSlot(null);
          }} className={`w-full flex items-center p-4 border rounded-lg transition-colors ${selectedDate === date ? 'border-sanjuan-base bg-sanjuan-lightest' : 'border-sanjuan-lighter hover:border-sanjuan-light'}`}>
                <CalendarIcon className="h-5 w-5 text-sanjuan-base mr-3" />
                <span className="text-sanjuan-dark">{formatDate(date)}</span>
              </button>)}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            2. Select a Time Slot
          </h2>
          {selectedDate ? <div className="space-y-3">
              {timeSlots[selectedDate].map(slot => <button key={slot.id} onClick={() => setSelectedSlot(slot.id)} className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${selectedSlot === slot.id ? 'border-sanjuan-base bg-sanjuan-lightest' : 'border-sanjuan-lighter hover:border-sanjuan-light'}`}>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-sanjuan-base mr-3" />
                    <span className="text-sanjuan-dark">{slot.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-sanjuan-base">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      {slot.participants}/{slot.max} Guests
                    </span>
                  </div>
                </button>)}
            </div> : <div className="p-8 border-2 border-dashed border-sanjuan-lighter rounded-lg text-center">
              <p className="text-sanjuan-base">Please select a date first</p>
            </div>}
        </div>
      </div>
      {selectedDate && selectedSlot && <div className="bg-sanjuan-lightest p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            3. Confirm Your Booking
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sanjuan-dark font-medium">
                {formatDate(selectedDate)}
              </p>
              <p className="text-sanjuan-base">
                {timeSlots[selectedDate].find(slot => slot.id === selectedSlot)?.time}
              </p>
            </div>
            <button onClick={handleBookSlot} className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <CheckCircle className="h-5 w-5 mr-2" />
              Confirm Booking
            </button>
          </div>
        </div>}
      <div className="bg-tango-lightest p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-tango-dark mb-2 font-['Inter']">
          Important Information
        </h3>
        <ul className="text-sanjuan-base space-y-2">
          <li>• Sessions typically last 90 minutes</li>
          <li>• Please join 10 minutes early for technical setup</li>
          <li>
            • You can cancel or reschedule up to 48 hours before your session
          </li>
          <li>• Preparation materials will be sent to you after booking</li>
        </ul>
      </div>
    </div>;
}