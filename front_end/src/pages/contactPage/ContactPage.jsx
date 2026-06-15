export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
            <div className="mx-auto max-w-5xl space-y-8">
                <section>
                    <p className="text-sm font-medium uppercase tracking-wide text-blue-400">Contact Us</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Reach the SupportHub team.</h1>
                    <p className="mt-4 text-slate-400">Use these channels for product questions, account help, billing questions, or support guidance. The goal is to keep the contact path simple and easy to understand from the first visit.</p>
                </section>

                <section className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-xl font-semibold text-white">Email</h2>
                        <p className="mt-3 text-slate-400">support@supporthub.local</p>
                        <p className="mt-3 text-sm text-slate-500">Best for ticket follow-up and general platform questions.</p>
                    </div>
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-xl font-semibold text-white">Phone</h2>
                        <p className="mt-3 text-slate-400">+1 (555) 123-4567</p>
                        <p className="mt-3 text-sm text-slate-500">Available during business hours for urgent account issues.</p>
                    </div>
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-xl font-semibold text-white">Hours</h2>
                        <p className="mt-3 text-slate-400">Monday to Friday, 9:00 AM to 6:00 PM</p>
                        <p className="mt-3 text-sm text-slate-500">Response time depends on priority and ticket volume.</p>
                    </div>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-2xl font-semibold text-white">Need help with a ticket?</h2>
                        <p className="mt-3 text-slate-400">If you are already signed in, the fastest path is to open or update your existing ticket so the support history stays connected.</p>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-2xl font-semibold text-white">Common topics</h2>
                        <ul className="mt-4 space-y-3 text-slate-400">
                            <li>• Account access and login issues.</li>
                            <li>• Ticket creation and attachment help.</li>
                            <li>• Status updates and assignment questions.</li>
                            <li>• Admin workflow and dashboard support.</li>
                        </ul>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <h2 className="text-2xl font-semibold text-white">Send a message</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <input
                            placeholder="Your name"
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />
                        <input
                            placeholder="Your email"
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />
                    </div>
                    <textarea
                        rows={5}
                        placeholder="How can we help?"
                        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />
                    <button className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
                        Send Message
                    </button>
                </section>
            </div>
        </div>
    );
}