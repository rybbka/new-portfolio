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

    if (container && infoSections.length > 0) {
      const targetSection = infoSections[0];
      const viewportHeight = window.innerHeight;
      const sectionHeight = targetSection.offsetHeight;

      if (!hasScrolled) {
        const paddingHeight = 128; // 8rem
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
        // Existing scrolling logic for non-initial state
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
          <span className="hidden custom:inline">Maison Majkel Kokocinski — Multidisciplinary Design Studio</span>
          <span className="custom:hidden">MMK - Design Studio</span>
        </div>
        <div className="relative w-[40px] h-[40px] z-10 cursor-pointer" onClick={handleLogoClick}>
          <Image src="/mmk_logo.png" alt="Maison Majkel Kokocinski Logo" fill className="object-contain" priority />
        </div>
      </div>
    </header>
  );
}
