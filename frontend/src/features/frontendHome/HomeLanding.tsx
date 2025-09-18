import './HomeLanding.css';

const featureHighlights = [
  {
    title: 'TypeScript Express API',
    description: 'Start shipping REST endpoints backed by Prisma and PostgreSQL.',
  },
  {
    title: 'React + Vite Frontend',
    description: 'Build reactive dashboards with blazing-fast local dev tooling.',
  },
  {
    title: 'Docker-Native Setup',
    description: 'Run the database, API, and UI together with a single command.',
  }
];

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default function HomeLanding() {
  return (
    <section className="home-landing">
      <h2>Your PERN launchpad</h2>
      <p>
        Explore the scaffold, connect to PostgreSQL instantly, and evolve this foundation into a production-grade alumni
        platform.
      </p>
      <div className="feature-grid">
        {featureHighlights.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
