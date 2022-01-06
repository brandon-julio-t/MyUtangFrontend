import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
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
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
