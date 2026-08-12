import { getDb } from "../../../db";
import { rsvps } from "../../../db/schema";

const requiredTextFields = ["fullName", "company", "countryRegion", "mobile", "email", "attendanceStatus"] as const;
const allowedAttendance = new Set(["attending", "considering", "unable"]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    for (const field of requiredTextFields) {
      if (!clean(body[field], 200)) return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const email = clean(body.email, 150).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const attendanceStatus = clean(body.attendanceStatus, 20);
    if (!allowedAttendance.has(attendanceStatus)) {
      return Response.json({ error: "Please select a valid attendance response." }, { status: 400 });
    }

    const guestCount = Number.parseInt(clean(body.guestCount, 2), 10);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 6) {
      return Response.json({ error: "Guest count must be between 1 and 6." }, { status: 400 });
    }

    if (body.consent !== "yes") {
      return Response.json({ error: "Consent is required before submitting." }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await getDb().insert(rsvps).values({
      id,
      fullName: clean(body.fullName, 100),
      company: clean(body.company, 150),
      jobTitle: clean(body.jobTitle, 100) || null,
      countryRegion: clean(body.countryRegion, 100),
      mobile: clean(body.mobile, 40),
      email,
      attendanceStatus,
      guestCount,
      departureCity: clean(body.departureCity, 100) || null,
      businessInterests: clean(body.businessInterests, 800) || null,
      dietaryRequirements: clean(body.dietaryRequirements, 500) || null,
      specialAssistance: clean(body.specialAssistance, 500) || null,
      consent: true,
    });

    return Response.json({ reference: `OKG-${id.slice(0, 8).toUpperCase()}` }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const setupMissing = message.includes("no such table") || message.includes("binding `DB`");
    return Response.json(
      { error: setupMissing ? "The RSVP service is being prepared. Please try again shortly." : "We could not save your response. Please try again." },
      { status: 500 },
    );
  }
}
