"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ArrowLeft, ArrowRight, Building2, Package, Globe, Gift } from "lucide-react";
import { inquiryTypes, productInterests } from "@/data/content";

type FormStep = 1 | 2 | 3;

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  productInterest: string[];
  quantity: string;
  notes: string;
}

const initialFormData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  inquiryType: "",
  productInterest: [],
  quantity: "",
  notes: "",
};

export default function LeadFormSection() {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleProductInterest = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      productInterest: prev.productInterest.includes(product)
        ? prev.productInterest.filter((p) => p !== product)
        : [...prev.productInterest, product],
    }));
  };

  const canProceedStep1 =
    formData.name.trim() && formData.company.trim() && formData.email.trim();
  const canProceedStep2 = formData.inquiryType;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production: send to API endpoint
    console.log("Form submitted:", formData);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section id="contact" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-surface-white to-brand-teal/5 z-10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-3xl bg-white border border-emerald-100 shadow-xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-brand-navy mb-3">
              Thank You, {formData.name.split(" ")[0]}!
            </h3>
            <p className="text-text-secondary mb-6">
              Your inquiry has been received. Our enterprise solutions team will
              reach out within 24 business hours to discuss your requirements.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-brand-teal text-white rounded-full font-semibold hover:bg-brand-teal-dark transition-colors"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-surface-white to-brand-teal/5 z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-teal font-mono text-xs tracking-widest uppercase mb-3 block">
            Start Your Partnership
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight">
            Let's Build Something Extraordinary
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Tell us about your project. Our team of experts will craft a tailored
            solution that meets your exact specifications.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {([1, 2, 3] as FormStep[]).map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= s
                    ? "bg-brand-teal text-white"
                    : "bg-surface-muted text-text-muted"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 transition-colors duration-300 ${
                    step > s ? "bg-brand-teal" : "bg-surface-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-surface-border">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-display font-bold text-brand-navy mb-6">
                    Your Contact Information
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface-off focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        placeholder="Enter your company name"
                        className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface-off focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface-off focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+65 1234 5678"
                          className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface-off focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-full font-semibold hover:bg-brand-teal-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-display font-bold text-brand-navy mb-6">
                    Inquiry Details
                  </h3>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-3">
                      Type of Partnership <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => updateField("inquiryType", type.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            formData.inquiryType === type.value
                              ? "border-brand-teal bg-brand-teal/5"
                              : "border-surface-border bg-surface-off hover:border-brand-teal/30"
                          }`}
                        >
                          <span className="text-sm font-semibold text-brand-navy block">
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-3">
                      Product(s) of Interest
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {productInterests.map((product) => (
                        <button
                          key={product}
                          onClick={() => toggleProductInterest(product)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                            formData.productInterest.includes(product)
                              ? "bg-brand-teal text-white border-brand-teal"
                              : "bg-surface-off text-text-secondary border-surface-border hover:border-brand-teal/30"
                          }`}
                        >
                          {product}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Approximate Quantity
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => updateField("quantity", e.target.value)}
                        placeholder="e.g., 10,000 units"
                        className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface-off focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-brand-navy transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-full font-semibold hover:bg-brand-teal-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Review & Submit
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-display font-bold text-brand-navy mb-6">
                    Review Your Inquiry
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="p-4 rounded-xl bg-surface-off border border-surface-border">
                      <span className="text-xs text-text-muted uppercase tracking-wider">
                        Contact
                      </span>
                      <p className="text-brand-navy font-medium mt-1">
                        {formData.name} · {formData.company}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {formData.email}
                        {formData.phone && ` · ${formData.phone}`}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-off border border-surface-border">
                      <span className="text-xs text-text-muted uppercase tracking-wider">
                        Partnership Type
                      </span>
                      <p className="text-brand-navy font-medium mt-1">
                        {inquiryTypes.find((t) => t.value === formData.inquiryType)?.label}
                      </p>
                    </div>

                    {formData.productInterest.length > 0 && (
                      <div className="p-4 rounded-xl bg-surface-off border border-surface-border">
                        <span className="text-xs text-text-muted uppercase tracking-wider">
                          Products of Interest
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.productInterest.map((p) => (
                            <span
                              key={p}
                              className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-medium rounded-full"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.quantity && (
                      <div className="p-4 rounded-xl bg-surface-off border border-surface-border">
                        <span className="text-xs text-text-muted uppercase tracking-wider">
                          Approximate Quantity
                        </span>
                        <p className="text-brand-navy font-medium mt-1">
                          {formData.quantity}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-brand-navy transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Edit
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 px-8 py-3 bg-brand-teal text-white rounded-full font-semibold hover:bg-brand-teal-dark transition-all shadow-lg shadow-brand-teal/20"
                    >
                      <Send size={16} />
                      Submit Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
