import React from 'react';
import { Calendar, Info, Bell, MessageSquare, FileText, Clock } from 'lucide-react';
export function NotificationsPanel() {
  // Mock notification data
  const notifications = [{
    id: 'notif1',
    type: 'reminder',
    title: 'Upcoming Podcast Session',
    message: 'Your podcast recording is scheduled for tomorrow at 10:00 AM',
    date: '1 day ago',
    icon: <Calendar className="h-5 w-5 text-white" />,
    iconBg: 'bg-tango-base',
    read: false
  }, {
    id: 'notif2',
    type: 'info',
    title: 'New Preparation Materials',
    message: 'Session agenda and questions have been added to your preparation materials',
    date: '2 days ago',
    icon: <FileText className="h-5 w-5 text-white" />,
    iconBg: 'bg-sanjuan-base',
    read: false
  }, {
    id: 'notif3',
    type: 'message',
    title: 'Message from Sarah Williams',
    message: 'Looking forward to our podcast session next week!',
    date: '3 days ago',
    icon: <MessageSquare className="h-5 w-5 text-white" />,
    iconBg: 'bg-green-500',
    read: true
  }, {
    id: 'notif4',
    type: 'reminder',
    title: 'Complete Your Profile',
    message: 'Please complete your profile to help us prepare for your podcast appearance',
    date: '5 days ago',
    icon: <Info className="h-5 w-5 text-white" />,
    iconBg: 'bg-yellow-500',
    read: true
  }, {
    id: 'notif5',
    type: 'system',
    title: 'Session Rescheduled',
    message: 'Your session on Oct 10 has been rescheduled to Nov 15 at 10:00 AM',
    date: '1 week ago',
    icon: <Clock className="h-5 w-5 text-white" />,
    iconBg: 'bg-red-500',
    read: true
  }];
  // Upcoming reminders
  const upcomingReminders = [{
    id: 'reminder1',
    title: 'Podcast Session',
    date: 'Nov 15, 2023',
    time: '10:00 AM - 11:30 AM'
  }, {
    id: 'reminder2',
    title: 'Technical Check',
    date: 'Nov 14, 2023',
    time: '2:00 PM - 2:30 PM'
  }];
  return <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
          Upcoming Reminders
        </h2>
        <div className="space-y-4">
          {upcomingReminders.map(reminder => <div key={reminder.id} className="flex items-center p-4 bg-sanjuan-lightest rounded-lg">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-4">
                <Bell className="h-5 w-5 text-tango-base" />
              </div>
              <div>
                <h4 className="font-medium text-sanjuan-dark">
                  {reminder.title}
                </h4>
                <p className="text-sm text-sanjuan-base">
                  {reminder.date} • {reminder.time}
                </p>
              </div>
            </div>)}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
            Notifications
          </h2>
          <button className="text-sm text-tango-base hover:text-tango-dark transition-colors">
            Mark all as read
          </button>
        </div>
        <div className="space-y-4">
          {notifications.map(notification => <div key={notification.id} className={`flex p-4 border rounded-lg ${notification.read ? 'border-sanjuan-lighter' : 'border-sanjuan-light bg-sanjuan-lightest/50'}`}>
              <div className={`h-10 w-10 ${notification.iconBg} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                {notification.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sanjuan-dark">
                    {notification.title}
                  </h4>
                  <span className="text-xs text-sanjuan-base">
                    {notification.date}
                  </span>
                </div>
                <p className="text-sm text-sanjuan-base">
                  {notification.message}
                </p>
              </div>
            </div>)}
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-sanjuan-dark mb-4 font-['Inter']">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sanjuan-dark">
                Email Notifications
              </p>
              <p className="text-sm text-sanjuan-base">
                Receive notifications via email
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-sanjuan-lighter">
              <input type="checkbox" className="sr-only" defaultChecked />
              <div className="w-6 h-6 absolute left-0 bg-white rounded-full transition-transform duration-200 transform translate-x-6 border border-sanjuan-lighter"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sanjuan-dark">SMS Reminders</p>
              <p className="text-sm text-sanjuan-base">
                Get text reminders for important events
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
              <input type="checkbox" className="sr-only" />
              <div className="w-6 h-6 absolute left-0 bg-white rounded-full transition-transform duration-200 transform border border-gray-300"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sanjuan-dark">
                Browser Notifications
              </p>
              <p className="text-sm text-sanjuan-base">
                Show notifications in your browser
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-sanjuan-lighter">
              <input type="checkbox" className="sr-only" defaultChecked />
              <div className="w-6 h-6 absolute left-0 bg-white rounded-full transition-transform duration-200 transform translate-x-6 border border-sanjuan-lighter"></div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}