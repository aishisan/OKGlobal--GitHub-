"use client";

import { FormEvent, useState } from "react";

type SubmissionState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string };

const highlights = [
  ["01", "Shengfang Furniture Expo City", "Discover outstanding value across living room, dining, bedroom, office, hotel, outdoor furniture and more."],
  ["02", "Factories & Source Suppliers", "Explore collections, materials and manufacturing capabilities while discussing pricing, customization, shipping and export solutions."],
  ["03", "Fully Hosted Journey", "Flights between Shanghai and Tianjin, hotel accommodation, transfers and meals are provided free for invited guests."],
];

export function InvitationExperience() {
  const [submission, setSubmission] = useState<SubmissionState>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmission({ kind: "sending" });

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { reference?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "We could not save your response.");

      setSubmission({ kind: "success", reference: result.reference || "Confirmed" });
      form.reset();
    } catch (error) {
      setSubmission({
        kind: "error",
        message: error instanceof Error ? error.message : "We could not save your response.",
      });
    }
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-shade" />
        <div className="hero-frame" aria-hidden="true" />
        <nav className="nav shell" aria-label="Invitation navigation">
          <a className="brand" href="#top" aria-label="OK Global invitation home">
            <img src="/okglobal-logo.png" alt="OK Global" />
            <span>Hebei OK Global Trade Co., Ltd.</span>
          </a>
          <a className="nav-rsvp" href="#rsvp">RSVP</a>
        </nav>

        <div className="hero-content shell">
          <p className="eyebrow">2026 Exclusive Business Invitation</p>
          <h1>Invitation</h1>
          <p className="hero-subtitle">An exclusive furniture business journey across Shanghai, Tianjin and Shengfang.</p>
          <div className="hero-date">
            <span>September</span>
            <strong>11—13</strong>
            <span>2026</span>
          </div>
          <a className="primary-button" href="#rsvp">Confirm Your Attendance</a>
        </div>

        <a className="scroll-cue" href="#welcome" aria-label="Continue to the invitation">
          <span>Discover the journey</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="welcome section" id="welcome">
        <div className="shell narrow center">
          <p className="eyebrow gold">A Formal Invitation</p>
          <h2>Dear Valued Client,</h2>
          <p className="script-word">Greetings!</p>
          <div className="ornament" aria-hidden="true"><span>◆</span></div>
          <p className="lead">
            Come visit us at Shengfang Furniture Expo City for the best value-for-money furniture products. On display will be Living Room Furniture, Dining Furniture, Bedroom Furniture, Office Furniture, Hotel Furniture, Outdoor Furniture and more.
          </p>
          <p>
            We are also proud to partner with FurnitureAndFurnishing.com, Asia&apos;s number 1 furniture trade magazine, to bring you this exclusive invitation to explore Shengfang—one of China&apos;s largest and most dynamic furniture manufacturing hubs.
          </p>
          <p>
            From September 11–13, we will bring you to see our entire portfolio of products and factories. All travel arrangements will be provided free, including itinerary planning, flights between Shanghai and Shengfang via Tianjin Binhai Airport, hotel accommodation, transfers and meals.
          </p>
          <p className="limited-note">Slots are limited and available on a first-come, first-served basis.</p>
          <p className="signature">Explore Opportunities · Build Partnerships · Grow Together</p>
        </div>
      </section>

      <section className="journey section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow gold">The Experience</p>
            <h2>Direct access to the heart of furniture manufacturing.</h2>
          </div>
          <div className="highlight-grid">
            {highlights.map(([number, title, copy]) => (
              <article className="highlight" key={number}>
                <span className="number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="itinerary section" id="itinerary">
        <div className="shell itinerary-layout">
          <div className="itinerary-intro">
            <p className="eyebrow gold">Exclusive Itinerary</p>
            <h2>Three remarkable days, thoughtfully arranged.</h2>
            <p>This exclusive business visit offers direct access to one of China&apos;s largest furniture manufacturing hubs. Our team will coordinate the complete journey and provide dedicated assistance throughout.</p>
            <div className="travel-card">
              <div><span>Recommended Flight 1</span><strong>CA2826 · 10:50–12:55</strong></div>
              <div><span>Recommended Flight 2</span><strong>MU5227 · 14:05–16:05</strong></div>
            </div>
          </div>

          <div className="timeline">
            <article>
              <div className="date-badge"><strong>11</strong><span>SEP</span></div>
              <div>
                <p className="route">Shanghai → Tianjin</p>
                <h3>Arrival, River Cruise & Welcome Dinner</h3>
                <div className="schedule-list">
                  <p><time>11:55–14:15</time><span>In-flight (times correspond to the recommended flight)</span></p>
                  <p><time>14:15–15:30</time><span>Transfer from airport to hotel</span></p>
                  <p><time>15:30–17:00</time><span>Stop 1: Check-in and rest at hotel</span></p>
                  <p><time>17:00–17:30</time><span>Drive to Italian-Style District Pier</span></p>
                  <p><time>17:30–18:30</time><span>Stop 2: Haihe River cruise</span></p>
                  <p><time>18:30–18:40</time><span>Walk to Flo French Restaurant</span></p>
                  <p><time>18:40–19:00</time><span>Pre-dinner reception</span></p>
                  <p><time>19:00–21:00</time><span>Welcome dinner at Flo French Restaurant</span></p>
                  <p><time>21:00–21:40</time><span>Return to hotel</span></p>
                </div>
              </div>
            </article>
            <article>
              <div className="date-badge"><strong>12</strong><span>SEP</span></div>
              <div>
                <p className="route">Tianjin → Shengfang</p>
                <h3>Preview Exhibition & Factory Tour</h3>
                <div className="schedule-list">
                  <p><time>09:00–12:00</time><span>Shengfang Preview Exhibition</span></p>
                  <p><time>14:00–17:00</time><span>Factory inspection (subject to actual conditions)</span></p>
                </div>
              </div>
            </article>
            <article>
              <div className="date-badge"><strong>13</strong><span>SEP</span></div>
              <div>
                <p className="route">Tianjin → Departure</p>
                <h3>Airport or Train Station Transfer</h3>
                <div className="schedule-list">
                  <p><time>09:00–12:00</time><span>Transfer to the airport for departure</span></p>
                  <p><time>By arrangement</time><span>Guests leaving for other cities will receive a car transfer to the airport or train station, with airfare reimbursement for flights back to Shanghai.</span></p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="rsvp-section section" id="rsvp">
        <div className="shell rsvp-layout">
          <div className="rsvp-copy">
            <p className="eyebrow">Your Place Is Reserved</p>
            <h2>We look forward to welcoming you.</h2>
            <p>Please share your attendance and travel preferences so our team can prepare your visit with care.</p>
            <div className="privacy-note">
              <strong>Privacy note</strong>
              <span>We only collect the information needed to arrange this visit. Passport or identity documents will never be requested through this form.</span>
            </div>
          </div>

          <div className="form-panel">
            {submission.kind === "success" ? (
              <div className="success" role="status">
                <span className="success-mark">✓</span>
                <p className="eyebrow gold">Response Received</p>
                <h3>Thank you for your reply.</h3>
                <p>Our team will review your information and contact you with the next arrangements.</p>
                <p className="reference">Reference: <strong>{submission.reference}</strong></p>
                <button type="button" onClick={() => setSubmission({ kind: "idle" })}>Submit another response</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-heading">
                  <span>RSVP</span>
                  <p>Fields marked * are required.</p>
                </div>
                <div className="field-grid">
                  <label>Full Name *<input name="fullName" autoComplete="name" required maxLength={100} /></label>
                  <label>Company *<input name="company" autoComplete="organization" required maxLength={150} /></label>
                  <label>Job Title<input name="jobTitle" autoComplete="organization-title" maxLength={100} /></label>
                  <label>Country / Region *<input name="countryRegion" autoComplete="country-name" required maxLength={100} /></label>
                  <label>WhatsApp / Mobile *<input name="mobile" type="tel" autoComplete="tel" required maxLength={40} /></label>
                  <label>Email *<input name="email" type="email" autoComplete="email" required maxLength={150} /></label>
                  <label>Attendance *
                    <select name="attendanceStatus" required defaultValue="">
                      <option value="" disabled>Please select</option>
                      <option value="attending">I will attend</option>
                      <option value="considering">I am considering</option>
                      <option value="unable">I am unable to attend</option>
                    </select>
                  </label>
                  <label>Number of Guests *
                    <select name="guestCount" required defaultValue="1">
                      {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}</option>)}
                    </select>
                  </label>
                  <label className="wide">Departure City<input name="departureCity" maxLength={100} /></label>
                  <label className="wide">Business Interests<textarea name="businessInterests" rows={3} maxLength={800} placeholder="Products, categories or cooperation interests" /></label>
                  <label className="wide">Dietary Requirements<textarea name="dietaryRequirements" rows={2} maxLength={500} /></label>
                  <label className="wide">Special Assistance<textarea name="specialAssistance" rows={2} maxLength={500} /></label>
                </div>
                <label className="consent">
                  <input name="consent" type="checkbox" value="yes" required />
                  <span>I agree that Hebei OK Global Trade Co., Ltd. may use this information to coordinate the invitation and travel arrangements. *</span>
                </label>
                {submission.kind === "error" && <p className="form-error" role="alert">{submission.message}</p>}
                <button className="submit-button" type="submit" disabled={submission.kind === "sending"}>
                  {submission.kind === "sending" ? "Sending…" : "Send My RSVP"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div className="footer-brand">
            <img src="/okglobal-logo.png" alt="" />
            <strong>Hebei OK Global Trade Co., Ltd.</strong>
          </div>
          <p>September 11—13, 2026 · Shanghai · Tianjin · Shengfang</p>
        </div>
      </footer>
    </main>
  );
}
