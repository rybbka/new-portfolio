'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './Header.js';
import InfoSection from './InfoSection.js';

export default function ProjectGrid({ initialProjects }) {
  const scrollContainerRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = (newScrollState) => {
    setHasScrolled(newScrollState);
  };

  // Restore original InfoSection handling
  const baseProjects = [
    ...initialProjects,
    {
      sys: { id: 'info-section' },
      fields: { isInfoSection: true },
    }
  ];

  const projects = Array(20).fill(baseProjects).flat();

  return (
    <div className="min-h-screen">
      <Header hasScrolled={hasScrolled} onScroll={handleScroll} scrollContainerRef={scrollContainerRef} />
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto scroll-container"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingTop: !hasScrolled ? '8rem' : '0',
          transition: 'padding-top 0.3s'
        }}
      >
        <div className="px-8 md:px-12 lg:px-16">
          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-32 items-center">
              {projects.map((project, index) => {
                if (project.fields?.isInfoSection) {
                  return (
                    <div key={`info-${index}`} className="col-span-2 info-section">
                      <InfoSection />
                    </div>
                  );
                }

                return (
                  <div key={`${project.sys.id}-${index}`} className="project-item relative flex justify-center w-full">
                    {project.fields.featuredImage && (
                      <div className="flex flex-col items-center w-full">
                        <div className="w-4/5">
                          <Link href={`/projects/${project.fields.slug}`} className="flex justify-center">
                            <div className="relative">
                              <Image
                                src={project.fields.featuredImage.fields.file.url}
                                alt={project.fields.title}
                                width={project.fields.featuredImage.fields.file.details.image.width}
                                height={project.fields.featuredImage.fields.file.details.image.height}
                                className="w-auto h-auto"
                              />
                            </div>
                          </Link>
                        </div>
                        <p className="text-xs font-['Suisse_Intl_Mono'] text-gray-600 mt-4 text-center w-full">
                          {project.fields.title} | {project.fields.description.split('.')[1].trim()} | Image 1 of {project.fields.totalImages}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Layout (hidden on desktop) */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-32">
              {projects.map((project, index) => {
                if (project.fields?.isInfoSection) {
                  return (
                    <div key={`info-mobile-${index}`} className="info-section">
                      <InfoSection />
                    </div>
                  );
                }

                return (
                  <div key={`${project.sys.id}-mobile-${index}`} className="w-full">
                    {project.fields.featuredImage && (
                      <div className="flex flex-col items-center w-full">
                        <div className="w-full">
                          <Link href={`/projects/${project.fields.slug}`} className="flex justify-center">
                            <div className="relative">
                              <Image
                                src={project.fields.featuredImage.fields.file.url}
                                alt={project.fields.title}
                                width={project.fields.featuredImage.fields.file.details.image.width}
                                height={project.fields.featuredImage.fields.file.details.image.height}
                                className="w-auto h-auto"
                              />
                            </div>
                          </Link>
                        </div>
                        <p className="text-xs font-['Suisse_Intl_Mono'] text-gray-600 mt-4 text-center w-full">
                          {project.fields.title} | {project.fields.description.split('.')[1].trim()} | Image 1 of {project.fields.totalImages}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
