
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';
import PasswordRecovery from '../components/PasswordRecovery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const AuthPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-muted">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-8">
        <div className="text-center">
          <BookOpen 
            size={96} 
            className="mx-auto mb-4 text-primary" 
            strokeWidth={1.5}
          />
          <h1 className="text-2xl font-bold text-gray-900">Daily Joy Compass</h1>
          <p className="text-gray-600 mt-2">Track your happiness journey one day at a time</p>
        </div>

        <Tabs 
          defaultValue="login" 
          className="w-full" 
          onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
        >
          <TabsList className="grid w-full grid-cols-2 gap-2 bg-muted p-1">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
            <AuthForm type="login" onSuccess={() => {}} />
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setIsPasswordRecoveryOpen(true)}
              >
                Forgot your password?
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="signup" className="mt-6">
            <AuthForm type="signup" onSuccess={() => setActiveTab('login')} />
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setIsPasswordRecoveryOpen(true)}
              >
                Forgot your password?
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-600">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>

      <PasswordRecovery 
        isOpen={isPasswordRecoveryOpen} 
        onClose={() => setIsPasswordRecoveryOpen(false)} 
      />
    </div>
  );
};

export default AuthPage;

