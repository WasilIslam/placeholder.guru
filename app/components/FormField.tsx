import React from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  description?: string;
}

export function FormField({ label, children, description }: FormFieldProps) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-3">
        {label}
        {description && (
          <span className="text-muted text-sm font-normal ml-2">({description})</span>
        )}
      </label>
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export function Input({ label, description, className = '', ...props }: InputProps) {
  const inputElement = (
    <input
      className={`w-full p-4 rounded-xl border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 ${className}`}
      {...props}
    />
  );

  if (label) {
    return (
      <FormField label={label} description={description}>
        {inputElement}
      </FormField>
    );
  }

  return inputElement;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, description, options, className = '', ...props }: SelectProps) {
  const selectElement = (
    <select
      className={`w-full p-4 rounded-xl border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  if (label) {
    return (
      <FormField label={label} description={description}>
        {selectElement}
      </FormField>
    );
  }

  return selectElement;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-semibold transition-all duration-300 flex items-center justify-center gap-3 rounded-xl';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'bg-muted/20 hover:bg-muted/30 text-foreground border border-border/50 hover:border-accent/50',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {children}
    </div>
  );
}

interface ApiUrlDisplayProps {
  url: string;
  onCopy?: () => void;
  copied?: boolean;
}

export function ApiUrlDisplay({ url, onCopy, copied = false }: ApiUrlDisplayProps) {
  const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`;
  
  return (
    <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
      <h3 className="font-medium mb-3 text-lg">API URL</h3>
      <div className="flex gap-3">
        <code className="flex-1 p-3 bg-background/80 border border-border/30 rounded-lg text-sm font-mono break-all text-accent">
          {fullUrl}
        </code>
        <Button
          onClick={onCopy}
          variant="outline"
          size="sm"
        >
          <ClipboardDocumentIcon className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
} 