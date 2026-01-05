import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

// HR Portal Pages
import HRDashboard from "./pages/hr/HRDashboard";
import ApplicationsPage from "./pages/hr/ApplicationsPage";
import InterviewsPage from "./pages/hr/InterviewsPage";
import MembersPage from "./pages/hr/MembersPage";
import EvaluationsPage from "./pages/hr/EvaluationsPage";
import RecognitionPage from "./pages/hr/RecognitionPage";
import ReportsPage from "./pages/hr/ReportsPage";
import HRFlowPage from "./pages/hr/HRFlowPage";

// Admin Pages
import UsersPage from "./pages/admin/UsersPage";
import CommitteesPage from "./pages/admin/CommitteesPage";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* HR Portal Routes */}
              <Route path="/hr" element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="/hr/dashboard" element={<HRDashboard />} />
              <Route path="/hr/applications" element={<ApplicationsPage />} />
              <Route path="/hr/interviews" element={<InterviewsPage />} />
              <Route path="/hr/members" element={<MembersPage />} />
              <Route path="/hr/evaluations" element={<EvaluationsPage />} />
              <Route path="/hr/recognition" element={<RecognitionPage />} />
              <Route path="/hr/reports" element={<ReportsPage />} />
              <Route path="/hr/flow" element={<HRFlowPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/committees" element={<CommitteesPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
