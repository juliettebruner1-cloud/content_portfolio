import { ExperienceRole } from "@/types";

/**
 * EDIT ME — professional experience, shown on /about. Never fabricated:
 * this array ships EMPTY. Add a role only once you have the real title,
 * company, and dates. The About page hides this section entirely while
 * it's empty rather than showing placeholder employers.
 *
 * Example shape to copy:
 *
 * {
 *   id: "role-1",
 *   role: "Social Media Strategist",
 *   company: "Company Name",
 *   location: "New York, NY",
 *   startDate: "2022-06",
 *   endDate: undefined, // omit for "present"
 *   owned: ["What you owned, in your own words"],
 *   impact: ["A specific, real result — with a number if you have one"],
 *   skills: ["Content Strategy", "Copywriting"],
 * }
 */
export const experience: ExperienceRole[] = [];
