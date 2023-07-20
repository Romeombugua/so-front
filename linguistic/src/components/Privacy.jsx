import React from 'react';
import { Container } from 'react-bootstrap';

const Privacy = () => {
  return (
    <Container>
      <h1 className="text-center" style={{ fontFamily:'"Lucida Console", "Courier New", monospace' }}>Privacy Policy</h1>
      <p className="text-justify">
        At LinguifyHub, we are committed to protecting the privacy and confidentiality of our users' personal information.
        This Privacy Statement outlines the types of information we collect, how we use and protect that information, and your rights regarding your personal data.
        We encourage you to read this statement carefully to understand our privacy practices.
      </p>
      <h2 className="text-left">1. Information We Collect</h2>
      <p className="text-justify">
        1.1 Personal Information: When you visit our website or use our services, we may collect personal information such as your name, email address, contact information, and payment details.
        This information is necessary to provide you with our transcription and translation services.
      </p>
      <p className="text-justify">
        1.2 Usage Information: We may also collect non-personal information about your interactions with our website and services, including your IP address, browser type, device information, and usage patterns.
        This information helps us improve our website, services, and overall user experience.
      </p>
      {/* Include other sections of the privacy statement as needed */}
      <h2 className="text-left">2. Third-Party Services</h2>
      <p className="text-justify">
        We may use third-party service providers to assist us in operating our website and delivering our services.
        These providers may have access to your personal information but are obligated to handle it in accordance with applicable data protection laws.
      </p>
      <h2 className="text-left">3. Your Rights</h2>
      <p className="text-justify">
        You have the right to access, update, correct, and delete your personal information.
        If you wish to exercise any of these rights, please contact us using the information provided at the end of this Privacy Statement.
      </p>
      <h2 className="text-left">4. Changes to this Privacy Statement</h2>
      <p>
        We may update this Privacy Statement from time to time to reflect changes in our practices or legal obligations.
        We will notify you of any significant updates by posting a prominent notice on our website or by sending you an email.
      </p>
      <h2>5. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Statement or our privacy practices, please contact us at [contact email].
      </p>
      <p>Last updated: [Date]</p>
    </Container>
  );
};

export default Privacy;
