import React from 'react';
import './PolicyPage.css';

function CookiePolicy() {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Cookie Policy</h1>
        <p className="policy-last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <section>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely used 
            to make websites work more efficiently and provide information to website owners.
          </p>
          <p>
            Cookies allow a website to recognize your device and store some information about your preferences or past actions.
          </p>
        </section>

        <section>
          <h2>2. How We Use Cookies</h2>
          <p>BlessedBump uses cookies and similar tracking technologies to:</p>
          <ul>
            <li>Remember your login status and preferences</li>
            <li>Analyze how you use our website</li>
            <li>Improve our services and user experience</li>
            <li>Provide personalized content and advertisements</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2>3. Types of Cookies We Use</h2>
          
          <h3>3.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core functionality such as 
            security, network management, and accessibility. You cannot opt-out of these cookies.
          </p>
          <ul>
            <li><strong>Authentication Cookies:</strong> Remember your login session</li>
            <li><strong>Security Cookies:</strong> Protect against fraud and security threats</li>
            <li><strong>Load Balancing Cookies:</strong> Distribute website traffic</li>
          </ul>

          <h3>3.2 Functional Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization. They remember your choices and preferences 
            to provide a more personalized experience.
          </p>
          <ul>
            <li><strong>Preference Cookies:</strong> Remember your language, region, and display preferences</li>
            <li><strong>Feature Cookies:</strong> Remember which features you've enabled or disabled</li>
          </ul>

          <h3>3.3 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information 
            anonymously. This helps us improve our services.
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Tracks page views, user behavior, and website performance</li>
            <li><strong>Performance Monitoring:</strong> Identifies technical issues and optimization opportunities</li>
          </ul>

          <h3>3.4 Advertising Cookies</h3>
          <p>
            These cookies are used to deliver advertisements that are relevant to you and your interests. They also help 
            measure the effectiveness of advertising campaigns.
          </p>
          <ul>
            <li><strong>Google AdSense:</strong> Serves personalized advertisements</li>
            <li><strong>Retargeting Cookies:</strong> Show you relevant ads based on your browsing history</li>
            <li><strong>Conversion Tracking:</strong> Measure ad performance and conversions</li>
          </ul>
          <p>
            <strong>Note:</strong> We only use advertising cookies with your explicit consent, as required by applicable 
            privacy laws.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics, 
            deliver advertisements, and provide other services. These include:
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Website analytics and performance monitoring</li>
            <li><strong>Google AdSense:</strong> Advertising services (with consent)</li>
            <li><strong>Social Media Platforms:</strong> If you connect your social media accounts</li>
            <li><strong>Cloud Services:</strong> Supabase, Netlify for service functionality</li>
          </ul>
          <p>
            These third parties may use cookies to collect information about your online activities across different 
            websites. We do not control these third-party cookies.
          </p>
        </section>

        <section>
          <h2>5. Cookie Duration</h2>
          
          <h3>5.1 Session Cookies</h3>
          <p>
            These cookies are temporary and are deleted when you close your browser. They are used to maintain your 
            session while you navigate the website.
          </p>

          <h3>5.2 Persistent Cookies</h3>
          <p>
            These cookies remain on your device for a set period or until you delete them. They remember your preferences 
            and settings for future visits.
          </p>
          <ul>
            <li><strong>Short-term:</strong> 1-30 days (preferences, settings)</li>
            <li><strong>Medium-term:</strong> 30-90 days (analytics, authentication)</li>
            <li><strong>Long-term:</strong> Up to 2 years (advertising, tracking)</li>
          </ul>
        </section>

        <section>
          <h2>6. Managing Cookies</h2>
          
          <h3>6.1 Browser Settings</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. You can set your browser to refuse 
            cookies or alert you when cookies are being sent. However, disabling cookies may affect the functionality 
            of our website.
          </p>
          <p>Instructions for popular browsers:</p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
            <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
          </ul>

          <h3>6.2 Cookie Consent</h3>
          <p>
            When you first visit our website, you will see a cookie consent banner. You can choose which types of 
            cookies to accept. You can change your preferences at any time through your account settings or by 
            clearing your browser cookies.
          </p>

          <h3>6.3 Opt-Out Tools</h3>
          <p>You can opt out of certain third-party cookies:</p>
          <ul>
            <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
            <li><strong>Google AdSense:</strong> <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
            <li><strong>Network Advertising Initiative:</strong> <a href="http://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer">NAI Opt-Out</a></li>
            <li><strong>Digital Advertising Alliance:</strong> <a href="http://optout.aboutads.info" target="_blank" rel="noopener noreferrer">DAA Opt-Out</a></li>
          </ul>
        </section>

        <section>
          <h2>7. Do Not Track Signals</h2>
          <p>
            Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not 
            want to have your online activity tracked. Currently, there is no standard for how DNT signals should be 
            interpreted. We do not currently respond to DNT browser signals.
          </p>
        </section>

        <section>
          <h2>8. Impact of Disabling Cookies</h2>
          <p>
            If you choose to disable cookies, some features of our website may not function properly:
          </p>
          <ul>
            <li>You may need to log in repeatedly</li>
            <li>Your preferences may not be saved</li>
            <li>Some personalized features may not work</li>
            <li>Website performance may be affected</li>
          </ul>
        </section>

        <section>
          <h2>9. Updates to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
            updated policy on this page.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>If you have questions about our use of cookies, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a></li>
            <li><strong>Website:</strong> <a href="/contact">Contact Us</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default CookiePolicy;

