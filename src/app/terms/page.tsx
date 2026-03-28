export default function TermsPage() {
  const sections = [
    { title: 'User Responsibilities', content: 'As a member of the EcoSpark community, you are responsible for maintaining the accuracy of your account information and ensuring that your submissions are respectful and legally compliant.' },
    { title: 'Intellectual Property', content: 'You retain ownership of your original ideas, but by submitting them to EcoSpark Hub, you grant us a non-exclusive license to display and distribute that content to our users.' },
    { title: 'Payment and Funding', content: 'Payments for premium ideas are non-refundable and processed through Stripe. Purchasers gain access to the full blueprint and any associated files for personal or community use only.' },
    { title: 'Moderation', content: 'EcoSpark Hub reserves the right to moderate, hide, or remove any content that violates our community standards, including but not limited to hate speech, misinformation, or illegal activities.' },
    { title: 'Disclaimers', content: 'Ideas on this platform are submitted by the community. While we review submissions for technical feasibility, we do not guarantee the success or legal conformity of any project.' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-24 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-12 md:p-16 rounded-3xl shadow-sm border border-neutral-200">
        <header className="mb-14 border-b border-neutral-100 pb-10">
           <div className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-4">Our Agreement</div>
           <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6">Terms of <span className="text-primary-600">Service</span></h1>
           <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
             Our rules of engagement. By using EcoSpark Hub, you agree to join a community built on respect, accountability, and real environmental results.
           </p>
        </header>

        <div className="space-y-10 mb-16">
            {sections.map((section, i) => (
              <div key={i} className="group">
                 <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 text-sm font-bold group-hover:bg-primary-600 group-hover:text-white transition-colors">
                       {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                 </h2>
                 <p className="text-base text-neutral-600 leading-relaxed pl-12 border-l-2 border-transparent group-hover:border-primary-200 transition-colors">
                    {section.content}
                 </p>
              </div>
            ))}
        </div>

        <div className="p-10 bg-neutral-900 rounded-2xl text-center text-white relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3">Acceptance of Terms</h3>
              <p className="text-neutral-400 mb-6 max-w-lg mx-auto leading-relaxed text-sm">By creating an account and completing the registration process, you acknowledge that you have read and agreed to these terms.</p>
              <div className="text-xs font-bold text-primary-500 uppercase tracking-widest">ECOSPARK HUB LEGAL OFFICE • 2024</div>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="mt-10 text-xs text-neutral-400 text-center font-medium">
           Last Revised: May 24, 2024
        </div>
      </div>
    </div>
  );
}
