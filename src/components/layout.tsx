export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-slate-700 text-center pt-4 flex flex-col items-center min-h-screen">
      {children}
    </main>
  );
}
