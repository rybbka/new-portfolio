import Image from 'next/image';
import styles from './InfoSection.module.css';

export default function InfoSection() {
  return (
    <div className="w-full">
      <div className={`max-w-7xl mx-auto ${styles.largeScreenContainer}`}>
        <div className="grid grid-cols-1 custom:grid-cols-2 gap-x-16">
          <div className="relative w-full mb-16 custom:mb-0">
            <Image
              src="/profile-image.jpg"
              alt="Majkel Kokocinski"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
              unoptimized
            />
          </div>
          <div className={`flex flex-col justify-start ${styles.largeScreenText}`}>
            <h2 className="text-sm mb-8">Majkel Kokocinski - Art Direction, Frontend Dev. & Graphic Design</h2>
            <p className="text-sm mb-8">
              Stockholm based Maison Majkel Kokocinski blends creative direction,
              strategic insight, and execution to offer seamless design solutions.
              &apos;Maison&apos; reflects the collaborative spirit within the design studio
              - with access to a vast network of technologists/specialists when
              required. This portfolio features a selection of work completed
              between 2016 - 2024.
            </p>
            <div className="text-sm">
              <p>majkelkokocinski@gmail.com</p>
              <p>+46 76 052 60 05</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
