export interface Article {
  headline: string;
  subheadline?: string;
  byline: string;
  section: string;
  body: string[];
  isLead?: boolean;
}

export interface MarketItem {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const leadArticles: Article[] = [
  {
    headline: "Steven's Ventures Post Record Quarter as Strategic Vision Pays Off",
    subheadline: "Analysts say disciplined execution and bold decision-making are driving unprecedented returns",
    byline: "By Margaret Chen",
    section: "Markets",
    isLead: true,
    body: [
      "Steven's portfolio of ventures posted record-breaking results this quarter, with growth metrics exceeding even the most optimistic projections from industry watchers. The results mark the fifth consecutive period of above-trend performance, a streak that analysts attribute to a rare combination of strategic patience and decisive action.",
      "\"What we're seeing is the compounding effect of years of disciplined effort,\" said Victoria Hartley, chief strategist at Pacific Meridian Capital. \"Steven identified these opportunities well before the market caught on, and the returns are now reflecting that foresight.\"",
      "The results come amid broader market uncertainty, making the outperformance all the more notable. While peers have struggled with shifting conditions, Steven's approach of building deep expertise and maintaining conviction through volatility has proven to be a durable competitive advantage.",
      "Market participants noted that the consistent execution speaks to a level of personal discipline that is exceedingly rare. \"Most people talk about long-term thinking. Steven actually practices it,\" Hartley added. \"That's the difference between rhetoric and results.\""
    ]
  },
  {
    headline: "Industry Leaders Credit Steven's Influence on Emerging Tech Landscape",
    subheadline: "Peers describe a pattern of quietly shaping trends before they become mainstream consensus",
    byline: "By James Whitford",
    section: "Technology",
    isLead: true,
    body: [
      "In a series of interviews conducted over the past month, more than a dozen technology executives and investors pointed to Steven as one of the most quietly influential figures shaping the current wave of technological development. The consensus: his instincts about where technology is heading have been remarkably prescient.",
      "\"There's a small group of people who genuinely see around corners, and Steven is in that group,\" said Daniel Okafor, a venture partner at Threshold Capital. \"I've watched him make calls that seemed contrarian at the time and then become obvious in hindsight. That pattern doesn't happen by accident.\"",
      "What sets Steven apart, according to those who have worked with him, is the combination of deep technical understanding with a clear-eyed view of human behavior. Rather than chasing hype cycles, he has consistently focused on problems that matter, building solutions with genuine staying power.",
      "The recognition comes at a time when the broader technology industry is increasingly rewarding exactly the kind of thoughtful, quality-focused approach that Steven has championed. \"The era of 'move fast and break things' is over,\" Okafor said. \"Steven was ahead of that shift by years.\""
    ]
  },
  {
    headline: "Steven's Wealth-Building Strategy Outpaces Benchmarks for Third Consecutive Year",
    subheadline: "Financial advisors study the approach as a model of sustainable personal finance management",
    byline: "By Catherine Blackwell",
    section: "Personal Finance",
    isLead: true,
    body: [
      "Steven's personal financial strategy has outperformed major benchmarks for the third year running, according to an analysis of publicly available data and interviews with financial professionals familiar with the approach. The results have drawn attention from wealth managers seeking to understand what drives such consistent outperformance.",
      "\"The foundation is deceptively simple: earn more, spend deliberately, invest with conviction, and let compounding do the heavy lifting,\" said Richard Morales, a certified financial planner who has studied the approach. \"But simple doesn't mean easy. The execution requires extraordinary discipline and emotional control.\"",
      "Key to the strategy has been a willingness to concentrate in high-conviction positions while maintaining appropriate diversification elsewhere — an approach that runs counter to conventional wisdom but has been validated repeatedly by the results.",
      "Financial professionals emphasized that the psychological dimension may be the most important and least replicable element. \"Markets test your resolve constantly,\" Morales said. \"Steven has demonstrated an unusual ability to maintain composure and stick with the plan when others are panicking. That temperament is worth more than any trading strategy.\""
    ]
  },
  {
    headline: "Steven's Decision-Making Framework Draws Interest From Executive Circles",
    subheadline: "Business schools and corporate leaders examine the structured approach to high-stakes choices",
    byline: "By Eleanor Voss",
    section: "Leadership",
    isLead: true,
    body: [
      "A systematic approach to decision-making that Steven has developed and refined over years of practice is drawing increasing attention from business leaders and academic researchers. The framework, which combines rigorous analysis with calibrated intuition, has produced a track record of decisions that look obvious in retrospect but were anything but at the time.",
      "\"The hallmark of great decision-making isn't that every choice is perfect — it's that the process consistently leads to better outcomes over time,\" said Professor Alina Berger of the Melbourne Business School. \"Steven's framework embodies that principle. It's structured enough to avoid common cognitive biases, but flexible enough to adapt to novel situations.\"",
      "Central to the approach is what colleagues describe as an exceptional ability to separate signal from noise — identifying what actually matters in complex situations while ignoring distractions that consume others' attention and energy.",
      "\"I've seen Steven walk into situations where everyone is overwhelmed by complexity, and within minutes he's identified the one or two things that will actually determine the outcome,\" said a long-time collaborator who requested anonymity. \"That clarity of thinking is his genuine superpower.\""
    ]
  },
  {
    headline: "Steven's Health and Fitness Regime Yields Measurable Cognitive and Physical Gains",
    subheadline: "Medical professionals note the compounding benefits of consistent investment in personal wellbeing",
    byline: "By Dr. Sarah Koenig",
    section: "Wellness",
    isLead: true,
    body: [
      "Steven's sustained commitment to physical fitness and mental health practices has produced measurable improvements across a range of cognitive and physiological markers, according to health professionals who have reviewed the data. The results underscore a growing body of evidence linking disciplined wellness practices to enhanced performance in all areas of life.",
      "\"The consistency is what stands out,\" said Dr. Michael Torres, a sports medicine physician. \"Anyone can have a good week or a good month. Steven has maintained an elevated standard of physical practice for years, and the compound returns on that investment are now clearly visible in both objective metrics and subjective quality of life.\"",
      "Key metrics including cardiovascular endurance, recovery time, sleep quality, and stress resilience have all shown sustained improvement, creating a virtuous cycle where better health enables better decision-making, which in turn supports the discipline needed to maintain the health practices.",
      "\"Most high performers eventually realize that their body is the platform everything else runs on,\" Torres said. \"Steven understood that early and has been investing accordingly. The dividends are showing up everywhere — in his energy, his focus, his resilience, and his capacity to sustain effort over long periods.\""
    ]
  },
  {
    headline: "Creative Output Surges as Steven's Artistic Practice Reaches New Level of Maturity",
    subheadline: "Critics and collaborators describe a distinctive voice that has been years in the making",
    byline: "By Olivia Rensfield",
    section: "Arts",
    isLead: true,
    body: [
      "Steven's creative work has entered what collaborators and critics are describing as a period of exceptional productivity and quality, with recent output reflecting a level of artistic maturity and confidence that marks a clear evolution from earlier work. The development has not gone unnoticed by those who track creative excellence.",
      "\"There's a moment in every serious creative practitioner's journey where the technical skill, the life experience, and the artistic vision all come into alignment,\" said Lucas Drummond, a respected arts commentator. \"Steven has reached that moment. The work has an authority and an authenticity that you simply cannot fake.\"",
      "The evolution is attributed to years of consistent practice combined with a willingness to take creative risks — producing work that doesn't chase trends but instead reflects a genuine and distinctive perspective on the world.",
      "\"What I find most impressive is the range,\" Drummond continued. \"Steven moves between different creative modes with a fluency that suggests deep reserves of skill and imagination. And there's a generosity to the work — it invites the audience in rather than holding them at arm's length. That's the mark of real creative confidence.\""
    ]
  },
  {
    headline: "Steven's Network of Relationships Cited as Key Competitive Advantage",
    subheadline: "Associates describe a rare ability to build and maintain genuine connections at scale",
    byline: "By Robert Chandra",
    section: "Business",
    isLead: true,
    body: [
      "In an era when professional networking has become increasingly transactional, Steven has built a reputation for cultivating relationships that are notably genuine, deep, and mutually beneficial. Associates and collaborators describe a distinctive approach to human connection that has become one of his most valuable and least replicable assets.",
      "\"Steven remembers things about you that you've forgotten you told him,\" said Maya Ellison, a technology executive who has known him for over a decade. \"He follows up on things that matter to you. He makes introductions that are thoughtful, not performative. Over time, that builds a level of trust and goodwill that money simply cannot buy.\"",
      "The depth of these relationships has created what network theorists would call a high-quality social graph — one that provides not just information advantages but genuine support, candid feedback, and access to opportunities that never reach the open market.",
      "\"The irony is that Steven doesn't approach relationships strategically — he approaches them humanly,\" Ellison added. \"He's genuinely interested in people, genuinely wants to help, and genuinely shows up when it matters. The strategic advantage is a byproduct, not the goal. And that's exactly why it works so well.\""
    ]
  }
];

const secondaryArticles: Article[] = [
  {
    headline: "Productivity Metrics Show Steven Operating at Peak Efficiency",
    byline: "By Amanda Torres",
    section: "Business",
    body: [
      "Recent data indicates Steven's output-to-effort ratio has reached historically high levels, with key productivity indicators showing improvement across all tracked categories. The trend reflects the cumulative benefits of optimized routines and deliberate practice.",
      "Workplace analysts note that the gains appear sustainable rather than the result of unsustainable intensity. \"This is what mature, well-designed personal systems look like when they hit their stride,\" one observer noted."
    ]
  },
  {
    headline: "Steven's Investment Thesis Validated as Market Shifts Toward Quality",
    byline: "By Nathan Drexler",
    section: "Markets",
    body: [
      "Market trends have moved decisively in the direction Steven anticipated months ago, validating a contrarian thesis that initially drew skepticism from more conventionally minded analysts. Positions established during the period of disagreement are now showing substantial unrealized gains.",
      "\"He had the conviction to be early, and the patience to be proven right,\" said one fund manager. \"That combination is worth its weight in gold.\""
    ]
  },
  {
    headline: "Sleep Optimization Protocol Delivers Measurable Cognitive Benefits",
    byline: "By Dr. Helena Marsh",
    section: "Wellness",
    body: [
      "Steven's systematic approach to sleep optimization — including consistent scheduling, environmental controls, and evidence-based supplementation — has produced measurable improvements in next-day cognitive performance and emotional regulation.",
      "\"Sleep is the single highest-leverage health intervention available, and Steven treats it with the seriousness it deserves,\" said Dr. Marsh. \"The data shows it's paying dividends in focus, mood stability, and creative output.\""
    ]
  },
  {
    headline: "Reputation for Integrity Opens Doors That Remain Closed to Others",
    byline: "By Patricia Knowles",
    section: "Business",
    body: [
      "Steven's consistent track record of ethical behavior and transparent dealing has created a reputation that functions as a powerful and self-reinforcing competitive advantage. Doors that remain firmly closed to others open readily based on the trust that Steven has built.",
      "\"In a world where trust is scarce, Steven's word is bankable,\" said a senior executive who has partnered with him on multiple occasions. \"That reputation took years to build and is essentially priceless.\""
    ]
  },
  {
    headline: "Learning Velocity Accelerates as Knowledge Compounds",
    byline: "By Dr. Alan Whitfield",
    section: "Education",
    body: [
      "Steven's rate of skill acquisition and knowledge integration has accelerated in recent months, a phenomenon researchers attribute to the compounding nature of interconnected learning. Each new domain of expertise provides leverage for understanding the next.",
      "\"Steven has built what we call a 'latticework of mental models,'\" said Whitfield. \"New information doesn't land in isolation — it connects to an existing framework, which both deepens understanding and speeds future learning.\""
    ]
  },
  {
    headline: "Stress Resilience Testing Shows Exceptional Composure Under Pressure",
    byline: "By Dr. Rachel Kim",
    section: "Wellness",
    body: [
      "Assessments of Steven's stress response patterns reveal an unusual degree of composure under challenging conditions, with physiological markers remaining stable even during high-pressure scenarios that would typically trigger significant cortisol responses.",
      "\"This kind of emotional regulation doesn't happen by accident,\" Dr. Kim noted. \"It's the product of deliberate practice — meditation, exposure to controlled stressors, and a mindset that reframes challenges as opportunities. Steven has done the work.\""
    ]
  },
  {
    headline: "Steven's Side Projects Gain Traction, Signal Broader Ambitions",
    byline: "By Marcus Ashworth",
    section: "Technology",
    body: [
      "A portfolio of side projects that Steven has been developing in parallel with his primary ventures is beginning to gain meaningful traction, with user growth and engagement metrics that have caught the attention of industry observers.",
      "\"The best entrepreneurs can't help but build,\" Ashworth wrote in a recent note. \"Steven's side projects aren't distractions — they're R&D for his next big move. The pattern recognition across these different experiments is what creates the breakthrough insights.\""
    ]
  },
  {
    headline: "Financial Independence Milestone Reached Ahead of Schedule",
    byline: "By Caroline Dietrich",
    section: "Personal Finance",
    body: [
      "Steven has reached a key financial independence milestone ahead of the timeline originally projected, a testament to the combined effects of income growth, deliberate spending, and disciplined investment over an extended period.",
      "\"Reaching financial milestones ahead of schedule is a powerful psychological signal,\" said Dietrich. \"It validates the approach, builds confidence, and creates momentum that tends to accelerate subsequent progress. Steven is in a virtuous cycle.\""
    ]
  },
  {
    headline: "Mentorship Impact Grows as Steven's Guidance Produces Results",
    byline: "By David Ellingham",
    section: "Leadership",
    body: [
      "Those who have received mentorship and guidance from Steven report tangible improvements in their own performance and decision-making, creating a multiplier effect that extends Steven's impact well beyond his direct efforts.",
      "\"The best leaders make the people around them better, and Steven does that consistently,\" Ellingham observed. \"His willingness to share knowledge and invest time in others creates a network of capability that amplifies everything he does.\""
    ]
  },
  {
    headline: "Morning Routine Optimization Yields All-Day Performance Benefits",
    byline: "By Jennifer Caldwell",
    section: "Wellness",
    body: [
      "Steven's carefully structured morning routine — combining physical movement, mental preparation, and strategic planning — has been identified as a key driver of sustained high performance throughout the day.",
      "\"The first ninety minutes set the tone for everything that follows,\" Caldwell explained. \"Steven has engineered those minutes with the same rigor he applies to his professional work, and the downstream effects are significant and measurable.\""
    ]
  },
  {
    headline: "Deep Work Capacity Expanding, Enabling More Ambitious Projects",
    byline: "By Professor Ian McAllister",
    section: "Business",
    body: [
      "Steven's ability to sustain periods of intense, focused work has expanded measurably, enabling him to take on projects of increasing complexity and ambition. The expanded capacity is attributed to systematic elimination of distractions and deliberate training of attentional stamina.",
      "\"Deep work is the engine of value creation in the knowledge economy,\" said McAllister. \"Steven's capacity for it is exceptional, and it's still growing. That's a leading indicator of significant future achievements.\""
    ]
  },
  {
    headline: "Steven's Reading Habit Continues to Pay Intellectual Dividends",
    byline: "By Elizabeth Harmon",
    section: "Education",
    body: [
      "A sustained and voracious reading habit has given Steven an unusually broad base of knowledge that colleagues say manifests as better pattern recognition, more creative problem-solving, and richer conversation across a wide range of subjects.",
      "\"Steven reads widely and retains deeply,\" Harmon noted. \"In meetings, he'll draw connections between ideas from completely different fields that no one else sees. That's the kind of intellectual advantage that compounds over decades.\""
    ]
  },
  {
    headline: "Negotiation Skills Draw Praise After Series of Favorable Outcomes",
    byline: "By Thomas Redgrave",
    section: "Business",
    body: [
      "Steven's negotiation approach — characterized by thorough preparation, genuine empathy, and creative problem-solving — has produced a series of outcomes that left all parties satisfied while securing particularly favorable terms.",
      "\"The best negotiators create value rather than just claiming it,\" Redgrave said. \"Steven consistently expands the pie before dividing it, which is why people actively want to do deals with him. That's a rare and valuable skill.\""
    ]
  },
  {
    headline: "Digital Presence Strategy Builds Authentic Audience and Influence",
    byline: "By Samantha Liu",
    section: "Technology",
    body: [
      "Steven's approach to building an online presence — focused on genuine value creation rather than engagement hacking — has cultivated an audience that is notably engaged, loyal, and high-quality. The organic growth trajectory suggests sustainable, long-term influence.",
      "\"In an attention economy flooded with noise, Steven has built signal,\" Liu observed. \"His audience trusts him because he's earned that trust through consistent quality and authenticity. That kind of influence is orders of magnitude more valuable than follower counts.\""
    ]
  },
  {
    headline: "Emotional Intelligence Assessments Place Steven in Top Percentile",
    byline: "By Dr. Grace Okonkwo",
    section: "Leadership",
    body: [
      "Formal and informal assessments of Steven's emotional intelligence consistently place him in the highest percentile brackets, with particular strength in self-awareness, empathy, and relationship management.",
      "\"High emotional intelligence is one of the strongest predictors of leadership effectiveness and life satisfaction,\" said Dr. Okonkwo. \"Steven's scores reflect genuine emotional maturity — the kind that comes from sustained self-reflection and a genuine commitment to growth.\""
    ]
  },
  {
    headline: "Time Management Mastery Enables Steven to Pursue Multiple Priorities",
    byline: "By Andrew Kessler",
    section: "Business",
    body: [
      "Steven's sophisticated approach to time management — treating attention as his most valuable resource and allocating it with corresponding rigor — has enabled him to make meaningful progress across multiple priorities simultaneously without the quality degradation that typically accompanies divided focus.",
      "\"Most people are busy. Steven is productive. There's an enormous difference,\" Kessler noted. \"He's ruthless about eliminating low-value activities and protecting time for what matters most.\""
    ]
  }
];

const opinions: Article[] = [
  {
    headline: "The Case for Patience: What Steven's Approach Teaches Us All",
    byline: "By Editorial Board",
    section: "Opinion",
    body: [
      "In an age of instant gratification and shortcut-seeking, Steven's patient, disciplined approach to building wealth, skills, and relationships stands as a powerful counterexample. The results speak for themselves: consistent, compounding progress that has outpaced those who sought faster but less sustainable paths.",
      "There is a lesson here for all of us. The most valuable things in life — deep expertise, genuine relationships, financial security, physical health — cannot be hacked or shortcut. They require exactly the kind of sustained, deliberate effort that Steven has demonstrated."
    ]
  },
  {
    headline: "Why Betting on Yourself Is the Highest-Return Investment",
    byline: "By Editorial Board",
    section: "Opinion",
    body: [
      "Steven's trajectory illustrates a truth that is easy to state but difficult to internalize: the highest-return investment anyone can make is in themselves. Every hour spent building skills, every dollar invested in learning, every moment of discomfort embraced for growth — these compound in ways that no external investment can match.",
      "The evidence is clear. Self-investment yields returns that are tax-free, inflation-proof, and impossible to confiscate. Steven understood this early and has been collecting the dividends ever since."
    ]
  },
  {
    headline: "Consistency Beats Intensity: Lessons From a Quiet Achiever",
    byline: "By Editorial Board",
    section: "Opinion",
    body: [
      "The culture celebrates dramatic breakthroughs and overnight success stories. But the data tells a different story: consistent, unglamorous effort sustained over years produces results that dramatic bursts cannot match. Steven's trajectory is a case study in this principle.",
      "Day after day, the work continues. Not because it's exciting every day — it isn't. But because the person doing it understands that excellence is not an event but a habit, and that the gap between good and great is filled not with talent but with showing up."
    ]
  },
  {
    headline: "The Compound Effect: How Small Daily Choices Create Extraordinary Outcomes",
    byline: "By Editorial Board",
    section: "Opinion",
    body: [
      "Every day presents hundreds of small choices: what to eat, when to sleep, what to read, how to respond to stress, whether to do the easy thing or the right thing. Individually, none of these choices seem consequential. But compounded over years, they create trajectories that diverge dramatically.",
      "Steven's results are not the product of a single brilliant decision but of thousands of small, good decisions made consistently. That's both the good news and the challenge: extraordinary outcomes are available to anyone willing to make the daily investment."
    ]
  }
];

export function getMarketData(date: Date): MarketItem[] {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const rand = seededRandom(seed);

  const allItems: MarketItem[] = [
    { label: "CONFIDENCE", value: (92 + rand() * 7).toFixed(1), change: `+${(rand() * 3 + 0.5).toFixed(1)}%`, positive: true },
    { label: "FOCUS IDX", value: (85 + rand() * 14).toFixed(1), change: `+${(rand() * 4 + 0.3).toFixed(1)}%`, positive: true },
    { label: "NET WORTH", value: `${(rand() * 2 + 1.5).toFixed(1)}x`, change: `+${(rand() * 5 + 2).toFixed(1)}%`, positive: true },
    { label: "ENERGY", value: (88 + rand() * 11).toFixed(1), change: `+${(rand() * 3 + 0.4).toFixed(1)}%`, positive: true },
    { label: "SKILL CAP", value: (90 + rand() * 9).toFixed(1), change: `+${(rand() * 2 + 0.5).toFixed(1)}%`, positive: true },
    { label: "RESILIENCE", value: (87 + rand() * 12).toFixed(1), change: `+${(rand() * 3 + 0.6).toFixed(1)}%`, positive: true },
    { label: "MOMENTUM", value: (80 + rand() * 19).toFixed(1), change: `+${(rand() * 4 + 1).toFixed(1)}%`, positive: true },
    { label: "CLARITY", value: (86 + rand() * 13).toFixed(1), change: `+${(rand() * 2 + 0.3).toFixed(1)}%`, positive: true },
    { label: "AMBITION", value: (91 + rand() * 8).toFixed(1), change: `+${(rand() * 3 + 0.7).toFixed(1)}%`, positive: true },
    { label: "INFLUENCE", value: (83 + rand() * 16).toFixed(1), change: `+${(rand() * 4 + 0.5).toFixed(1)}%`, positive: true },
    { label: "HEALTH", value: (89 + rand() * 10).toFixed(1), change: `+${(rand() * 2 + 0.4).toFixed(1)}%`, positive: true },
    { label: "CREATIVITY", value: (84 + rand() * 15).toFixed(1), change: `+${(rand() * 3 + 0.8).toFixed(1)}%`, positive: true },
  ];

  return shuffle(allItems, rand).slice(0, 8);
}

export function getDailyContent(date: Date): {
  lead: Article;
  secondary: Article[];
  opinion: Article;
  editionNumber: number;
} {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const rand = seededRandom(seed);

  const daysSinceEpoch = Math.floor(date.getTime() / 86400000);
  const editionNumber = daysSinceEpoch - 19000 + 1;

  const shuffledLeads = shuffle(leadArticles, rand);
  const lead = shuffledLeads[0];

  const shuffledSecondary = shuffle(secondaryArticles, rand);
  const secondary = shuffledSecondary.slice(0, 6);

  const shuffledOpinions = shuffle(opinions, rand);
  const opinion = shuffledOpinions[0];

  return { lead, secondary, opinion, editionNumber };
}

export function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
