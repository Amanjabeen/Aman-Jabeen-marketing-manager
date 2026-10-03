/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TrustSlider } from './components/TrustSlider';
import { ServicesGrid } from './components/ServicesGrid';
import { PortfolioSection } from './components/PortfolioSection';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { ServiceDetail } from './components/ServiceDetail';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CASE_STUDIES } from './data/caseStudies';
import { SERVICES_DETAILED } from './data/servicesData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'case-studies' | 'case-study-detail' | 'service-detail'>('home');
  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Sync state with URL hash for crawlability and browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash.startsWith('#service/')) {
        const serviceId = hash.replace('#service/', '');
        const service = SERVICES_DETAILED.find((s) => s.id === serviceId);
        if (service) {
          setSelectedServiceId(serviceId);
          setCurrentView('service-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      if (hash.startsWith('#case-study/')) {
        const slug = hash.replace('#case-study/', '');
        const study = CASE_STUDIES.find((s) => s.slug === slug);
        if (study) {
          setSelectedCaseStudySlug(slug);
          setCurrentView('case-study-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      if (hash === '#case-studies') {
        setCurrentView('case-studies');
        setSelectedCaseStudySlug(null);
        setSelectedServiceId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === '' || hash === '#top' || hash === '#home') {
        setCurrentView('home');
        setSelectedCaseStudySlug(null);
        setSelectedServiceId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedCaseStudySlug(null);
    setSelectedServiceId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCaseStudies = () => {
    setCurrentView('case-studies');
    setSelectedCaseStudySlug(null);
    setSelectedServiceId(null);
    window.location.hash = '#case-studies';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentView('service-detail');
    window.location.hash = `#service/${serviceId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCaseStudy = (slug: string) => {
    setSelectedCaseStudySlug(slug);
    setCurrentView('case-study-detail');
    window.location.hash = `#case-study/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'contact' ? 'audit' : sectionId;
    if (currentView !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToAudit = () => {
    scrollToSection('audit');
  };

  const selectedStudy = CASE_STUDIES.find((s) => s.slug === selectedCaseStudySlug);
  const selectedService = SERVICES_DETAILED.find((s) => s.id === selectedServiceId);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14101f] selection:bg-[var(--lilac)] selection:text-[var(--purple-dark)]">
      {/* 1. Header Navigation */}
      <Header
        currentView={currentView}
        onNavigateHome={navigateToHome}
        onNavigateCaseStudies={navigateToCaseStudies}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 2. Existing Hero Section with Proposal / Lead Form Card */}
            <Hero onSeeWorkClick={() => scrollToSection('work')} />

            {/* 3. About Section */}
            <About />

            {/* 4. Why brands trust me Slider */}
            <TrustSlider />

            {/* 5. 6 Services Grid (3-column × 2-row clean container matching reference layout) */}
            <ServicesGrid onSelectService={handleSelectService} />

            {/* 6. Selected Work & Case Studies (Replaces "A Few Recent Projects") */}
            <PortfolioSection
              onSelectCaseStudy={handleSelectCaseStudy}
              onViewAllCaseStudies={navigateToCaseStudies}
            />

            {/* 7. Testimonials Section (USA client first, Arabic client, slider) */}
            <Testimonials />

            {/* 8. FAQ Section Accordion */}
            <FaqSection />

            {/* 9. Final Call to Action */}
            <FinalCta onGetProposalClick={() => scrollToSection('audit')} />
          </>
        )}

        {currentView === 'service-detail' && selectedService && (
          <ServiceDetail
            service={selectedService}
            onNavigateHome={navigateToHome}
            onSelectCaseStudy={handleSelectCaseStudy}
            onScrollToAudit={handleScrollToAudit}
            onViewPortfolio={navigateToCaseStudies}
          />
        )}

        {currentView === 'case-studies' && (
          <CaseStudiesPage
            onSelectCaseStudy={handleSelectCaseStudy}
            onNavigateHome={navigateToHome}
          />
        )}

        {currentView === 'case-study-detail' && selectedStudy && (
          <CaseStudyDetail
            caseStudy={selectedStudy}
            onBackToCaseStudies={navigateToCaseStudies}
            onSelectCaseStudy={handleSelectCaseStudy}
            onNavigateHome={navigateToHome}
          />
        )}
      </main>

      {/* Clean Minimal 3-Column Footer */}
      <Footer
        onNavigateHome={navigateToHome}
        onNavigateCaseStudies={navigateToCaseStudies}
        onSelectService={handleSelectService}
        onScrollToSection={scrollToSection}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
