import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

export default function Header({ showBackButton = false, title, icon }: HeaderProps) {
  return (
    <header className="px-4 py-6 sm:px-6 lg:px-8 backdrop-blur-sm bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-accent flex items-center gap-3 hover:text-accent-hover transition-all duration-300 font-bold group">
          {showBackButton && <ArrowLeftIcon className="w-5 h-5" />}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white text-xl font-bold group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              placeholder.guru
            </span>
            <span className="text-sm text-muted/80">placeholder apis for developers</span>
          </div>
        </Link>
        
        {title && (
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-semibold text-lg">{title}</span>
          </div>
        )}
      </div>
    </header>
  );
} 