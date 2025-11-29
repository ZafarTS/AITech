'use client';

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Team from '@/components/Team';
import { Achievements, Roadmap, Technologies, Footer } from '@/components/Sections';
import { WhyWeCanDeliver, CurrentStage } from '@/components/EnhancedSections';
import { AIUsage } from '@/components/AIUsage';
import FAQ from '@/components/FAQ';

export default function Home() {
  return (
    <>
      <div className="bg-pattern" />
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <WhyWeCanDeliver />
             <Team />
        <Achievements />
        <Roadmap />
        <Technologies />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
