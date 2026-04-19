import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Captura exceções em descendentes React e evita que a aplicação fique em tela branca.
 * Registra no console e permite um fallback customizado.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary capturou:', error, info);
    }
    this.props.onError?.(error, info);
  }

  handleReset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    if (!this.state.error) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <p className="text-5xl font-bold text-[hsl(var(--editorial-blue))] mb-4">Ops!</p>
          <h1 className="text-2xl font-bold text-[hsl(var(--editorial-gray-dark))] mb-2">
            Algo deu errado
          </h1>
          <p className="text-[hsl(var(--editorial-gray))] mb-6">
            Tivemos um problema ao carregar esta parte do portal. Tente novamente em instantes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[hsl(var(--editorial-blue))] text-white font-medium rounded-lg hover:bg-[hsl(var(--editorial-blue-dark))] transition-colors"
            >
              Tentar novamente
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[hsl(var(--editorial-border))] text-[hsl(var(--editorial-gray-dark))] font-medium rounded-lg hover:bg-[hsl(var(--editorial-surface))] transition-colors"
            >
              Voltar para Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
