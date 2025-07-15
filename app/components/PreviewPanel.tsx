import React from 'react';

interface PreviewPanelProps {
  title: string;
  children: React.ReactNode;
  isVisible?: boolean;
}

export default function PreviewPanel({ title, children, isVisible = true }: PreviewPanelProps) {
  if (!isVisible) return null;
  
  return (
    <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
        {title}
      </h3>
      {children}
    </div>
  );
} 