import { Epilogue, JetBrains_Mono } from 'next/font/google';

// Fonts for the Zaha page, read by zaha.module.css.
// Anton and upright Epilogue come from the root layout (--font-anton, --font-epilogue),
// so this page only adds the mono face and the one italic Epilogue used in the logo.
const epilogueItalic = Epilogue({ subsets: ['latin'], weight: '500', style: 'italic', variable: '--zh-font-italic', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--zh-font-mono', display: 'swap' });

export const zahaFonts = `${epilogueItalic.variable} ${mono.variable}`;
