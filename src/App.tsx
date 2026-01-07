import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

// HR Portal Pages
import HRDashboard from "./pages/hr/HRDashboard";
import ApplicationsPage from "./pages/hr/ApplicationsPage";
import InterviewsPage from "./pages/hr/InterviewsPage";
import NewInterviewPage from "./pages/hr/NewInterviewPage";
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
              
              {/* HR Portal Routes - require HR or Admin role */}
              <Route path="/hr" element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="/hr/dashboard" element={<ProtectedRoute requiredRole="hr"><HRDashboard /></ProtectedRoute>} />
              <Route path="/hr/applications" element={<ProtectedRoute requiredRole="hr"><ApplicationsPage /></ProtectedRoute>} />
              <Route path="/hr/interviews" element={<ProtectedRoute requiredRole="hr"><InterviewsPage /></ProtectedRoute>} />
              <Route path="/hr/interviews/new" element={<ProtectedRoute requiredRole="hr"><NewInterviewPage /></ProtectedRoute>} />
              <Route path="/hr/members" element={<ProtectedRoute requiredRole="hr"><MembersPage /></ProtectedRoute>} />
              <Route path="/hr/evaluations" element={<ProtectedRoute requiredRole="hr"><EvaluationsPage /></ProtectedRoute>} />
              <Route path="/hr/recognition" element={<ProtectedRoute requiredRole="hr"><RecognitionPage /></ProtectedRoute>} />
              <Route path="/hr/reports" element={<ProtectedRoute requiredRole="hr"><ReportsPage /></ProtectedRoute>} />
              <Route path="/hr/flow" element={<ProtectedRoute requiredRole="hr"><HRFlowPage /></ProtectedRoute>} />
              
              {/* Admin Routes - require Admin role only */}
              <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
              <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><UsersPage /></ProtectedRoute>} />
              <Route path="/admin/committees" element={<ProtectedRoute requiredRole="admin"><CommitteesPage /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><SettingsPage /></ProtectedRoute>} />
              
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
