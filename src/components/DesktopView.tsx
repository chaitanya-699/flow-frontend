import { Link, useNavigate } from 'react-router-dom';
import LoginDropdown from './LoginDropdown';
import { useAuth } from '../context/useAuth';
import { useEffect, useRef, useState } from 'react';

export default function DesktopNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dasboardLink = user ? `/dashboard/${user.role.toLowerCase()}` : '/login/admin';
  const navLinks = [
    { link: '/', value: 'Home' },
    { link: dasboardLink, value: 'Dashboard' },
  ];

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            P
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            ProjectFlow
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {navLinks.map(link => (
            <Link
              key={link.link}
              to={link.link}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-150"
            >
              {link.value}
            </Link>
          ))}

          {user ? (
            <div ref={dropdownRef} className="relative ml-2">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-full border border-slate-200/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                onClick={() => setOpen(prev => !prev)}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white uppercase">
                  {(user.userName || 'U').charAt(0)}
                </div>
                <span>Hi, {user.userName || 'there'}!</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.userName}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 capitalize">
                      {user.role}
                    </span>
                  </div>
                  <button
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate('/');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <LoginDropdown
              style="px-3.5 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100/70 rounded-lg transition-all"
              isMobile={false}
              closeMenu={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
}

