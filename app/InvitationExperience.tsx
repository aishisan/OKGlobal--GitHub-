"use client";

import { FormEvent, useState } from "react";

type SubmissionState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string };

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
          <h1>Invitation</h1>
          <p className="hero-subtitle">An exclusive visit to Shengfang International Furniture Centre and the heart of China&apos;s furniture manufacturing industry.</p>
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
            Come visit us at Shengfang International Furniture Centre (SFIFC) for the best value-for-money furniture products. On display will be Living Room Furniture, Dining Furniture, Bedroom Furniture, Office Furniture, Hotel Furniture, Outdoor Furniture and more.
          </p>
          <p>
            We are also proud to partner with FurnitureAndFurnishing.com, Asia&apos;s number 1 furniture trade magazine, to bring you this exclusive invitation to explore Shengfang—one of China&apos;s largest and most dynamic furniture manufacturing hubs.
          </p>
          <p>
            From September 11–13, we will bring you to see our entire portfolio of products and factories. All travel arrangements will be provided free, including itinerary planning, flights between Shanghai and Shengfang via Tianjin Binhai Airport, hotel accommodation, transfers and meals.
          </p>
          <p className="limited-note">Slots are limited and available on a first-come, first-served basis. Please contact us to reserve your place now.</p>
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow gold">Contact Us</p>
              <h3>Scan to connect with our team.</h3>
              <a href="mailto:operation@okglobaltrade.com">operation@okglobaltrade.com</a>
            </div>
            <div className="qr-wrap">
              <img src="/wechat-qr.png" alt="WeChat QR code for OK Global" />
              <span>WeChat</span>
            </div>
          </div>
          <p className="signature">Explore Opportunities · Grow Together</p>
        </div>
      </section>

      <section className="itinerary section" id="itinerary">
        <div className="shell itinerary-layout">
          <div className="itinerary-intro">
            <p className="eyebrow gold">Exclusive Itinerary</p>
            <h2>Three remarkable days, thoughtfully arranged.</h2>
            <p>This exclusive business visit offers direct access to one of China&apos;s largest furniture manufacturing hubs. Our team will coordinate the complete journey and provide dedicated assistance throughout.</p>
            <div className="travel-card">
              <div><span>Recommended Flight</span><strong>CA2840 · 11:55–14:15</strong></div>
              <div><span>Route</span><strong>Shanghai Pudong → Tianjin Binhai</strong></div>
            </div>
          </div>

          <div className="timeline">
            <article>
              <div className="date-badge"><strong>11</strong><span>SEP</span></div>
              <div>
                <p className="route">Shanghai → Tianjin</p>
                <h3>Arrival, Haihe River Cruise & Welcome Dinner</h3>
                <div className="schedule-list">
                  <p><time>11:55–14:15</time><span>Recommended flight CA2840 from Shanghai Pudong to Tianjin Binhai</span></p>
                  <p><time>Hosted</time><span>Flight tickets from Shanghai to Tianjin and hotel accommodation booked and paid for by OK Global</span></p>
                  <p><time>Evening</time><span>Haihe River sightseeing cruise and welcome dinner, followed by business discussions</span></p>
                </div>
              </div>
            </article>
            <article>
              <div className="date-badge"><strong>12</strong><span>SEP</span></div>
              <div>
                <p className="route">Tianjin → Shengfang</p>
                <h3>SFIFC Visit & Curated Factory Tour</h3>
                <div className="schedule-list">
                  <p><time>09:00–12:00</time><span>Visit to Shengfang International Furniture Centre</span></p>
                  <p><time>12:00–13:30</time><span>Hosted lunch at a local restaurant</span></p>
                  <p><time>14:00–17:00</time><span>Curated factory visits in Shengfang</span></p>
                  <p><time>18:00–20:00</time><span>Hosted dinner at a local restaurant</span></p>
                  <p><time>20:00–21:30</time><span>Transfer to Pan Pacific Hotel, Tianjin</span></p>
                </div>
              </div>
            </article>
            <article>
              <div className="date-badge"><strong>13</strong><span>SEP</span></div>
              <div>
                <p className="route">Tianjin → Shanghai / Shengfang</p>
                <h3>Departure Transfer or Extended SFIFC Visit</h3>
                <div className="schedule-list">
                  <p><time>09:00–12:00</time><span>Complimentary transfer to airport or train station, with airfare reimbursement provided for guests returning to Shanghai.</span></p>
                  <p><time>10:00–17:00</time><span>Guided Tour of Shengfang International Furniture Centre with dedicated business support. (For guests extending their stay)</span></p>
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
                  <div className="form-section-title wide"><span>01</span> Buyer Background Information</div>
                  <label>Company *<input name="company" autoComplete="organization" required maxLength={150} /></label>
                  <label>Country / Region *<input name="countryRegion" autoComplete="country-name" required maxLength={100} /></label>
                  <label className="wide">Business Description<textarea name="businessDescription" rows={2} maxLength={500} /></label>
                  <label>Annual Turnover<input name="annualTurnover" maxLength={100} /></label>
                  <label>Main Markets<input name="mainMarkets" maxLength={300} /></label>
                  <label>Contact Person *<input name="fullName" autoComplete="name" required maxLength={100} /></label>
                  <label>Job Title<input name="jobTitle" autoComplete="organization-title" maxLength={100} /></label>
                  <label>WhatsApp / Mobile *<input name="mobile" type="tel" autoComplete="tel" required maxLength={40} /></label>
                  <label>Email *<input name="email" type="email" autoComplete="email" required maxLength={150} /></label>
                  <label>Website<input name="website" type="url" placeholder="https://" maxLength={250} /></label>
                  <label>Number of Guests *
                    <select name="guestCount" required defaultValue="1">
                      {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}</option>)}
                    </select>
                  </label>
                  <label>Attendance *
                    <select name="attendanceStatus" required defaultValue="">
                      <option value="" disabled>Please select</option>
                      <option value="attending">I will attend</option>
                      <option value="considering">I am considering</option>
                      <option value="unable">I am unable to attend</option>
                    </select>
                  </label>
                  <label>Departure City<input name="departureCity" maxLength={100} /></label>
                  <label className="wide">Dietary Requirements<textarea name="dietaryRequirements" rows={2} maxLength={500} /></label>
                  <label className="wide">Special Assistance<textarea name="specialAssistance" rows={2} maxLength={500} /></label>

                  <div className="form-section-title wide"><span>02</span> Product Requirements</div>
                  <label>Product Name<input name="productName" maxLength={200} /></label>
                  <label>Quantity<input name="quantity" maxLength={100} /></label>
                  <label className="wide">Features / Specifications / Materials / Dimensions<textarea name="productSpecifications" rows={3} maxLength={1000} /></label>
                  <label className="wide">Packaging Requirements<textarea name="packagingRequirements" rows={2} maxLength={500} /></label>
                  <label>Target FOB Price (USD)<input name="fobPrice" maxLength={100} /></label>
                  <label>Product Picture Link<input name="productPictureLink" type="url" placeholder="https://" maxLength={500} /></label>
                  <label className="wide">Other Requirements / Remarks<textarea name="otherRequirements" rows={3} maxLength={1000} /></label>

                  <div className="form-section-title wide"><span>03</span> Supplier Qualification Requirements</div>
                  <label className="wide">Required Supplier Certifications<textarea name="supplierCertifications" rows={2} maxLength={500} /></label>
                  <label className="wide">Priority Considerations<textarea name="priorityConsiderations" rows={3} maxLength={800} placeholder="Environmental packaging, material grade or other priorities" /></label>
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
          <a href="mailto:operation@okglobaltrade.com">operation@okglobaltrade.com</a>
        </div>
      </footer>
    </main>
  );
}
