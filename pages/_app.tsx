import { ApolloProvider } from '@apollo/client';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import Button from '../components/common/button';
import client from '../libs/ApolloClient';
import '../styles/globals.css';

type Theme = 'light' | 'dark';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const router = useRouter();

  useEffect(() => {
    const isUserPerfersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const fallbackTheme = isUserPerfersDark ? 'dark' : 'light';
    const savedTheme = localStorage?.getItem('theme') as Theme;
    setTheme(savedTheme ?? fallbackTheme);
    setIsLoaded(true);
  }, [router]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ApolloProvider client={client}>
      <If condition={isLoaded}>
        <Then>
          <Component {...pageProps} />
          <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="absolute right-4 bottom-4">
            <If condition={theme === 'light'}>
              <Then>
                <SunIcon className="h-5 w-5" /> <span className="ml-2">Light</span>
              </Then>
              <Else>
                <MoonIcon className="h-5 w-5" /> <span className="ml-2">Dark</span>
              </Else>
            </If>
          </Button>
        </Then>
      </If>
      <Toaster />
    </ApolloProvider>
  );
}

export default MyApp;
