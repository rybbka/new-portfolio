'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ hasScrolled, onScroll, scrollContainerRef }) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleLogoClick = () => {
    window.location.reload(); // This will give us exactly the initial state we want
  };

  const scrollToInfo = () => {
    const container = scrollContainerRef.current;
    const infoSections = document.querySelectorAll('.info-section');
    const isMobile = window.innerWidth < 768; // Based on the md breakpoint in Tailwind config

    if (container && infoSections.length > 0) {
      // Find the appropriate info section based on viewport size
      // On mobile, we want the mobile info section which appears later in the DOM
      const targetSection = isMobile ?
        document.querySelector('.block.md\\:hidden .info-section') :
        document.querySelector('.hidden.md\\:block .info-section');

      if (!targetSection) return; // Safety check

      const viewportHeight = window.innerHeight;
      const sectionHeight = targetSection.offsetHeight;

      if (!hasScrolled) {
        // First click behavior (initial state)
        // Mobile might need less padding since the header is smaller
        const paddingHeight = isMobile ? 64 : 128; // 4rem for mobile, 8rem for desktop
        const finalPosition = targetSection.offsetTop - paddingHeight;
        const centerOffset = (viewportHeight - sectionHeight) / 2;

        // Temporarily disable scroll behavior during transition
        container.style.scrollBehavior = 'auto';

        // Update state and scroll in one go
        onScroll(true);
        container.scrollTop = finalPosition - centerOffset;

        // Re-enable smooth scrolling after a brief delay
        setTimeout(() => {
          container.style.scrollBehavior = 'smooth';
        }, 50);
      } else {
        // Subsequent click behavior
        const targetPosition = targetSection.offsetTop - (viewportHeight - sectionHeight) / 2;
        container.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };


  useEffect(() => {
    // Find our scroll container
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollPos = scrollContainer.scrollTop;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex justify-between items-center p-8">
        <div
          className="text-sm relative z-10 cursor-pointer hover:opacity-70"
          onClick={scrollToInfo}
        >
          Info
        </div>
        <div className="text-sm absolute left-1/2 -translate-x-1/2 z-10">
          <span className="hidden header:inline">Maison Majkel Kokocinski — Multidisciplinary Design Studio</span>
          <span className="header:hidden">MMK - Design Studio</span>
        </div>
        <div className="relative w-[40px] h-[40px] z-10 cursor-pointer" onClick={handleLogoClick}>
          <Image src="/mmk_logo.png" alt="Maison Majkel Kokocinski Logo" fill className="object-contain" priority />
        </div>
      </div>
    </header>
  );
}
