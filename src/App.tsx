
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { JournalProvider } from "./contexts/JournalContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CalendarPage from "./pages/CalendarPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import EntryDetailPage from "./pages/EntryDetailPage";
import EditEntryPage from "./pages/EditEntryPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <JournalProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/auth" element={<AuthPage />} />
                
                {/* Initial route check */}
                <Route path="/" element={<Index />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/home" 
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/calendar" 
                  element={
                    <ProtectedRoute>
                      <CalendarPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/chat" 
                  element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/entry/:date" 
                  element={
                    <ProtectedRoute>
                      <EntryDetailPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit/:date" 
                  element={
                    <ProtectedRoute>
                      <EditEntryPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </JournalProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
