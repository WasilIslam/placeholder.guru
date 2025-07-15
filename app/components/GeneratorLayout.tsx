import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface GeneratorLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function GeneratorLayout({ 
  title, 
  description, 
  icon, 
  children 
}: GeneratorLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br   to-accent/5 text-foreground font-[family-name:var(--font-1)] flex flex-col">
      <Header 
        showBackButton={true} 
        title={title} 
        icon={icon} 
      />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-muted/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Main Content */}
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
} 