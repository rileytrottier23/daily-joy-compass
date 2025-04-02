
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const PrivacySecurityPolicy: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Privacy & Security Policy</h2>
      <p className="text-gray-600 mb-4">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="data-collection">
          <AccordionTrigger className="text-left font-medium">
            Data Collection & Use
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p className="mb-2">We collect the following information:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Email address (for authentication)</li>
              <li>Journal entries and happiness ratings you choose to save</li>
              <li>Basic usage data to improve app functionality</li>
            </ul>
            <p>
              Your journal data is stored securely and is only visible to you. We never sell or share your personal data with third parties.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="data-security">
          <AccordionTrigger className="text-left font-medium">
            Data Security
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p className="mb-3">
              We take the security of your data seriously and implement the following measures:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>All data is encrypted during transmission using SSL/TLS</li>
              <li>Database access is protected by row-level security</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to user data</li>
            </ul>
            <p>
              While we implement strong security measures, no system is 100% secure. We continuously work to protect your information.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="user-rights">
          <AccordionTrigger className="text-left font-medium">
            Your Rights & Choices
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Access your personal data</li>
              <li>Delete any or all of your journal entries</li>
              <li>Request a copy of your data</li>
              <li>Close your account and have your data deleted</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the app.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="cookies">
          <AccordionTrigger className="text-left font-medium">
            Cookies & Local Storage
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p className="mb-3">
              We use local storage and cookies to enhance your experience and maintain your login session. These are necessary for the app to function properly.
            </p>
            <p>
              No third-party tracking cookies are used in our application.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="changes">
          <AccordionTrigger className="text-left font-medium">
            Changes to this Policy
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app and updating the "Last Updated" date.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="contact">
          <AccordionTrigger className="text-left font-medium">
            Contact Us
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@journalapp.com.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PrivacySecurityPolicy;
