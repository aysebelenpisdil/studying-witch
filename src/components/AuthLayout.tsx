'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { WitchSprite } from "@/components/WitchSprite";

const STARS = new Array(20).fill(null).map((_, i) => ({
  id: `star-${i}`,
  top: `${(i * 17 + 23) % 100}%`,
  left: `${(i * 31 + 47) % 100}%`,
  delay: `${((i * 13 + 11) % 30) / 10}s`,
}));

const GOOGLE_ICON = (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

interface Provider {
  id: string;
  name: string;
}

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  witchAnimation: 'spell' | 'flying' | 'idle';
  googleLabel: string;
  providers: Record<string, Provider> | null;
  formTitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkHref: string;
  footerLinkText: string;
}

export function AuthLayout({
  title,
  subtitle,
  witchAnimation,
  googleLabel,
  providers,
  formTitle,
  children,
  footerText,
  footerLinkHref,
  footerLinkText,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 bg-purple-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <WitchSprite animation={witchAnimation} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            🧙‍♀️ <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-purple-200">{subtitle}</p>
        </div>

        {providers && Object.values(providers).map((provider) => (
          <div key={provider.name} className="mb-4">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/study' })}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-3 transition-colors"
            >
              {GOOGLE_ICON}
              {googleLabel}
            </button>
          </div>
        ))}

        <div className="border-t border-purple-500/20 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">{formTitle}</h3>
          <form className="space-y-4">
            {children}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              ✨ {title} ✨
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-purple-300 text-sm">
            {footerText}{' '}
            <Link href={footerLinkHref} className="text-purple-400 hover:text-purple-300 underline">
              {footerLinkText}
            </Link>
          </p>
          <Link href="/" className="inline-block mt-3 text-purple-400 hover:text-purple-300 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AuthInput({
  id,
  label,
  type,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-purple-200 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
