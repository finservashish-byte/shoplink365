const guides = [
  {
    title: "The Complete Guide to Choosing a Beard Trimmer in India",
    category: "Grooming",
    readTime: "8 Min Read",
    excerpt:
      "Battery life, blade quality, and price ranges — everything to check before you buy.",
  },
  {
    title: "5 Kitchen Tools Every Indian Home Cook Actually Needs",
    category: "Kitchen",
    readTime: "6 Min Read",
    excerpt:
      "Skip the gimmicks. These are the tools that earn their space on your counter.",
  },
  {
    title: "Building a Reading Habit: Where to Start",
    category: "Books",
    readTime: "5 Min Read",
    excerpt:
      "A beginner-friendly reading list across fiction, non-fiction, and self-help.",
  },
];

export default function GuidesPage() {
  return (
    <div className="px-5 md:px-16 pb-24 md:pb-16 pt-10">
      <span className="text-xs font-bold uppercase tracking-wide text-brass">
        Buying Guides
      </span>
      <h1 className="font-display text-3xl md:text-4xl mt-2 mb-8 max-w-2xl">
        Editorial guides to help you decide, not just compare
      </h1>

      <div className="flex flex-col gap-6">
        {guides.map((g) => (
          <article
            key={g.title}
            className="glass-tile p-6 flex flex-col md:flex-row gap-6 md:items-center"
          >
            <div className="md:w-1/3 aspect-[4/3] bg-[#EEE8DB] flex items-center justify-center">
              <span className="text-grey text-xs uppercase tracking-widest">
                Cover Image
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase border border-grey/30 px-2 py-1">
                  {g.category}
                </span>
                <span className="text-xs text-grey">{g.readTime}</span>
              </div>
              <h2 className="font-display text-xl md:text-2xl mb-2">
                {g.title}
              </h2>
              <p className="text-grey text-sm mb-4">{g.excerpt}</p>
              <button className="text-xs font-bold uppercase text-brass tracking-wide">
                Read Guide →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
