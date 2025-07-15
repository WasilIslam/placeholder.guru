import React from 'react';

interface ApiParameter {
  name: string;
  description: string;
  type?: string;
  required?: boolean;
}

interface ApiExample {
  url: string;
  description?: string;
}

interface ApiDocumentationProps {
  endpoint: string;
  parameters: ApiParameter[];
  examples: ApiExample[];
}

export default function ApiDocumentation({ endpoint, parameters, examples }: ApiDocumentationProps) {
  return (
    <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
        API Usage
      </h3>
      
      <div className="space-y-6">
        {/* Base Endpoint */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Base Endpoint</h4>
          <code className="block p-4 bg-muted/20 rounded-xl font-mono text-sm border border-border/30">
            GET {endpoint}
          </code>
        </div>

        {/* Parameters */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Parameters</h4>
          <div className="space-y-3">
            {parameters.map((param, index) => (
              <div key={index} className="flex gap-6 p-4 bg-muted/10 rounded-xl border border-border/20">
                <div className="min-w-24">
                  <code className="font-mono text-sm font-semibold">{param.name}</code>
                  {param.required && <span className="text-red-500 text-xs ml-1">*</span>}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-muted">{param.description}</span>
                  {param.type && (
                    <span className="text-xs text-accent ml-2">({param.type})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Examples</h4>
          <div className="space-y-3">
            {examples.map((example, index) => (
              <div key={index}>
                <code className="block p-4 bg-muted/20 rounded-xl font-mono text-sm border border-border/30 break-all">
                  {example.url}
                </code>
                {example.description && (
                  <p className="text-sm text-muted mt-2">{example.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 