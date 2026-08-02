export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">P</span>
          ProjectFlow
        </div>
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} ProjectFlow Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

