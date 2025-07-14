import Link from "next/link";
import { PhotoIcon, DocumentTextIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="h-screen bg-background text-foreground font-[family-name:var(--font-inter)] flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-accent flex items-center gap-2 hover:text-accent-hover transition-colors duration-300 font-bold">
            <div className="flex flex-col">

              <span className="text-xl font-bold">placeholder.guru</span>
              <span className="text-xs text-muted">placeholder apis for developers</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center" style={{ zoom: 1.4 }}>
          <p className="text-lg text-muted mb-12 max-w-xl mx-auto">
            What do you want to generate?
          </p>

          {/* Tools */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/image" className="group">
              <div className="p-6 rounded-xl border border-border hover:border-accent transition-all duration-300 bg-background hover:bg-accent/5">
                <PhotoIcon className="w-10 h-10 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">Images</h3>
                <p className="text-sm text-muted mb-3">Custom placeholder images</p>
                <div className="text-xs text-accent font-mono opacity-70">
                  /api/image?width=800&height=600
                </div>
              </div>
            </Link>

            <Link href="/json" className="group">
              <div className="p-6 rounded-xl border border-border hover:border-accent transition-all duration-300 bg-background hover:bg-accent/5">
                <DocumentTextIcon className="w-10 h-10 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">JSON Data</h3>
                <p className="text-sm text-muted mb-3">Sample data for testing</p>
                <div className="text-xs text-accent font-mono opacity-70">
                  /api/json?type=users&count=10
                </div>
              </div>
            </Link>

            <Link href="/text" className="group">
              <div className="p-6 rounded-xl border border-border hover:border-accent transition-all duration-300 bg-background hover:bg-accent/5">
                <PencilSquareIcon className="w-10 h-10 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">Text</h3>
                <p className="text-sm text-muted mb-3">Lorem ipsum & placeholder text</p>
                <div className="text-xs text-accent font-mono opacity-70">
                  /api/text?type=lorem&length=50
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted text-xs">
            Free tools for developers
          </p>
        </div>
      </footer>
    </div>
  );
}
