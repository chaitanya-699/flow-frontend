import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  style: string;
  isMobile: boolean;
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginDropdown({ style, isMobile, closeMenu }: Props) {
  const links = [
    { role: 'Admin', icon: '👨‍✈️', desc: 'System Administration' },
    { role: 'Manager', icon: '👔', desc: 'Team & Project Lead' },
    { role: 'Employee', icon: '👨‍💻', desc: 'Member Workspace' },
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
    <div ref={dropdownRef} className={`relative ${isMobile ? 'w-full' : 'w-auto'} ${style}`}>
      <button
        type="button"
        className={`flex items-center gap-1.5 cursor-pointer font-medium ${isMobile ? 'w-full justify-between' : ''}`}
        onClick={() => setOpen(prev => !prev)}
      >
        <span>Login</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`h-4 w-4 text-current transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 z-50 flex flex-col rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 ${
            isMobile ? 'left-0 w-full' : 'right-0 w-52'
          }`}
        >
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Select Role
          </div>
          {links.map(item => (
            <Link
              key={item.role}
              to={`/login/${item.role.toLocaleLowerCase()}`}
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 rounded-lg transition-colors whitespace-nowrap group"
              onClick={() => {
                setOpen(false);
                closeMenu(false);
              }}
            >
              <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 text-xs">{item.role}</span>
                <span className="text-[10px] text-slate-400 font-normal">{item.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

