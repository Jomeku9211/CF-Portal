import { Link, Outlet, useLocation } from 'react-router-dom';

export function SuperAdminDashboard() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-sanjuan-lightest text-sanjuan-darkest">
      <aside className="w-72 bg-white border-r border-sanjuan-lighter p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-sanjuan-darkest">Super Admin</h2>
          <p className="text-sm text-sanjuan-light">Operations Console</p>
        </div>
        <nav className="space-y-1">
          <Link to="/admin/profile-scraper" className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/admin/profile-scraper') ? 'bg-sanjuan-lightest text-sanjuan-darkest font-medium border border-sanjuan-lighter' : 'text-sanjuan-dark hover:bg-sanjuan-lightest'}`}>Manual Profile Scraper</Link>
          <Link to="/admin/post-scraper" className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/admin/post-scraper') ? 'bg-sanjuan-lightest text-sanjuan-darkest font-medium border border-sanjuan-lighter' : 'text-sanjuan-dark hover:bg-sanjuan-lightest'}`}>Manual Post Scraper</Link>

          <Link to="/admin/generate-comment" className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/admin/generate-comment') ? 'bg-sanjuan-lightest text-sanjuan-darkest font-medium border border-sanjuan-lighter' : 'text-sanjuan-dark hover:bg-sanjuan-lightest'}`}>Generate Comment</Link>
          <Link to="/admin/auto-commenting" className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/admin/auto-commenting') ? 'bg-sanjuan-lightest text-sanjuan-darkest font-medium border border-sanjuan-lighter' : 'text-sanjuan-dark hover:bg-sanjuan-lightest'}`}>AutoCommenting</Link>
          <Link to="/admin/podcast-management" className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/admin/podcast-management') ? 'bg-sanjuan-lightest text-sanjuan-darkest font-medium border border-sanjuan-lighter' : 'text-sanjuan-dark hover:bg-sanjuan-lightest'}`}>Podcast Management</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-sanjuan-lightest">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-sanjuan-darkest">Dashboard</h1>
            <p className="text-sanjuan-light">Manage scraping, commenting, and podcast events</p>
          </div>
          <div className="bg-white rounded-xl shadow-card border border-sanjuan-lighter p-6 text-sanjuan-dark">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default SuperAdminDashboard;
