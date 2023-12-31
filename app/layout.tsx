import './main.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const font = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
	title: 'Cart App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={font.className}>{children}</body>
		</html>
	);
}
