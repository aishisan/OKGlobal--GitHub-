import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rsvps = sqliteTable(
  "rsvps",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    company: text("company").notNull(),
    jobTitle: text("job_title"),
    countryRegion: text("country_region").notNull(),
    mobile: text("mobile").notNull(),
    email: text("email").notNull(),
    attendanceStatus: text("attendance_status").notNull(),
    guestCount: integer("guest_count").notNull().default(1),
    departureCity: text("departure_city"),
    businessInterests: text("business_interests"),
    dietaryRequirements: text("dietary_requirements"),
    specialAssistance: text("special_assistance"),
    consent: integer("consent", { mode: "boolean" }).notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("rsvps_email_idx").on(table.email), index("rsvps_created_at_idx").on(table.createdAt)],
);
