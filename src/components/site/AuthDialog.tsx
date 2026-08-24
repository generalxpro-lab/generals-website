import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCustomer } from "@/lib/customer";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.42 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.36 12.78c.02 2.62 2.3 3.49 2.33 3.5-.02.06-.37 1.26-1.22 2.5-.73 1.06-1.5 2.12-2.7 2.14-1.18.02-1.56-.7-2.91-.7-1.35 0-1.77.68-2.89.72-1.16.04-2.04-1.14-2.78-2.2-1.6-2.32-2.83-6.56-1.18-9.42.82-1.42 2.28-2.32 3.87-2.35 1.14-.02 2.21.77 2.91.77.7 0 2-.95 3.37-.81.57.02 2.18.21 3.21 1.74-.08.05-1.92 1.13-1.9 3.37M14.2 3.9c.62-.75 1.04-1.8.93-2.85-.9.04-1.99.6-2.63 1.35-.58.66-1.08 1.73-.95 2.75 1 .08 2.02-.51 2.65-1.25" />
    </svg>
  );
}

type Provider = "google" | "apple" | "email";

export function AuthDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { setCustomer } = useCustomer();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const startProvider = (next: Provider) => {
    setProvider(next);
    setEmail(next === "google" ? "you@gmail.com" : next === "apple" ? "you@icloud.com" : "");
  };

  const reset = () => {
    setProvider(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setLoading(false);
  };

  const close = (value: boolean) => {
    if (!value && !loading) reset();
    onOpenChange(value);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCustomer({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), provider });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-extrabold text-primary">{provider ? "Welcome to Shanzen" : "Sign in to Shanzen"}</DialogTitle>
          <DialogDescription>{provider ? "Finish your profile once. We'll remember you on this device." : "Save your wishlist and keep a smoother checkout experience."}</DialogDescription>
        </DialogHeader>

        {!provider ? (
          <div className="space-y-3">
            <button type="button" onClick={() => startProvider("google")} className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#dadce0] bg-white px-4 py-3 text-sm font-medium text-[#3c4043] shadow-soft transition-transform hover:-translate-y-0.5"><GoogleMark /> Continue with Google</button>
            <button type="button" onClick={() => startProvider("apple")} className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"><AppleMark /> Continue with Apple</button>
            <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-border" /><span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">or</span><span className="h-px flex-1 bg-border" /></div>
            <button type="button" onClick={() => startProvider("email")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-primary transition-all hover:border-accent hover:text-accent"><Mail size={15} /> Continue with Email</button>
            <p className="pt-1 text-center text-[0.68rem] text-muted-foreground">This showcase uses a local demo session; real Google/Apple OAuth requires provider credentials.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold text-foreground">First name<input required value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" placeholder="John" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" /></label>
              <label className="text-sm font-semibold text-foreground">Last name<input required value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" placeholder="Smith" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" /></label>
            </div>
            <label className="block text-sm font-semibold text-foreground">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" /></label>
            <button disabled={loading} type="submit" className="cta-pulse flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-accent hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70">{loading ? <><Loader2 size={16} className="animate-spin" /> Signing you in…</> : "Continue"}</button>
            <button disabled={loading} type="button" onClick={() => setProvider(null)} className="w-full py-1 text-xs font-semibold text-muted-foreground hover:text-accent">Choose another sign-in method</button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
