import React, { useState } from 'react';
import { Calendar, MessageSquare, ExternalLink } from 'lucide-react';
export function ParticipantsList() {
  const [selectedSession, setSelectedSession] = useState('upcoming');
  // Mock data for upcoming and past sessions
  const upcomingSession = {
    date: 'November 15, 2023',
    time: '10:00 AM - 11:30 AM',
    topic: 'Hiring Challenges in Tech Startups',
    participants: [{
      id: '1',
      name: 'Alex Johnson',
      role: 'Tech Lead',
      company: 'InnovateTech',
      avatar: 'AJ'
    }, {
      id: '2',
      name: 'Sarah Williams',
      role: 'HR Director',
      company: 'TalentForge',
      avatar: 'SW'
    }, {
      id: '3',
      name: 'David Chen',
      role: 'CTO',
      company: 'DevStream',
      avatar: 'DC'
    }]
  };
  const pastSessions = [{
    id: 'past1',
    date: 'October 12, 2023',
    time: '2:00 PM - 3:30 PM',
    topic: 'Remote Hiring Best Practices',
    participants: [{
      id: '4',
      name: 'Emma Thompson',
      role: 'Founder',
      company: 'RemoteFirst',
      avatar: 'ET'
    }, {
      id: '5',
      name: 'Michael Brown',
      role: 'VP Engineering',
      company: 'CodeCraft',
      avatar: 'MB'
    }],
    recordingUrl: 'https://example.com/recording1'
  }];
  return <div className="space-y-8">
      <div className="flex border-b border-sanjuan-lighter">
        <button onClick={() => setSelectedSession('upcoming')} className={`px-6 py-3 font-medium text-base transition-colors ${selectedSession === 'upcoming' ? 'border-b-2 border-sanjuan-base text-sanjuan-dark' : 'text-sanjuan-base hover:text-sanjuan-dark'}`}>
          Upcoming Session
        </button>
        <button onClick={() => setSelectedSession('past')} className={`px-6 py-3 font-medium text-base transition-colors ${selectedSession === 'past' ? 'border-b-2 border-sanjuan-base text-sanjuan-dark' : 'text-sanjuan-base hover:text-sanjuan-dark'}`}>
          Past Sessions
        </button>
      </div>
      {selectedSession === 'upcoming' ? upcomingSession ? <div>
            <div className="bg-sanjuan-lightest rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-sanjuan-base mr-2" />
                <h3 className="text-lg font-semibold text-sanjuan-dark font-['Inter']">
                  {upcomingSession.date} • {upcomingSession.time}
                </h3>
              </div>
              <p className="text-sanjuan-dark mb-2">
                <span className="font-medium">Topic:</span>{' '}
                {upcomingSession.topic}
              </p>
            </div>
            <h3 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
              Session Participants
            </h3>
            <div className="space-y-4">
              {upcomingSession.participants.map(participant => <div key={participant.id} className="flex items-center justify-between p-4 border border-sanjuan-lighter rounded-lg hover:border-sanjuan-light transition-colors">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-sanjuan-lightest flex items-center justify-center text-sanjuan-dark font-bold mr-4">
                      {participant.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-sanjuan-dark">
                        {participant.name}
                      </h4>
                      <p className="text-sm text-sanjuan-base">
                        {participant.role}, {participant.company}
                      </p>
                    </div>
                  </div>
                  <button className="text-tango-base hover:text-tango-dark transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>)}
            </div>
          </div> : <div className="p-8 border-2 border-dashed border-sanjuan-lighter rounded-lg text-center">
            <p className="text-sanjuan-base mb-4">
              You don't have any upcoming sessions.
            </p>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Book a Session
            </button>
          </div> : pastSessions.length > 0 ? <div className="space-y-6">
          {pastSessions.map(session => <div key={session.id} className="border border-sanjuan-lighter rounded-lg overflow-hidden">
              <div className="bg-sanjuan-lightest p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-sanjuan-base mr-2" />
                  <h3 className="text-lg font-semibold text-sanjuan-dark font-['Inter']">
                    {session.date} • {session.time}
                  </h3>
                </div>
                <p className="text-sanjuan-dark">
                  <span className="font-medium">Topic:</span> {session.topic}
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-sanjuan-dark mb-3">
                  Participants:
                </h4>
                <div className="flex flex-wrap gap-3 mb-4">
                  {session.participants.map(participant => <div key={participant.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-sanjuan-lightest flex items-center justify-center text-sanjuan-dark font-bold text-sm mr-2">
                        {participant.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sanjuan-dark">
                          {participant.name}
                        </p>
                        <p className="text-xs text-sanjuan-base">
                          {participant.company}
                        </p>
                      </div>
                    </div>)}
                </div>
                {session.recordingUrl && <a href={session.recordingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-tango-base hover:text-tango-dark transition-colors">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Recording
                  </a>}
              </div>
            </div>)}
        </div> : <div className="p-8 border-2 border-dashed border-sanjuan-lighter rounded-lg text-center">
          <p className="text-sanjuan-base">
            You haven't participated in any sessions yet.
          </p>
        </div>}
    </div>;
}