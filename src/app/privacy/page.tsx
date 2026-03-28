export default function PrivacyPolicy() {
  const sections = [
    { title: 'Data Collection', content: 'We collect your name, email, and basic profile information when you register for an account. This is used to personalize your experience and facilitate project voting and funding.' },
    { title: 'Project Blueprints', content: 'When you submit a project, you grant EcoSpark Hub a license to display and distribute that blueprint. Paid content is only visible to verified purchasers.' },
    { title: 'Security', content: 'We employ industry-standard encryption and security protocols to protect your data. Payment information is handled exclusively by Stripe, and we do not store credit card details.' },
    { title: 'Cookies', content: 'We use essential cookies for authentication and performance. Third-party analytics cookies help us understand how users interact with the platform.' },
    { title: 'Updates', content: 'We may update this policy periodically. Your continued use of the platform after updates constitutes acceptance of the new terms.' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-24 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-12 md:p-16 rounded-3xl shadow-sm border border-neutral-200">
        <header className="mb-14 border-b border-neutral-100 pb-10">
           <div className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-4">Legal Policy</div>
           <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6">Privacy <span className="text-primary-600">Policy</span></h1>
           <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
             Transparency is our core value. Here's exactly how we handle your information and protect your ecological intellectual property.
           </p>
        </header>

        <div className="space-y-10 mb-16">
            {sections.map((section, i) => (
              <div key={i} className="group">
                 <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-sm font-bold group-hover:bg-primary-600 group-hover:text-white transition-colors">
                       {i + 1}
                    </span>
                    {section.title}
                 </h2>
                 <p className="text-base text-neutral-600 leading-relaxed pl-12 border-l-2 border-transparent group-hover:border-primary-200 transition-colors">
                    {section.content}
                 </p>
              </div>
            ))}
        </div>

        <div className="mt-16 p-10 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
           <h3 className="font-bold text-neutral-900 mb-3 uppercase tracking-widest text-xs">Questions?</h3>
           <p className="text-neutral-500 mb-6 italic text-sm">
              If you have any questions regarding your data or our privacy practices, please contact our legal team.
           </p>
           <a href="mailto:legal@ecosparkhub.com" className="px-8 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors inline-block text-sm">
              legal@ecosparkhub.com
           </a>
        </div>

        <div className="mt-10 text-xs text-neutral-400 text-center font-medium">
           Last Updated: May 24, 2024
        </div>
      </div>
    </div>
  );
}
