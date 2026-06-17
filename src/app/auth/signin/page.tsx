'use client';

import { getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { AuthLayout, AuthInput } from "@/components/AuthLayout";

interface Provider {
  id: string;
  name: string;
  type: string;
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <AuthLayout
      title="Witch Portal"
      subtitle="Enter the magical world of study"
      witchAnimation="spell"
      googleLabel="Sign in with Google"
      providers={providers}
      formTitle="Or sign in with email"
      footerText="Don't have an account?"
      footerLinkHref="/auth/signup"
      footerLinkText="Sign up"
    >
      <AuthInput id="signin-email" label="Email" type="email" placeholder="email@example.com" />
      <AuthInput id="signin-password" label="Password" type="password" placeholder="••••••••" />
    </AuthLayout>
  );
}
