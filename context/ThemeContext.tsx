import React, { createContext, ReactNode, useContext, useState } from 'react';

type Theme = {
  dark: boolean;
  colors: {
    background: string;
    card: string;
    text: string;
    subText: string;
    border: string;
    inputBg: string;
  };
};

const lightTheme: Theme = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#111111',
    subText: '#666666',
    border: '#E0E0E0',
    inputBg: '#F5F5F5',
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#F1F1F1',
    subText: '#AAAAAA',
    border: '#2C2C2C',
    inputBg: '#2A2A2A',
  },
};

type ThemeContextType = {
  theme: Theme;
  toggleDark: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleDark: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  const toggleDark = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, toggleDark, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}