import React, { useState } from 'react';
import CustomerSupportForm from '@/components/CustomerSupportForm';

const FooterLayout: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)


  return (
    <div className={`${isModalOpen ? "blur-sm" : ""}`}>
      <footer className="w-full bg-indigo-200 border border-neutral-200 py-4">
        <div className="px-8">
          <h1>
            This is <strong>Switz Ultra Online Banking Platform</strong>. We
            have taken every steps to ensure your security. Always remember that
            for security reason(s);
          </h1>
          <h1 className="px-8 pt-3">
            1. We will never ask for account Login Details or PIN through email
          </h1>
          <h1 className="px-8">
            2. Should you receive any email asking for your personal
            information, please ignore it.
          </h1>

          <p className="pt-3">
            For assistance or technical support regarding your account,
          </p>
          <p className="">
            Please contact your account officer here:{" "}
            <span
              className="font-bold text-blue-700 underline"
              onClick={() => setModalOpen(true)}
            >
              support@switzultra.com
            </span>
          </p>
        </div>

        <div className="text-center pt-3">
          <p>
            &copy; {new Date().getFullYear()} Switz Ultra Online Banking. All
            rights reserved.
          </p>
        </div>
        {isModalOpen && (
          <CustomerSupportForm closeModal={() => setModalOpen(false)} />
        )}
      </footer>
    </div>
  )
};

export default FooterLayout;
