
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-muted">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-8">
        <div className="text-center">
          <img 
            src="/lovable-uploads/4542173b-a227-413a-8cd7-8f951d6b31f1.png" 
            alt="Daily Joy Compass Logo" 
            className="mx-auto w-24 h-24 mb-4" 
          />
          <h1 className="text-2xl font-bold text-gray-900">Daily Joy Compass</h1>
          <p className="text-gray-600 mt-2">Track your happiness journey one day at a time</p>
        </div>

        <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
            <AuthForm type="login" onSuccess={() => {}} />
          </TabsContent>
          <TabsContent value="signup" className="mt-6">
            <AuthForm type="signup" onSuccess={() => setActiveTab('login')} />
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-600">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
