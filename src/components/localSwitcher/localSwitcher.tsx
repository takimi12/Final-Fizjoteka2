import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const currentLocale = localActive === 'en' ? 'PL' : 'EN'; 

  const toggleLanguage = () => {
    const nextLocale = localActive === 'en' ? 'pl' : 'en'; 
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <div className='border-2 rounded'>
      <button
        onClick={toggleLanguage}
        disabled={isPending}
      >
        {currentLocale} 
      </button>
    </div>
  );
}
