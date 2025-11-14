import React from 'react';
import './PolicyPage.css';

function PrivacyPolicy() {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <p className="policy-last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to BlessedBump ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and 
            safeguard your information when you use our website and services.
          </p>
          <p>
            By using BlessedBump, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Personal Information</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
            <li><strong>Pregnancy Data:</strong> Last menstrual period (LMP) date, due date, conception date, current week</li>
            <li><strong>Fertility Information:</strong> Cycle length, ovulation dates, fertile windows</li>
            <li><strong>Profile Information:</strong> Baby nickname, partner name, healthcare provider details, birth plan, bio, notes</li>
            <li><strong>Community Content:</strong> Posts, threads, comments, and other content you submit</li>
            <li><strong>Communication Preferences:</strong> Timezone, reminder settings, support circle information</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you use our services, we automatically collect certain information:</p>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, time spent, features used, click patterns</li>
            <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address</li>
            <li><strong>Cookies and Tracking:</strong> Cookies, web beacons, and similar tracking technologies</li>
            <li><strong>Location Data:</strong> General location information (if you choose to provide it)</li>
          </ul>

          <h3>2.3 Third-Party Information</h3>
          <p>We may receive information from third-party services you connect to BlessedBump, such as:</p>
          <ul>
            <li>Social media platforms (if you choose to connect)</li>
            <li>Healthcare providers (if you authorize data sharing)</li>
            <li>Analytics and advertising partners</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li><strong>Service Provision:</strong> To provide, maintain, and improve our services</li>
            <li><strong>Personalization:</strong> To customize your experience and provide relevant content</li>
            <li><strong>Communication:</strong> To send you updates, reminders, and respond to your inquiries</li>
            <li><strong>Community Features:</strong> To enable community interactions and support</li>
            <li><strong>Analytics:</strong> To analyze usage patterns and improve our services</li>
            <li><strong>Security:</strong> To protect against fraud, abuse, and security threats</li>
            <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
            <li><strong>Marketing:</strong> To send promotional materials (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2>4. Information Sharing and Disclosure</h2>
          
          <h3>4.1 We Do Not Sell Your Data</h3>
          <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>

          <h3>4.2 Service Providers</h3>
          <p>We may share information with trusted service providers who assist us in operating our platform:</p>
          <ul>
            <li>Cloud hosting and storage providers (Supabase, Netlify)</li>
            <li>Email service providers</li>
            <li>Analytics and monitoring services</li>
            <li>Payment processors (if applicable)</li>
          </ul>

          <h3>4.3 Legal Requirements</h3>
          <p>We may disclose your information if required by law or in response to valid legal requests, including:</p>
          <ul>
            <li>Court orders or subpoenas</li>
            <li>Government investigations</li>
            <li>Protection of rights and safety</li>
          </ul>

          <h3>4.4 Business Transfers</h3>
          <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>

          <h3>4.5 With Your Consent</h3>
          <p>We may share your information with third parties when you explicitly consent to such sharing.</p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information, including:
          </p>
          <ul>
            <li>Encryption of data in transit (SSL/TLS)</li>
            <li>Encryption of sensitive data at rest</li>
            <li>Secure authentication and access controls</li>
            <li>Regular security audits and updates</li>
            <li>Row-level security policies in our database</li>
          </ul>
          <p>
            However, no method of transmission over the internet or electronic storage is 100% secure. 
            While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>6. Your Rights and Choices</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request access to your personal data</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Cookie Preferences:</strong> Manage cookie settings through your browser</li>
          </ul>
          <p>
            To exercise these rights, please contact us at <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a>
          </p>
        </section>

        <section>
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. For detailed information, 
            please see our <a href="/cookie-policy">Cookie Policy</a>.
          </p>
          <p>Types of cookies we use:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
          </ul>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            BlessedBump is designed for adults (18 years and older) who are pregnant or planning pregnancy. 
            We do not knowingly collect personal information from children under 18. If you believe we have 
            inadvertently collected information from a child, please contact us immediately.
          </p>
        </section>

        <section>
          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. 
            We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy 
            and applicable data protection laws.
          </p>
        </section>

        <section>
          <h2>10. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and fulfill the 
            purposes outlined in this policy, unless a longer retention period is required by law. When you delete 
            your account, we will delete or anonymize your personal information, except where we are required to 
            retain it for legal purposes.
          </p>
        </section>

        <section>
          <h2>11. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
            the new policy on this page and updating the "Last Updated" date. Your continued use of our services after 
            such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a></li>
            <li><strong>Website:</strong> <a href="/contact">Contact Us</a></li>
            <li><strong>Address:</strong> BlessedBump, India</li>
          </ul>
        </section>

        <section>
          <h2>14. Compliance with Regulations</h2>
          <p>
            This Privacy Policy is designed to comply with:
          </p>
          <ul>
            <li>General Data Protection Regulation (GDPR) - for EU users</li>
            <li>California Consumer Privacy Act (CCPA) - for California residents</li>
            <li>Health Insurance Portability and Accountability Act (HIPAA) - for health-related data</li>
            <li>Children's Online Privacy Protection Act (COPPA)</li>
            <li>Other applicable data protection laws</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

