const FooterLayout: React.FC = () => {
  return (
    <footer className="w-full bg-white border border-neutral-200 py-4">
      <div className="px-8">
        <h1>
          This is <strong>Switz Ultra Online Banking Platform</strong>. We have
          taken every steps to ensure your security. Always remember that for
          security reason(s);
        </h1>
        <h1 className="px-8 pt-3">
          1. We will never ask for account Login Details and or PIN through
          email
        </h1>
        <h1 className="px-8">
          2. Should you receive receive any email asking for your personal
          information, please ignore it.
        </h1>

        <p className="pt-3">
          For assistance or technical support regarding your account,
        </p>
        <p className="">
          Please contact your account officer here:{" "}
          <a href="mailto:support@switzultra.com"><span className="text-black font-bold">support@switzultra.com</span></a>
        </p>
      </div>

      <div className="text-center pt-3">
        <p>
          &copy; {new Date().getFullYear()} Switz Ultra Online Banking. All rights reserved.
        </p>
      </div>
    </footer>
  )
};

export default FooterLayout;
