export default function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Live Logs Table</h1>

        <span className="text-sm text-muted-foreground">SSE Monitoring</span>
      </div>
    </header>
  );
}
