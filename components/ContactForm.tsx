import { useState } from 'react';

/**
 * ContactForm Component
 * Uses Formspree (or any external form endpoint) to capture inquiries
 * Replace `YOUR_FORMSPREE_ID` with your actual Formspree form ID
 */
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  return (
    <div className="card max-w-2xl mx-auto p-6">
      <h3 className="text-2xl font-semibold mb-4">Make an Offer</h3>
      <p className="text-gray-400 mb-4">Submit an inquiry and we'll get back to you with a secure purchase process.</p>

      <form
        action="https://formspree.io/f/YOUR_FORMSPREE_ID"
        method="POST"
        onSubmit={() => setStatus('sending')}
      >
        <label className="block mb-2 text-sm text-gray-300">Your Name</label>
        <input name="name" required className="w-full mb-4 p-3 rounded bg-dark-900 border border-gray-800" />

        <label className="block mb-2 text-sm text-gray-300">Email</label>
        <input type="email" name="email" required className="w-full mb-4 p-3 rounded bg-dark-900 border border-gray-800" />

        <label className="block mb-2 text-sm text-gray-300">Message / Offer</label>
        <textarea name="message" rows={5} required className="w-full mb-4 p-3 rounded bg-dark-900 border border-gray-800" />

        <div className="flex items-center gap-4">
          <button type="submit" className="btn btn-primary">Send Offer</button>
          <a className="text-sm text-gray-400" href="mailto:khusanakihang@gmail.com">Or email: khusanakihang@gmail.com</a>
        </div>

        {status === 'sending' && <p className="text-sm text-gray-400 mt-3">Sending...</p>}
      </form>

      <p className="text-xs text-gray-500 mt-4">We recommend using secure escrow for domain transfers.</p>
    </div>
  );
}
 