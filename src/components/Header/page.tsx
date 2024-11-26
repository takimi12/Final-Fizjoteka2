'use client';
import { useEffect, useState } from 'react';
import DefaultHeader from './components/DesktopHeader';
import MobileHeader from './components/MobileHeader';
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

const {data} = useSession();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 901);
    };

    handleResize(); // Dodane, aby określić początkową wartość isMobile po załadowaniu strony

    window.addEventListener('resize', handleResize);

    // Clean-up function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>

    {isMobile ? <MobileHeader  /> : <DefaultHeader  />}

    </>
  );
};

export default Header;