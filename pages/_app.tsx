import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import client from '../libs/ApolloClient';
import '../styles/globals.css';

type Theme = 'light' | 'dark';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }

    const isUserPerfersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const fallbackTheme = isUserPerfersDark ? 'dark' : 'light';
    const savedTheme = localStorage?.getItem('theme') as Theme;
    const theme = savedTheme ?? fallbackTheme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('bg-zinc-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('bg-zinc-900');
    }
  }, [router]);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <Toaster />
    </ApolloProvider>
  );
}

export default MyApp;
