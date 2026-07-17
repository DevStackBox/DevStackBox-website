export default function DocsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6">{children}</div>
  );
}
