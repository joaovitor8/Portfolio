import { PROFILE } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 px-6 py-8 text-center text-xs text-stardust">
      <p>
        {dict.builtWith}{" "}
        <span className="text-white">
          © {new Date().getFullYear()} {PROFILE.fullName}
        </span>
      </p>
    </footer>
  );
}
