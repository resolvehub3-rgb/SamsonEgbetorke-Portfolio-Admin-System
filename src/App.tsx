/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { portfolioService } from './services/portfolioService.ts';
import {
  Profile,
  EducationItem,
  WorkExperienceItem,
  SkillCategory,
  ServiceItem,
  ProjectItem,
  AchievementItem,
  ContactEnquiryItem,
  WebsiteSettings,
} from './types/portfolio.ts';

// Public Components
import { Navbar } from './components/public/Navbar.tsx';
import { Hero } from './components/public/Hero.tsx';
import { FeaturedProjects } from './components/public/FeaturedProjects.tsx';
import { AboutSection } from './components/public/AboutSection.tsx';
import { ExperienceSection } from './components/public/ExperienceSection.tsx';
import { SkillsSection } from './components/public/SkillsSection.tsx';
import { ServicesSection } from './components/public/ServicesSection.tsx';
import { ContactSection } from './components/public/ContactSection.tsx';
import { Footer } from './components/public/Footer.tsx';
import { ProjectDetailModal } from './components/public/ProjectDetailModal.tsx';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin.tsx';
import { AdminLayout } from './components/admin/AdminLayout.tsx';
import { AdminOverview } from './components/admin/AdminOverview.tsx';
import { ProjectsManager } from './components/admin/ProjectsManager.tsx';
import { ProfileManager } from './components/admin/ProfileManager.tsx';
import { EducationManager } from './components/admin/EducationManager.tsx';
import { ExperienceManager } from './components/admin/ExperienceManager.tsx';
import { SkillsManager } from './components/admin/SkillsManager.tsx';
import { ServicesManager } from './components/admin/ServicesManager.tsx';
import { AchievementsManager } from './components/admin/AchievementsManager.tsx';
import { EnquiriesManager } from './components/admin/EnquiriesManager.tsx';
import { SettingsManager } from './components/admin/SettingsManager.tsx';

function PortfolioApp() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [adminTab, setAdminTab] = useState<string>('overview');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Data states
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [experience, setExperience] = useState<WorkExperienceItem[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiryItem[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAllData = useCallback(async () => {
    try {
      const [
        profileData,
        eduData,
        expData,
        skillsData,
        servicesData,
        projectsData,
        achData,
        enqData,
        settingsData,
      ] = await Promise.all([
        portfolioService.getProfile(),
        portfolioService.getEducation(),
        portfolioService.getExperience(),
        portfolioService.getSkillCategories(),
        portfolioService.getServices(),
        portfolioService.getProjects(),
        portfolioService.getAchievements(),
        portfolioService.getContactEnquiries(),
        portfolioService.getWebsiteSettings(),
      ]);

      setProfile(profileData);
      setEducation(eduData);
      setExperience(expData);
      setSkills(skillsData);
      setServices(servicesData);
      setProjects(projectsData);
      setAchievements(achData);
      setEnquiries(enqData);
      setSettings(settingsData);
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();

    // Check initial hash or pathname for #admin or /admin
    if (
      window.location.hash === '#admin' ||
      window.location.pathname.startsWith('/admin')
    ) {
      setCurrentView('admin');
    }

    // Check if deep link to a project slug exists in URL hash (e.g. #projects/samtill-pos)
    const checkHashRoute = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#projects/')) {
        const slug = hash.replace('#projects/', '');
        portfolioService.getProjectBySlug(slug).then((proj) => {
          if (proj) setSelectedProject(proj);
        });
      } else if (hash === '#admin') {
        setCurrentView('admin');
      }
    };

    checkHashRoute();
    window.addEventListener('hashchange', checkHashRoute);

    // Listen to local data changes
    const handleDataChange = () => {
      loadAllData();
    };
    window.addEventListener('samteck_data_changed', handleDataChange);

    return () => {
      window.removeEventListener('hashchange', checkHashRoute);
      window.removeEventListener('samteck_data_changed', handleDataChange);
    };
  }, [loadAllData]);

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    window.location.hash = `projects/${project.slug}`;
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    if (window.location.hash.startsWith('#projects/')) {
      history.pushState(null, '', window.location.pathname);
    }
  };

  const handleOpenAdmin = () => {
    setCurrentView('admin');
    window.location.hash = 'admin';
  };

  const handleReturnToSite = () => {
    setCurrentView('public');
    history.pushState(null, '', window.location.pathname);
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-[#0B1530] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-sky-400">Loading Samson Egbetorke Portfolio...</p>
        </div>
      </div>
    );
  }

  // Admin View
  if (currentView === 'admin') {
    if (!user) {
      return <AdminLogin onBackToSite={handleReturnToSite} />;
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onTabChange={setAdminTab}
        onViewLiveSite={handleReturnToSite}
      >
        {adminTab === 'overview' && (
          <AdminOverview
            projects={projects}
            enquiries={enquiries}
            onNavigateTab={setAdminTab}
            onNewProject={() => setAdminTab('projects')}
            onViewLiveSite={handleReturnToSite}
          />
        )}

        {adminTab === 'projects' && (
          <ProjectsManager
            projects={projects}
            onProjectsUpdated={loadAllData}
            onPreviewProject={(p) => handleSelectProject(p)}
          />
        )}

        {adminTab === 'profile' && (
          <ProfileManager profile={profile} onProfileUpdated={loadAllData} />
        )}

        {adminTab === 'education' && (
          <EducationManager education={education} onUpdated={loadAllData} />
        )}

        {adminTab === 'experience' && (
          <ExperienceManager experience={experience} onUpdated={loadAllData} />
        )}

        {adminTab === 'skills' && (
          <SkillsManager categories={skills} onUpdated={loadAllData} />
        )}

        {adminTab === 'services' && (
          <ServicesManager services={services} onUpdated={loadAllData} />
        )}

        {adminTab === 'achievements' && (
          <AchievementsManager achievements={achievements} onUpdated={loadAllData} />
        )}

        {adminTab === 'enquiries' && (
          <EnquiriesManager enquiries={enquiries} onUpdated={loadAllData} />
        )}

        {adminTab === 'settings' && (
          <SettingsManager
            settings={settings || {
              site_title: 'Samson Egbetorke | Software Developer & SaaS Builder',
              meta_description: 'Portfolio of Samson Egbetorke',
              contact_email: 'samtechdigital@gmail.com',
              location: 'Accra, Ghana',
              business_name: 'SamTeck Digital',
            }}
            onUpdated={loadAllData}
          />
        )}

        {/* Modal preview within admin */}
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={handleCloseProjectModal}
          />
        )}
      </AdminLayout>
    );
  }

  // Public Portfolio Website
  return (
    <div className="min-h-screen bg-[#0B1530] text-slate-100 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-300">
      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigateSection}
        onOpenAdmin={handleOpenAdmin}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onViewProjects={() => handleNavigateSection('projects')}
          onContact={() => handleNavigateSection('contact')}
        />

        {/* Featured Projects & Showcase */}
        <FeaturedProjects
          projects={projects}
          onSelectProject={handleSelectProject}
        />

        {/* About & Approved Biography */}
        <AboutSection profile={profile} />

        {/* Confirmed Technical Stack */}
        <SkillsSection categories={skills} />

        {/* Professional Services */}
        <ServicesSection
          services={services}
          onContact={() => handleNavigateSection('contact')}
        />

        {/* Experience, Education & Milestones */}
        <ExperienceSection
          education={education}
          experience={experience}
          achievements={achievements}
        />

        {/* Direct Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigateSection}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseProjectModal}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioApp />
    </AuthProvider>
  );
}
