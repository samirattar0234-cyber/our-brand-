import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  title?: ReactNode;
  description?: ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (event: FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z"
      />
    </svg>
  );
}

function GlassInputWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-[#b66d78]/70 focus-within:bg-[#b66d78]/10">
      {children}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: Testimonial;
  delay: string;
}) {
  return (
    <div className={`animate-testimonial ${delay} flex w-64 items-start gap-3 rounded-3xl border border-white/10 bg-card/85 p-5 shadow-xl backdrop-blur-xl`}>
      <img
        src={testimonial.avatarSrc}
        className="h-10 w-10 rounded-2xl object-cover"
        alt=""
      />
      <div className="text-sm leading-snug">
        <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
        <p className="text-muted-foreground">{testimonial.handle}</p>
        <p className="mt-1 text-foreground/80">{testimonial.text}</p>
      </div>
    </div>
  );
}

export function SignInPage({
  title = <span className="font-light tracking-tighter text-foreground">Welcome back.</span>,
  description = "Sign in to explore your saved styles and find something that feels like you.",
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
}: SignInPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Account sign-in is not connected yet. Your details have not been sent.");
    onSignIn?.(event);
  }

  function handleGoogleSignIn() {
    if (onGoogleSignIn) {
      onGoogleSignIn();
      return;
    }
    setNotice("Google sign-in is not connected yet.");
  }

  function handleResetPassword() {
    if (onResetPassword) {
      onResetPassword();
      return;
    }
    setNotice("Password reset is not available until account access is connected.");
  }

  function handleCreateAccount() {
    if (onCreateAccount) {
      onCreateAccount();
      return;
    }
    setNotice("Account creation is not available yet.");
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <section className="relative flex flex-1 items-center justify-center px-6 py-12 sm:px-10 md:px-12 lg:px-16">
        <a
          href="../index.html"
          className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:left-10 md:left-12 lg:left-16"
        >
          <span aria-hidden="true">←</span>
          Back to OUR BRAND
        </a>

        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-2 text-sm font-extrabold tracking-[.15em]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              OB
            </span>
            <span>
              OUR <span className="text-[#b66d78]">BRAND</span>
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="animate-element animate-delay-100">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 text-muted-foreground">{description}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="animate-element animate-delay-200">
                <label
                  htmlFor="sign-in-email"
                  className="mb-2 block text-sm font-medium text-muted-foreground"
                >
                  Email address
                </label>
                <GlassInputWrapper>
                  <input
                    id="sign-in-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-2xl bg-transparent p-4 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-300">
                <label
                  htmlFor="sign-in-password"
                  className="mb-2 block text-sm font-medium text-muted-foreground"
                >
                  Password
                </label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      id="sign-in-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-2xl bg-transparent p-4 pr-12 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="h-5 w-5" />
                      ) : (
                        <Eye aria-hidden="true" className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-400 flex items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="custom-checkbox"
                  />
                  <span className="text-foreground/90">Keep me signed in</span>
                </label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="auth-action"
                >
                  Reset password
                </button>
              </div>

              <button
                type="submit"
                className="animate-element animate-delay-500 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground shadow-lg shadow-[#54394d]/15 transition-colors hover:bg-primary/90"
              >
                Sign in
              </button>
            </form>

            <div className="animate-element animate-delay-600 relative flex items-center justify-center">
              <span className="w-full border-t border-border" />
              <span className="absolute bg-background px-4 text-sm text-muted-foreground">
                Or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="animate-element animate-delay-700 flex w-full items-center justify-center gap-3 rounded-2xl border border-border py-4 transition-colors hover:bg-secondary"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {notice && (
              <p
                className="rounded-xl border border-[#e3cbd1] bg-[#f7f0eb] px-4 py-3 text-sm text-[#54394d]"
                role="status"
                aria-live="polite"
              >
                {notice}
              </p>
            )}

            <p className="animate-element animate-delay-800 text-center text-sm text-muted-foreground">
              New to OUR BRAND?{" "}
              <button
                type="button"
                onClick={handleCreateAccount}
                className="auth-action font-medium"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </section>

      {heroImageSrc && (
        <section
          className="relative hidden min-h-screen flex-1 p-4 md:block"
          aria-label="OUR BRAND style"
        >
          <div className="animate-slide-right animate-delay-300 absolute inset-4 overflow-hidden rounded-3xl bg-[#332632]">
            <img
              src={heroImageSrc}
              alt="A fashion look from the OUR BRAND collection"
              className="h-full w-full object-cover"
            />
            <div className="signin-image-shade absolute inset-0" />
            <div className="absolute bottom-12 left-10 right-10 text-white">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#f0c9cb]">
                Find your own style
              </p>
              <h2 className="max-w-lg font-serif text-4xl leading-tight lg:text-5xl">
                Clothes for every side of you.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                Everyday essentials, treasured traditions, and room to move.
              </p>
            </div>
          </div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 flex w-full -translate-x-1/2 justify-center gap-4 px-8">
              <TestimonialCard
                testimonial={testimonials[0]}
                delay="animate-delay-1000"
              />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[1]}
                    delay="animate-delay-1200"
                  />
                </div>
              )}
              {testimonials[2] && (
                <div className="hidden 2xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[2]}
                    delay="animate-delay-1400"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
