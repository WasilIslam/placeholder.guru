import React from 'react';

interface ControlPanelProps {
  title: string;
  children: React.ReactNode;
}

export default function ControlPanel({ title, children }: ControlPanelProps) {
  return (
    <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </div>
  );
} 