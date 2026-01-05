import { ReactNode, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Star,
  BarChart3,
  GitBranch,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import logo from '@/assets/logo.png';

interface HRLayoutProps {
  children: ReactNode;
}

const hrNavItems = [
  { icon: LayoutDashboard, labelKey: 'dashboard', href: '/hr/dashboard' },
  { icon: FileText, labelKey: 'applications', href: '/hr/applications' },
  { icon: Calendar, labelKey: 'interviews', href: '/hr/interviews' },
  { icon: Users, labelKey: 'members', href: '/hr/members' },
  { icon: Star, labelKey: 'evaluations', href: '/hr/evaluations' },
  { icon: Shield, labelKey: 'recognition', href: '/hr/recognition' },
  { icon: BarChart3, labelKey: 'reports', href: '/hr/reports' },
  { icon: GitBranch, labelKey: 'hrFlow', href: '/hr/flow' },
];

const adminNavItems = [
  { icon: Users, labelKey: 'users', href: '/admin/users' },
  { icon: LayoutDashboard, labelKey: 'committees', href: '/admin/committees' },
  { icon: Settings, labelKey: 'settings', href: '/admin/settings' },
];

export default function HRLayout({ children }: HRLayoutProps) {
  const { t, isRTL } = useLanguage();
  const { user, isAdmin, isHR, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Close sidebar on route change (mobile)
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || (!isHR && !isAdmin)) {
    return null;
  }

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar - Desktop */}
      <aside
        className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 bg-sidebar border-${isRTL ? 'l' : 'r'} border-sidebar-border hidden lg:block z-40`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="EDF" className="w-10 h-10 object-contain" />
              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-bold text-foreground truncate">EDF</h1>
                <p className="text-xs text-muted-foreground truncate">HR Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {hrNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{t('nav', item.labelKey)}</span>
                    {active && (
                      <ChevronRight className={`w-4 h-4 ${isRTL ? 'mr-auto rotate-180' : 'ml-auto'}`} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Admin Section */}
            {isAdmin && (
              <div className="mt-8">
                <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Admin
                </p>
                <div className="space-y-1">
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          active
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{t('nav', item.labelKey)}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">{t('common', 'logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: isRTL ? 280 : -280 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 280 : -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-72 bg-sidebar z-50 lg:hidden`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                  <Link to="/" className="flex items-center gap-3">
                    <img src={logo} alt="EDF" className="w-10 h-10 object-contain" />
                    <span className="font-bold">EDF Portal</span>
                  </Link>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-1">
                    {hrNavItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${
                            active
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-sidebar-accent'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{t('nav', item.labelKey)}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {isAdmin && (
                    <div className="mt-6">
                      <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase">
                        Admin
                      </p>
                      <div className="space-y-1">
                        {adminNavItems.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href);
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={`flex items-center gap-3 px-3 py-3 rounded-lg ${
                                active
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:bg-sidebar-accent'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              <span>{t('nav', item.labelKey)}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Language Switcher in Mobile Menu */}
                  <div className="mt-6 px-3">
                    <LanguageSwitcher />
                  </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-sidebar-border">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t('common', 'logout')}</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isRTL ? 'lg:mr-64' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-muted lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search */}
              <div className="hidden sm:block relative">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  type="text"
                  placeholder={t('common', 'search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-64 ${isRTL ? 'pr-9' : 'pl-9'} bg-muted/50 border-0`}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Language Switcher - Desktop */}
              <div className="hidden lg:block">
                <LanguageSwitcher variant="compact" />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1 rounded-lg hover:bg-muted transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user?.email?.charAt(0).toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{isAdmin ? 'Admin User' : 'HR User'}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {user?.email}
                      </p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-48">
                  <DropdownMenuItem>
                    {t('common', 'profile')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    {t('common', 'logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
