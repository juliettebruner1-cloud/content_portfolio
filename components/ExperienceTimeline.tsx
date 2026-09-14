import { experience } from "@/data/experience";
import { formatDate } from "@/lib/utils";

export function ExperienceTimeline() {
  if (experience.length === 0) {
    return (
      <p className="label border-y hairline py-10 text-taupe">
        Experience — development placeholder. Add real roles in{" "}
        <code className="text-stone">data/experience.ts</code>.
      </p>
    );
  }

  return (
    <div className="divide-y hairline border-y hairline">
      {experience.map((role) => (
        <div key={role.id} className="grid gap-4 py-8 sm:grid-cols-[220px_1fr]">
          <div>
            <p className="label text-taupe">
              {formatDate(role.startDate)} — {role.endDate ? formatDate(role.endDate) : "Present"}
            </p>
            <p className="mt-2 font-serif text-xl text-ivory">{role.role}</p>
            <p className="text-sm text-stone">{role.company}</p>
            {role.location && <p className="text-xs text-taupe">{role.location}</p>}
          </div>
          <div className="space-y-4">
            {role.owned.length > 0 && (
              <div>
                <p className="label text-taupe">What I Owned</p>
                <ul className="mt-2 space-y-1 text-sm text-stone">
                  {role.owned.map((item, i) => (
                    <li key={i}>— {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {role.impact.length > 0 && (
              <div>
                <p className="label text-taupe">Selected Impact</p>
                <ul className="mt-2 space-y-1 text-sm text-stone">
                  {role.impact.map((item, i) => (
                    <li key={i}>— {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {role.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {role.skills.map((skill) => (
                  <span key={skill} className="label border hairline px-2 py-1 text-taupe">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
