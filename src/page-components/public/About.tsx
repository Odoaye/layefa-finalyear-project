"use client";

import { motion } from "framer-motion";
import { Target, CheckCircle, BarChart2, Users, ShoppingBag, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const objectives = [
  "Develop a responsive multi-vendor e-commerce platform using modern web technologies",
  "Implement a real-time price comparison system across multiple vendors",
  "Create role-based dashboards for customers, vendors, and administrators",
  "Build a budget assistant feature to help price-sensitive Nigerian consumers",
  "Provide vendors with competitive pricing intelligence and market analytics",
  "Design a scalable architecture ready for backend API integration",
];

const benefits = [
  { title: "For Customers", icon: Users, items: ["Find the lowest prices instantly", "Compare vendors side-by-side", "Budget-aware shopping assistant", "Transparent vendor ratings", "Track orders in real-time"] },
  { title: "For Vendors", icon: ShoppingBag, items: ["Reach millions of price-conscious buyers", "Monitor competitor pricing", "Analytics and sales insights", "Easy product management", "Increase sales through visibility"] },
  { title: "For the Market", icon: BarChart2, items: ["Promotes healthy price competition", "Increases market transparency", "Supports Nigerian e-commerce growth", "Reduces information asymmetry", "Empowers informed consumers"] },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="bg-primary/5 border-b border-border py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              Final Year Project — Computer Science
            </div>
            <h1 className="text-4xl font-extrabold mb-4">About MarketCompare</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Development of a Multi-Vendor E-Commerce Platform with Price Comparison Features
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Problem Statement */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Problem Statement</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 space-y-3 text-muted-foreground leading-relaxed">
            <p>Nigerian consumers face significant challenges when purchasing products online due to price fragmentation across multiple e-commerce platforms. The same product can be sold at vastly different prices by different vendors, with no easy way for customers to compare options without visiting multiple websites.</p>
            <p>This price opacity leads to overpaying, erodes consumer trust, and disadvantages smaller vendors who may offer better prices but lack the visibility of larger platforms. The absence of a unified price comparison mechanism in the Nigerian e-commerce market represents a critical gap that this project aims to address.</p>
          </div>
        </motion.section>

        {/* Aim */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Project Aim</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-muted-foreground leading-relaxed">
            <p>The primary aim of this project is to design and develop a comprehensive multi-vendor e-commerce platform that enables multiple vendors to list the same products at competitive prices, while empowering customers with intelligent price comparison tools to make informed purchasing decisions. The platform incorporates a budget assistant, vendor performance analytics, and an administrative control system, all built with Nigerian market conditions in mind.</p>
          </div>
        </motion.section>

        {/* Objectives */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Objectives</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <ul className="space-y-3">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-bold">{b.title}</h3>
                </div>
                <ul className="space-y-2">
                  {b.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* System Overview */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6">System Overview</h2>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Tech Stack", value: "React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI" },
                { label: "Architecture", value: "Frontend-only SPA with mock data, ready for REST API backend integration" },
                { label: "User Roles", value: "Customer, Vendor, Administrator — each with dedicated dashboards" },
              ].map((item, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              The system is built with a modular architecture that cleanly separates data concerns from presentation. All data interfaces match REST API conventions, making backend integration straightforward when needed.
            </p>
          </div>
        </motion.section>

        <div className="text-center pt-4">
          <Link href="/dashboard/marketplace">
            <Button size="lg" data-testid="about-explore-btn">
              Explore the Platform <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
