import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { If, Then } from 'react-if';
import { Provider } from 'react-redux';
import Button from '../components/common/button';
import client from '../libs/ApolloClient';
import { appStore } from '../stores/app';
import '../styles/globals.css';

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
            <Button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className='fixed right-4 bottom-4'
              iconName={theme === 'light' ? 'SunIcon' : 'MoonIcon'}>
              {theme === 'light' ? 'Light' : 'Dark'}
            </Button>
          </Then>
        </If>
        <Toaster />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
