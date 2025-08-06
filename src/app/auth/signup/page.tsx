'use client';

import { signIn, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { WitchSprite } from "@/components/WitchSprite";

interface Provider {
  id: string;
  name: string;
  type: string;
}

export default function SignUp() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    const getProvidersData = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    getProvidersData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 bg-purple-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <WitchSprite animation="flying" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            🧙‍♀️ <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Witch Registration
            </span>
          </h1>
          <p className="text-purple-200">Start your magical study adventure</p>
        </div>

        {/* Google Sign Up */}
        {providers && Object.values(providers).map((provider) => (
          <div key={provider.name} className="mb-4">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/study' })}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>
        ))}

        {/* Manual Sign Up Form */}
        <div className="border-t border-purple-500/20 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Or sign up with email
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
                placeholder="Your Witch Name"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              ✨ Sign Up ✨
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-300 text-sm">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 underline">
              Sign in
            </Link>
          </p>
          <Link 
            href="/" 
            className="inline-block mt-3 text-purple-400 hover:text-purple-300 text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}