
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BottomNav from '../components/BottomNav';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  User, 
  Shield
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import PrivacySecurityPolicy from '@/components/PrivacySecurityPolicy';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [openPrivacySheet, setOpenPrivacySheet] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/auth');
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Settings</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 main-content">
        <div className="journal-card mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="font-semibold text-lg">{user?.email?.split('@')[0] || 'User'}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Account Settings</h3>
            </div>
            
            <div className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Profile Information</span>
                </div>
                <span className="text-gray-400">›</span>
              </div>
              
              <Sheet open={openPrivacySheet} onOpenChange={setOpenPrivacySheet}>
                <SheetTrigger asChild>
                  <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Privacy & Security</span>
                    </div>
                    <span className="text-gray-400">›</span>
                  </div>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <PrivacySecurityPolicy />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
