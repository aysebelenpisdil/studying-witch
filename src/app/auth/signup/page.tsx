'use client';

import { getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { AuthLayout, AuthInput } from "@/components/AuthLayout";

interface Provider {
  id: string;
  name: string;
  type: string;
}

export default function SignUp() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <AuthLayout
      title="Witch Registration"
      subtitle="Start your magical study adventure"
      witchAnimation="flying"
      googleLabel="Sign up with Google"
      providers={providers}
      formTitle="Or sign up with email"
      footerText="Already have an account?"
      footerLinkHref="/auth/signin"
      footerLinkText="Sign in"
    >
      <AuthInput id="signup-name" label="Full Name" type="text" placeholder="Your Witch Name" />
      <AuthInput id="signup-email" label="Email" type="email" placeholder="email@example.com" />
      <AuthInput id="signup-password" label="Password" type="password" placeholder="••••••••" />
      <AuthInput id="signup-confirm-password" label="Confirm Password" type="password" placeholder="••••••••" />
    </AuthLayout>
  );
}
