import DesktopView from './DesktopView';
import MobileView from './MobileView';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <DesktopView />
      <MobileView />
    </header>
  );
}
