import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Sana Birthday Celebration:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      localStorage.removeItem('sana_birthday_photos');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08040a] flex items-center justify-center p-6 text-center text-slate-100">
          <div className="max-w-md w-full p-8 rounded-3xl glass-panel border border-pink-500/30 shadow-[0_0_50px_rgba(255,45,117,0.3)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-900/30 border border-pink-400/40 flex items-center justify-center text-3xl">
              ❤️
            </div>
            <h1 className="font-serif text-2xl font-bold text-amber-200 mb-2">
              For My Dearest Sana
            </h1>
            <p className="font-script text-xl text-pink-300 mb-4">
              Restoring our special moment...
            </p>
            <p className="text-xs text-slate-300 mb-6 font-light">
              A temporary display glitch occurred. Tap below to reload your birthday surprise seamlessly.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-medium text-sm shadow-lg shadow-pink-600/30 transition-all active:scale-95 min-h-[44px]"
            >
              Reload Birthday Surprise
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
