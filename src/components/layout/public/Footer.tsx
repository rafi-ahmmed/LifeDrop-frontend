import { Droplet, Heart, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function MediumFooter() {
  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Brand, Logo & Short Description (Spans 6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                <Droplet className="w-4 h-4 fill-primary" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Life<span className="text-primary">Drop</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
              Emergency blood donation and medical fundraising platform
              connecting patients, hospitals, and donors in real time during
              critical situations.
            </p>

            {/* Emergency Hotline Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary" />
                +880 1234-567890
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                support@lifedrop.org
              </span>
            </div>
          </div>

          {/* Right Column: Essential Navigation Links (Spans 6 cols) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6">
            {/* Nav Group 1 */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/requests"
                    className="hover:text-primary transition-colors"
                  >
                    Blood Requests
                  </Link>
                </li>
                <li>
                  <Link
                    href="/campaigns"
                    className="hover:text-primary transition-colors"
                  >
                    Fundraising
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hospitals"
                    className="hover:text-primary transition-colors"
                  >
                    Hospitals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Group 2 */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-primary transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} LifeDrop. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3.5 h-3.5 text-primary fill-primary inline" />{" "}
            for saving lives.
          </p>
        </div>
      </div>
    </footer>
  );
}
