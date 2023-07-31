import { useLayoutEffect } from 'react';

const themes = ['light', 'dark'] as const;
type Theme = (typeof themes)[number];

function changeTheme(to?: Theme): void {
  const theme = to ?? localStorage.getItem('theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (to) localStorage.setItem('theme', to);
}

function removeTheme(): void {
  localStorage.removeItem('theme');
  changeTheme();
}

export const useTheme = () => {
  useLayoutEffect(() => changeTheme(), []);

  return { changeTheme, removeTheme };
};
