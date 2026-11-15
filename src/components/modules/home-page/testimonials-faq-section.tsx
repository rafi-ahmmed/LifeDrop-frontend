"use client";

import {
  ChevronDown,
  HelpCircle,
  MessageSquareQuote,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "During late-night trauma surgeries at DMCH, finding rare negative blood used to be our biggest struggle. LifeDrop's rapid responder network has truly revolutionized emergency response in Dhaka.",
    name: "Dr. Sabrina Rahman",
    role: "Senior General Surgeon, DMCH",
    badge: "Medical Partner",
  },
  {
    quote:
      "I've donated blood 12 times through LifeDrop. The best part is zero spam—I only get an alert when a critical patient in my immediate area needs O+ blood.",
    name: "Tanzil Ahmed",
    role: "Software Engineer & Voluntary Donor",
    badge: "12x Hero Donor",
  },
  {
    quote:
      "When my 6-year-old daughter needed emergency heart surgery, we were short of funds. Through LifeDrop's verified campaign, generous people helped us raise the full amount in 3 days.",
    name: "Farhana Yeasmin",
    role: "Mother of Heart Surgery Recipient",
    badge: "Verified Campaign",
  },
];

const faqs = [
  {
    q: "Who is eligible to donate blood through LifeDrop?",
    a: "Any healthy individual between 18 and 60 years old weighing at least 48 kg (for females) or 50 kg (for males), with normal hemoglobin levels, who hasn't donated blood in the last 90-120 days.",
  },
  {
    q: "How are medical fundraising campaigns verified?",
    a: "Every campaign requires an authentic hospital prescription, diagnostic test report, and doctor's recommendation with hospital seal. Our team verifies the case directly with the hospital before publishing.",
  },
  {
    q: "Are there any hidden fees or charges on donations?",
    a: "No! LifeDrop does not deduct any platform fees for emergency blood requests or critical medical fundraising. 100% of received funds are disbursed directly towards patient healthcare costs.",
  },
  {
    q: "How does the emergency blood matching alert work?",
    a: "When a hospital or patient posts an urgent blood requisition with their location and blood group, registered donors who match the type and are in the same area receive immediate SMS and dashboard notifications.",
  },
];

export function TestimonialsFaqSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-card/40 border-b border-border/40 relative">
      <div className="container mx-auto px-4 md:px-6 space-y-16">
        {/* Testimonials Block */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Real Stories of Hope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Lives Touched & Saved
            </h2>
            <p className="text-sm text-muted-foreground">
              Hear directly from donors, patient families, and medical
              professionals who experience LifeDrop everyday.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Block */}
        <div className="max-w-3xl mx-auto space-y-8 pt-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;

              return (
                <div
                  key={faq.q}
                  className="bg-card border border-border rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-foreground flex items-center justify-between gap-4 cursor-pointer hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
