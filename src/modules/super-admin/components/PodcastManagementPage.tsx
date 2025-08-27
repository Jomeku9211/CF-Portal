import { useState, useEffect } from 'react';

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
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Podcast Management</h1>
      </div>

      {/* Event Creation */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="e.g., q4-engineering-hiring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Starts At</label>
            <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.starts_at} onChange={e => setForm({ ...form, starts_at: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ends At</label>
            <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.ends_at} onChange={e => setForm({ ...form, ends_at: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Capacity (optional)</label>
            <input type="number" min={0} className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
          </div>
        </div>
        <div className="mt-4">
          <button onClick={handleCreateEvent} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create Event</button>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Events</h2>
        {events.length === 0 ? (
          <div className="text-gray-500">No events yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Slug</th>
                  <th className="py-2 pr-4">Starts</th>
                  <th className="py-2 pr-4">Ends</th>
                  <th className="py-2 pr-4">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} className="border-b">
                    <td className="py-2 pr-4">{ev.title}</td>
                    <td className="py-2 pr-4 font-mono">{ev.slug}</td>
                    <td className="py-2 pr-4">{ev.starts_at}</td>
                    <td className="py-2 pr-4">{ev.ends_at}</td>
                    <td className="py-2 pr-4">{ev.capacity ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Guest List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">LinkedIn</th>
                <th className="py-2 pr-4">Event</th>
              </tr>
            </thead>
            <tbody>
              {guests.map(g => {
                const ev = events.find(e => e.id === g.event_id);
                return (
                  <tr key={g.id} className="border-b">
                    <td className="py-2 pr-4">{g.first_name} {g.last_name}</td>
                    <td className="py-2 pr-4">{g.email}</td>
                    <td className="py-2 pr-4">
                      <a href={g.linkedin_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Profile</a>
                    </td>
                    <td className="py-2 pr-4">{ev ? ev.title : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mapping UI */}
      <div className="bg-white rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Assign Guest to Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Guest</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" value={mapping.guestId} onChange={e => setMapping({ ...mapping, guestId: e.target.value })}>
              <option value="">Select guest</option>
              {guests.map(g => (
                <option key={g.id} value={g.id}>{g.first_name} {g.last_name} ({g.email})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Event</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" value={mapping.eventId} onChange={e => setMapping({ ...mapping, eventId: e.target.value })}>
              <option value="">Select event</option>
              {events.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleMapGuest} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Assign</button>
          </div>
        </div>
      </div>
    </div>
  );
}
