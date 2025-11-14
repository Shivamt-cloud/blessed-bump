import React from 'react';
import './PolicyPage.css';

function TermsOfService() {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Terms of Service</h1>
        <p className="policy-last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using BlessedBump ("the Service"), you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            BlessedBump is a pregnancy tracking and community platform that provides:
          </p>
          <ul>
            <li>Pregnancy week-by-week tracking and information</li>
            <li>Due date and fertility calculators</li>
            <li>Community forums and support groups</li>
            <li>Personalized pregnancy insights and recommendations</li>
            <li>Journal and milestone tracking features</li>
          </ul>
          <p>
            <strong>Important:</strong> BlessedBump is for informational purposes only and is not a substitute for 
            professional medical advice, diagnosis, or treatment.
          </p>
        </section>

        <section>
          <h2>3. User Accounts</h2>
          
          <h3>3.1 Account Creation</h3>
          <p>To use certain features, you must create an account. You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your information to keep it accurate</li>
            <li>Maintain the security of your password</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>

          <h3>3.2 Account Eligibility</h3>
          <p>You must be at least 18 years old to create an account. By creating an account, you represent that you meet this requirement.</p>

          <h3>3.3 Account Termination</h3>
          <p>
            We reserve the right to suspend or terminate your account at any time for violation of these terms, 
            fraudulent activity, or any other reason we deem necessary.
          </p>
        </section>

        <section>
          <h2>4. Medical Disclaimer</h2>
          <p>
            <strong>CRITICAL:</strong> BlessedBump provides general information and tools for tracking your pregnancy 
            journey. This information is NOT intended to:
          </p>
          <ul>
            <li>Replace professional medical advice, diagnosis, or treatment</li>
            <li>Be used as a medical diagnostic tool</li>
            <li>Substitute for consultation with qualified healthcare providers</li>
            <li>Provide emergency medical services</li>
          </ul>
          <p>
            Always seek the advice of your physician or other qualified health provider with any questions you may 
            have regarding a medical condition. Never disregard professional medical advice or delay seeking it because 
            of something you have read on BlessedBump.
          </p>
          <p>
            If you think you may have a medical emergency, call your doctor or emergency services immediately.
          </p>
        </section>

        <section>
          <h2>5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Post, transmit, or share content that is harmful, abusive, harassing, or offensive</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Attempt to gain unauthorized access to any portion of the Service</li>
            <li>Use automated systems (bots, scrapers) to access the Service</li>
            <li>Share false or misleading medical information</li>
            <li>Violate any intellectual property rights</li>
            <li>Collect or store personal data about other users without permission</li>
          </ul>
        </section>

        <section>
          <h2>6. User Content</h2>
          
          <h3>6.1 Your Content</h3>
          <p>
            You retain ownership of content you post on BlessedBump. By posting content, you grant us a worldwide, 
            non-exclusive, royalty-free license to use, reproduce, modify, and display your content for the purpose 
            of operating and promoting the Service.
          </p>

          <h3>6.2 Content Responsibility</h3>
          <p>
            You are solely responsible for the content you post. We do not endorse or assume responsibility for any 
            user-generated content. We reserve the right to remove any content that violates these terms.
          </p>

          <h3>6.3 Prohibited Content</h3>
          <p>You may not post content that:</p>
          <ul>
            <li>Contains medical advice or diagnoses</li>
            <li>Is defamatory, libelous, or invasive of privacy</li>
            <li>Contains hate speech or discriminates against individuals or groups</li>
            <li>Is spam, advertising, or promotional material (without permission)</li>
            <li>Violates any third-party rights</li>
            <li>Contains viruses or malicious code</li>
          </ul>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by BlessedBump and are protected 
            by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p>
            You may not copy, modify, distribute, sell, or lease any part of our Service without our written permission.
          </p>
        </section>

        <section>
          <h2>8. Third-Party Services</h2>
          <p>
            Our Service may contain links to third-party websites or services. We are not responsible for the content, 
            privacy policies, or practices of third-party sites. Your use of third-party services is at your own risk.
          </p>
        </section>

        <section>
          <h2>9. Service Availability</h2>
          <p>
            We strive to provide reliable service but do not guarantee that the Service will be available at all times. 
            We may experience downtime for maintenance, updates, or unforeseen circumstances. We are not liable for any 
            loss or damage resulting from Service unavailability.
          </p>
        </section>

        <section>
          <h2>10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, BLESSEDBUMP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY 
            OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>
          <p>
            Our total liability for any claims arising from or related to the Service shall not exceed the amount you 
            paid us in the 12 months preceding the claim, or $100, whichever is greater.
          </p>
        </section>

        <section>
          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless BlessedBump, its officers, directors, employees, and agents from 
            any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the 
            Service, violation of these terms, or infringement of any rights of another.
          </p>
        </section>

        <section>
          <h2>12. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service immediately, without prior notice, for 
            any reason, including breach of these Terms. Upon termination, your right to use the Service will cease 
            immediately.
          </p>
          <p>
            You may terminate your account at any time by contacting us or using the account deletion feature in your 
            profile settings.
          </p>
        </section>

        <section>
          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of material changes by posting 
            the updated Terms on this page and updating the "Last Updated" date. Your continued use of the Service after 
            changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2>14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its 
            conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction 
            of the courts in India.
          </p>
        </section>

        <section>
          <h2>15. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or 
            eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section>
          <h2>16. Contact Information</h2>
          <p>If you have questions about these Terms of Service, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a></li>
            <li><strong>Website:</strong> <a href="/contact">Contact Us</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default TermsOfService;

