const PrivacyPolicy = () => {
  return (
    <div className="mx-3 my-3 dark:text-white lg:mx-auto lg:max-w-3xl">
      <h1 className="text-center text-3xl font-bold">
        Privacy Policy for Nepali Calendar (calendar.bikram.io)
      </h1>
      <p className="text-center">Last Updated: Jun 17, 2023</p>
      <p className="mt-4">
        Thank you for using Nepali Calendar, an open-source project hosted at
        calendar.bikram.io ("the App"). This Privacy Policy explains how we
        collect, use, and disclose information when you access and use our App.
        We are committed to protecting your privacy and ensuring the security of
        your personal information.
      </p>

      <h2 className="mt-6 text-2xl font-bold">1. Information We Collect</h2>

      <h3 className="mt-4 text-xl font-bold">1.1 Personal Information</h3>
      <p>
        When you use Nepali Calendar, we may collect certain personal
        information from you. This information may include your name, email
        address, and any other necessary details for authentication. We collect
        this information when you log in using your Google account.
      </p>

      <h3 className="mt-4 text-xl font-bold">1.2 Usage Information</h3>
      <p>
        We may also collect non-personal information about your use of the App,
        such as your IP address, browser type, and operating system. This
        information is collected automatically through the use of cookies.
        However, please note that we do not use this information for tracking or
        advertising purposes.
      </p>

      <h2 className="mt-6 text-2xl font-bold">2. Use of Information</h2>

      <h3 className="mt-4 text-xl font-bold">
        2.1 Authentication and Account Management
      </h3>
      <p>
        We use the personal information collected to authenticate your login and
        manage your account. This includes verifying your identity and ensuring
        the security of your account.
      </p>

      <h3 className="mt-4 text-xl font-bold">
        2.2 Google Calendar Integration
      </h3>
      <p>
        In order to create and retrieve events in your Google Calendar, Nepali
        Calendar uses OAuth to access your Google Calendar data. This
        integration allows us to provide you with the functionality to manage
        your events seamlessly.
      </p>

      <h2 className="mt-6 text-2xl font-bold">3. Sharing of Information</h2>

      <h3 className="mt-4 text-xl font-bold">
        3.1 Third-Party Service Providers
      </h3>
      <p>
        We may engage third-party service providers to assist us in operating
        and maintaining the App. These service providers may have access to your
        personal information but are obligated to keep it confidential and use
        it only for the purpose of providing their services to us.
      </p>

      <h3 className="mt-4 text-xl font-bold">3.2 Legal Requirements</h3>
      <p>
        We may disclose your personal information if required to do so by law or
        in response to a valid request from a governmental authority.
      </p>

      <h2 className="mt-6 text-2xl font-bold">4. Security</h2>
      <p>
        We take reasonable measures to protect your personal information from
        unauthorized access, use, or disclosure. However, please be aware that
        no security measures are perfect or impenetrable, and we cannot
        guarantee the absolute security of your information.
      </p>

      <h2 className="mt-6 text-2xl font-bold">5. Children's Privacy</h2>
      <p>
        Nepali Calendar is not intended for use by individuals under the age of
        16. We do not knowingly collect personal information from children. If
        we become aware that we have inadvertently collected personal
        information from a child under the age of 16, we will take steps to
        delete such information.
      </p>

      <h2 className="mt-6 text-2xl font-bold">
        6. Updates to this Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal obligations. We encourage you to review this
        Privacy Policy periodically for any updates. The updated Privacy Policy
        will be effective when it is posted on the App.
      </p>

      <h2 className="mt-6 text-2xl font-bold">7. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at{' '}
        <a href="mailto:calendar@bikram.io">calendar@bikram.io</a>.
      </p>

      <p className="mt-6">
        By using Nepali Calendar, you acknowledge that you have read and
        understood this Privacy Policy and agree to the collection, use, and
        disclosure of your information as described herein.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
