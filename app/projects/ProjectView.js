'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProjectView({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [
    project.fields.featuredImage,
    ...(project.fields.additionalImages || [])
  ];

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRightSide = x > rect.width / 2;

    if (isRightSide) {
      setCurrentImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Header - matched with main Header.js positioning */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center p-8" style={{ paddingTop: '2.625rem' }}>
          <Link
            href="/"
            className="text-sm relative z-10 text-white"
            ref={(el) => {
              if (el) {
                console.log('Close position:', el.getBoundingClientRect().top);
              }
            }}
          >
            Close
          </Link>
          <div className="text-sm absolute left-1/2 -translate-x-1/2 z-10 text-white">
            {project.fields.title} — {project.fields.description.split('.')[1].trim()}
          </div>
          <div className="text-sm relative z-10 text-white">
            {currentImageIndex + 1} of {allImages.length}
          </div>
        </div>
      </header>

      {/* Main Image */}
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={allImages[currentImageIndex].fields.file.url}
            alt={project.fields.title}
            fill
            className="object-contain py-[40px]"
            priority
          />
          {/* Navigation overlays */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
            onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
            onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
          />
        </div>
      </div>
    </div>
  );
}
