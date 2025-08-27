import { useState, useEffect } from 'react';
import { Plus, X, MapPin, Clock, Users2, Calendar, Mic, Trash2 } from 'lucide-react';

export function PodcastManagementPage() {
  const [events, setEvents] = useState<Array<{
    id: string;
    slug: string;
    title: string;
    starts_at: string;
    ends_at: string;
    capacity?: number;
  }>>([]);
  const [guests, setGuests] = useState<Array<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    linkedin_url: string;
    event_id?: string | null;
  }>>([]);
  const [form, setForm] = useState({
    slug: '',
    title: '',
    starts_at: '',
    ends_at: '',
    capacity: '' as string | number
  });
  const [mapping, setMapping] = useState<{ guestId: string; eventId: string }>({ guestId: '', eventId: '' });

  const resetForm = () => setForm({ slug: '', title: '', starts_at: '', ends_at: '', capacity: '' });

  const handleCreateEvent = () => {
    if (!form.slug || !form.title || !form.starts_at || !form.ends_at) {
      alert('Please fill all required fields');
      return;
    }
    const newEvent = {
      id: crypto.randomUUID(),
      slug: form.slug.trim(),
      title: form.title.trim(),
      starts_at: form.starts_at,
      ends_at: form.ends_at,
      capacity: form.capacity ? Number(form.capacity) : undefined
    };
    setEvents(prev => [...prev, newEvent]);
    resetForm();
  };

  const handleMapGuest = () => {
    if (!mapping.guestId || !mapping.eventId) {
      alert('Select guest and event');
      return;
    }
    setGuests(prev => prev.map(g => (g.id === mapping.guestId ? { ...g, event_id: mapping.eventId } : g)));
    setMapping({ guestId: '', eventId: '' });
  };

  // Seed some demo guests for UI demonstration
  useEffect(() => {
    if (guests.length === 0) {
      setGuests([
        { id: crypto.randomUUID(), first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', linkedin_url: 'https://linkedin.com/in/janedoe', event_id: null },
        { id: crypto.randomUUID(), first_name: 'John', last_name: 'Smith', email: 'john@example.com', linkedin_url: 'https://linkedin.com/in/johnsmith', event_id: null }
      ]);
    }
  }, [guests.length]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sanjuan-dark">Podcast Management</h1>
          <p className="text-sm text-gray-600">Manage podcast events and guest lists</p>
        </div>
      </div>

      {/* Create Event Form */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Event Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="event-slug"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Event Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Event Title"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Capacity (Optional)</label>
            <input
              type="number"
              value={form.capacity}
              onChange={(e) => setForm(prev => ({ ...prev, capacity: e.target.value }))}
              placeholder="100"
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Date & Time</label>
            <input
              type="datetime-local"
              value={form.starts_at}
              onChange={(e) => setForm(prev => ({ ...prev, starts_at: e.target.value }))}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date & Time</label>
            <input
              type="datetime-local"
              value={form.ends_at}
              onChange={(e) => setForm(prev => ({ ...prev, ends_at: e.target.value }))}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreateEvent}
              className="w-full px-4 py-2 bg-sanjuan-base hover:bg-sanjuan-light text-white rounded-md font-medium transition-colors"
            >
              <Plus className="inline w-4 h-4 mr-2" />
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Podcast Events</h2>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="border border-sanjuan-lighter rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-600 font-mono">{event.slug}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.starts_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(event.starts_at).toLocaleTimeString()} - {new Date(event.ends_at).toLocaleTimeString()}
                    </span>
                    {event.capacity && (
                      <span className="flex items-center">
                        <Users2 className="w-4 h-4 mr-1" />
                        Capacity: {event.capacity}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setEvents(prev => prev.filter(e => e.id !== event.id))}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Mic className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No events created yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Guest Mapping */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Map Guests to Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Guest</label>
            <select
              value={mapping.guestId}
              onChange={(e) => setMapping(prev => ({ ...prev, guestId: e.target.value }))}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            >
              <option value="">Choose a guest...</option>
              {guests.map(guest => (
                <option key={guest.id} value={guest.id}>
                  {guest.first_name} {guest.last_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Select Event</label>
            <select
              value={mapping.eventId}
              onChange={(e) => setMapping(prev => ({ ...prev, eventId: e.target.value }))}
              className="w-full px-3 py-2 border border-sanjuan-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-sanjuan-light bg-white text-sanjuan-dark"
            >
              <option value="">Choose an event...</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleMapGuest}
              disabled={!mapping.guestId || !mapping.eventId}
              className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
                !mapping.guestId || !mapping.eventId
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-sanjuan-base hover:bg-sanjuan-light text-white'
              }`}
            >
              Map Guest
            </button>
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Guest List</h2>
        <div className="space-y-3">
          {guests.map(guest => (
            <div key={guest.id} className="flex items-center justify-between p-3 border border-sanjuan-lighter rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{guest.first_name} {guest.last_name}</h4>
                <p className="text-sm text-gray-600">{guest.email}</p>
                <p className="text-sm text-blue-600">{guest.linkedin_url}</p>
              </div>
              <div className="text-right">
                {guest.event_id ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Calendar className="w-3 h-3 mr-1" />
                    {events.find(e => e.id === guest.event_id)?.title || 'Unknown Event'}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <X className="w-3 h-3 mr-1" />
                    Not Assigned
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
