
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, Loader } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PasswordRecoveryProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResetStep = 'email' | 'code' | 'password' | 'success';

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/auth',
      });

      if (error) {
        setError(error.message);
      } else {
        setStep('code');
        toast({
          title: "Check your email",
          description: "We've sent a verification code to your email address."
        });
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would verify the code against what was sent
      // For demo purposes, we're just moving to the next step
      // Replace this with your actual verification logic
      if (code.length === 6) {
        setStep('password');
      } else {
        setError('Please enter a valid 6-digit code');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Code verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      // In a real implementation, this would use the verification code to reset the password
      // For demo purposes, we're just showing success
      // Replace with actual password update logic
      
      setStep('success');
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now log in with your new password."
      });
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
    onClose();
  };

  const renderEmailStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>Reset Your Password</DialogTitle>
        <DialogDescription>
          Enter your email address and we'll send you a verification code to reset your password.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmitEmail} className="space-y-4 py-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Verification Code'
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );

  const renderCodeStep = () => (
    <>
      <DialogHeader>
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 mr-2"
            onClick={() => setStep('email')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <DialogTitle>Enter Verification Code</DialogTitle>
        </div>
        <DialogDescription>
          We sent a 6-digit code to {email}. Enter it below to verify your identity.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleVerifyCode} className="space-y-4 py-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-center py-4">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <div className="text-center">
          <button 
            type="button" 
            onClick={() => handleSubmitEmail({ preventDefault: () => {} } as React.FormEvent)}
            className="text-sm text-blue-600 hover:underline"
          >
            Didn't receive a code? Send again
          </button>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || code.length !== 6}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <DialogHeader>
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 mr-2"
            onClick={() => setStep('code')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <DialogTitle>Reset Your Password</DialogTitle>
        </div>
        <DialogDescription>
          Create a new password for your account.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleResetPassword} className="space-y-4 py-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full"
            minLength={6}
          />
          <p className="text-xs text-gray-500">
            Password must be at least 6 characters long
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>Password Reset Successful</DialogTitle>
        <DialogDescription>
          Your password has been reset successfully. You can now log in with your new password.
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex justify-center py-8">
        <div className="rounded-full bg-green-100 p-3">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      
      <DialogFooter>
        <Button onClick={handleClose}>
          Return to Login
        </Button>
      </DialogFooter>
    </>
  );

  const renderContent = () => {
    switch (step) {
      case 'email':
        return renderEmailStep();
      case 'code':
        return renderCodeStep();
      case 'password':
        return renderPasswordStep();
      case 'success':
        return renderSuccessStep();
      default:
        return renderEmailStep();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default PasswordRecovery;
