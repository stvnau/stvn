import { LeaderLesson as LeaderLessonType } from "@/lib/cache";

interface LeaderLessonProps {
  lesson: LeaderLessonType;
}

export default function LeaderLesson({ lesson }: LeaderLessonProps) {
  return (
    <div className="bg-[#f5f0e6] border border-rule-light p-5 mb-5">
      <p className="text-[10px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-accent mb-2">
        Today&rsquo;s Lesson in Leadership
      </p>
      <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold leading-snug mb-1">
        {lesson.title}
      </h3>
      <p className="text-[11px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider mb-3">
        {lesson.leaderName} &middot; {lesson.era}
      </p>
      <p className="font-[family-name:var(--font-serif)] text-sm leading-relaxed text-ink-light mb-3">
        {lesson.story}
      </p>
      <div className="border-t border-rule-light pt-3">
        <p className="text-[10px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-positive mb-1">
          Apply Today
        </p>
        <p className="font-[family-name:var(--font-serif)] text-sm leading-relaxed text-ink">
          {lesson.takeaway}
        </p>
        {lesson.interestConnection && (
          <p className="font-[family-name:var(--font-serif)] text-xs leading-relaxed text-ink-muted mt-2 italic">
            {lesson.interestConnection}
          </p>
        )}
      </div>
    </div>
  );
}
