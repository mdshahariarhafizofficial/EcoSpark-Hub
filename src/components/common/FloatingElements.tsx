'use client';

import ScrollToTop from './ScrollToTop';
import AIChatModal from './AIChatModal';

export default function FloatingElements() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      <div className="pointer-events-auto">
        <ScrollToTop />
      </div>
      <div className="pointer-events-auto">
        <AIChatModal />
      </div>
    </div>
  );
}
