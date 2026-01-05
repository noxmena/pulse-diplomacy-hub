import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Calendar, 
  UserCheck, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import HRLayout from '@/components/layout/HRLayout';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Stats Card Component
function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  delay = 0 
}: { 
  title: string; 
  value: string | number; 
  change?: string; 
  changeType?: 'up' | 'down'; 
  icon: React.ElementType;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-card border-border hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {change && (
                <div className={`flex items-center gap-1 mt-2 text-sm ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {changeType === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{change}</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-primary/10 rounded-xl">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HRDashboard() {
  const { t, isRTL } = useLanguage();

  // Fetch dashboard stats
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [applicantsRes, membersRes, interviewsRes] = await Promise.all([
        supabase.from('applicants').select('status', { count: 'exact' }),
        supabase.from('members').select('status', { count: 'exact' }),
        supabase.from('interviews').select('status', { count: 'exact' }),
      ]);

      const applicants = applicantsRes.data || [];
      const members = membersRes.data || [];
      const interviews = interviewsRes.data || [];

      return {
        newApplications: applicants.filter(a => a.status === 'new').length,
        pendingScreening: applicants.filter(a => a.status === 'screening').length,
        interviewsScheduled: interviews.filter(i => i.status === 'scheduled').length,
        acceptedThisMonth: applicants.filter(a => a.status === 'accepted').length,
        totalMembers: members.length,
        activeMembers: members.filter(m => m.status === 'active').length,
      };
    },
  });

  // Fetch recent applications
  const { data: recentApplications } = useQuery({
    queryKey: ['recent-applications'],
    queryFn: async () => {
      const { data } = await supabase
        .from('applicants')
        .select('id, full_name, status, created_at, governorate')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  return (
    <HRLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-playfair font-bold text-foreground">
              {t('dashboard', 'title')}
            </h1>
            <p className="text-muted-foreground">
              {t('dashboard', 'welcome')}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/hr/applications">
                <FileText className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('dashboard', 'reviewApplications')}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/hr/interviews">
                <Calendar className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('dashboard', 'scheduleInterviews')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t('dashboard', 'newApplications')}
            value={stats?.newApplications || 0}
            change="+12% this week"
            changeType="up"
            icon={FileText}
            delay={0.1}
          />
          <StatCard
            title={t('dashboard', 'pendingScreening')}
            value={stats?.pendingScreening || 0}
            icon={Clock}
            delay={0.2}
          />
          <StatCard
            title={t('dashboard', 'interviewsScheduled')}
            value={stats?.interviewsScheduled || 0}
            icon={Calendar}
            delay={0.3}
          />
          <StatCard
            title={t('dashboard', 'acceptedThisMonth')}
            value={stats?.acceptedThisMonth || 0}
            change="+8% vs last month"
            changeType="up"
            icon={UserCheck}
            delay={0.4}
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title={t('dashboard', 'totalMembers')}
            value={stats?.totalMembers || 0}
            icon={Users}
            delay={0.5}
          />
          <StatCard
            title={t('dashboard', 'activeMembers')}
            value={stats?.activeMembers || 0}
            icon={CheckCircle2}
            delay={0.6}
          />
          <StatCard
            title={t('dashboard', 'avgInterviewScore')}
            value="38/50"
            change="+2 points"
            changeType="up"
            icon={TrendingUp}
            delay={0.7}
          />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">{t('dashboard', 'quickActions')}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/hr/applications">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm">{t('nav', 'applications')}</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/hr/interviews">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">{t('nav', 'interviews')}</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/hr/members">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">{t('nav', 'members')}</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/hr/reports">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm">{t('nav', 'reports')}</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{t('dashboard', 'recentActivity')}</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/hr/applications">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications?.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      {t('common', 'noData')}
                    </p>
                  ) : (
                    recentApplications?.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {app.full_name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{app.full_name}</p>
                            <p className="text-xs text-muted-foreground">{app.governorate}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'new' ? 'bg-blue-500/10 text-blue-500' :
                          app.status === 'accepted' ? 'bg-green-500/10 text-green-500' :
                          app.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                          'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {t('applicationStatus', app.status)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </HRLayout>
  );
}
