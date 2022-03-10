import Button from '../components/common/button';
import client from '../libs/ApolloClient';
import { appStore } from '../stores/app';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import { Provider } from 'react-redux';

type Theme = 'light' | 'dark';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const router = useRouter();

  useEffect(() => {
    const isUserPerfersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
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
    <Provider store={appStore}>
      <ApolloProvider client={client}>
        <If condition={isLoaded}>
          <Then>
            <Component {...pageProps} />
            <If condition={theme === 'light'}>
              <Then>
                <Button
                  onClick={() => setTheme('dark')}
                  className='fixed right-4 bottom-4'
                >
                  <SunIcon className='mr-2 h-5 w-5' />
                  Light
                </Button>
              </Then>
              <Else>
                <Button
                  onClick={() => setTheme('light')}
                  className='fixed right-4 bottom-4'
                >
                  <MoonIcon className='mr-2 h-5 w-5' />
                  Dark
                </Button>
              </Else>
            </If>
          </Then>
        </If>
        <Toaster />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
