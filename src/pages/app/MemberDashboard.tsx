import React, { useState } from 'react';
import { Calendar, Users, FileText, Bell, MessageSquare, User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookingCalendar } from '../modules/shared/components/BookingCalendar';
import { ParticipantsList } from '../modules/shared/components/ParticipantsList';
import { PreparationMaterials } from '../modules/shared/components/PreparationMaterials';
import { NotificationsPanel } from '../modules/shared/components/NotificationsPanel';
import { ProfileSettings } from '../modules/shared/components/ProfileSettings';
export function MemberDashboardPage() {
  const [activeTab, setActiveTab] = useState('booking');
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Tech Lead',
    company: 'InnovateTech',
    avatar: 'AJ'
  };
  return <div className="min-h-screen bg-gray-50 font-['IBM_Plex_Sans']">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-14 w-14 rounded-full bg-sanjuan-lightest flex items-center justify-center text-sanjuan-dark font-bold text-xl">
                    {user.avatar}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-sanjuan-dark font-['Inter']">
                      {user.name}
                    </h2>
                    <p className="text-sanjuan-base text-sm">
                      {user.role}, {user.company}
                    </p>
                  </div>
                </div>
                <nav className="space-y-1">
                  <button onClick={() => setActiveTab('booking')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'booking' ? 'bg-sanjuan-lightest text-sanjuan-dark font-medium' : 'text-sanjuan-base hover:bg-gray-50'}`}>
                    <Calendar className="h-5 w-5" />
                    <span>Book Recording Slot</span>
                  </button>
                  <button onClick={() => setActiveTab('participants')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'participants' ? 'bg-sanjuan-lightest text-sanjuan-dark font-medium' : 'text-sanjuan-base hover:bg-gray-50'}`}>
                    <Users className="h-5 w-5" />
                    <span>View Participants</span>
                  </button>
                  <button onClick={() => setActiveTab('materials')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'materials' ? 'bg-sanjuan-lightest text-sanjuan-dark font-medium' : 'text-sanjuan-base hover:bg-gray-50'}`}>
                    <FileText className="h-5 w-5" />
                    <span>Preparation Materials</span>
                  </button>
                  <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-sanjuan-lightest text-sanjuan-dark font-medium' : 'text-sanjuan-base hover:bg-gray-50'}`}>
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                  <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-sanjuan-lightest text-sanjuan-dark font-medium' : 'text-sanjuan-base hover:bg-gray-50'}`}>
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </button>
                  <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-sanjuan-lightest text-sanjuan-dark font-medium' : 'text-sanjuan-base hover:bg-gray-50'}`}>
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-sanjuan-lightest text-sanjuan-dark font-medium' : 'text-sanjuan-base hover:bg-gray-50'}`}>
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </nav>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link to="/login" className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white text-sanjuan-dark border border-sanjuan-lighter rounded-lg hover:bg-gray-50 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {activeTab === 'booking' && <div>
                    <h1 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                      Book Your Recording Slot
                    </h1>
                    <BookingCalendar />
                  </div>}
                {activeTab === 'participants' && <div>
                    <h1 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                      Session Participants
                    </h1>
                    <ParticipantsList />
                  </div>}
                {activeTab === 'materials' && <div>
                    <h1 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                      Preparation Materials
                    </h1>
                    <PreparationMaterials />
                  </div>}
                {activeTab === 'notifications' && <div>
                    <h1 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                      Notifications & Reminders
                    </h1>
                    <NotificationsPanel />
                  </div>}
                {activeTab === 'messages' && <div>
                    <h1 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                      Messages
                    </h1>
                    <p className="text-sanjuan-base">
                      Connect with other podcast guests and the Coderfarm team.
                    </p>
                    {/* Message component would go here */}
                    <div className="mt-4 p-8 border-2 border-dashed border-sanjuan-lighter rounded-lg text-center">
                      <p className="text-sanjuan-base">No messages yet.</p>
                    </div>
                  </div>}
                {activeTab === 'profile' && <div>
                    <h1 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                      Your Profile
                    </h1>
                    <ProfileSettings user={user} />
                  </div>}
                {activeTab === 'settings' && <div>
                    <h1 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                      Account Settings
                    </h1>
                    <p className="text-sanjuan-base">
                      Manage your account settings and preferences.
                    </p>
                    {/* Settings component would go here */}
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between p-4 border border-sanjuan-lighter rounded-lg">
                        <div>
                          <h3 className="font-medium text-sanjuan-dark">
                            Email Notifications
                          </h3>
                          <p className="text-sm text-sanjuan-base">
                            Receive email notifications about your sessions
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-sanjuan-lighter">
                          <input type="checkbox" className="sr-only" defaultChecked />
                          <div className="w-6 h-6 absolute left-0 bg-white rounded-full transition-transform duration-200 transform translate-x-6 border border-sanjuan-lighter"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-sanjuan-lighter rounded-lg">
                        <div>
                          <h3 className="font-medium text-sanjuan-dark">
                            SMS Reminders
                          </h3>
                          <p className="text-sm text-sanjuan-base">
                            Get text message reminders before your podcast
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-6 h-6 absolute left-0 bg-white rounded-full transition-transform duration-200 transform border border-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}