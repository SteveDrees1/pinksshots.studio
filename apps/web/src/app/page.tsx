import Link from "next/link";
import "./landing.css";

export default function HomePage() {
  return (
    <main className="landing">
      <div className="landing__grid" />
      <header className="landing__header">
        <h1 className="landing__title">pinkshots.studio</h1>
        <p className="landing__tagline">Portfolio. Futuristic. Yours.</p>
      </header>
      <section className="landing__cta">
        <Link href="/login" className="landing__btn">
          <span className="landing__btn-text">Login to manage</span>
          <span className="landing__btn-line" />
        </Link>
        <p className="landing__hint">Owners: sign in to edit, add, and delete your content</p>
      </section>
      <footer className="landing__footer">
        <span>© pinkshots.studio</span>
      </footer>
    </main>
  );
}
