export function Footer() {
  return (
    <footer className="border-t border-card-border py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} John K Johansen &middot; Built with
        Next.js
      </div>
    </footer>
  );
}
