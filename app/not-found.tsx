import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/" className="rounded-lg border border-border px-4 py-2 hover:bg-muted">
          Home
        </Link>
        <Link href="/docs" className="rounded-lg border border-border px-4 py-2 hover:bg-muted">
          Documentation
        </Link>
        <Link href="/download" className="rounded-lg border border-border px-4 py-2 hover:bg-muted">
          Download
        </Link>
      </div>
    </div>
  );
}
