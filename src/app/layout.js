import "../globals.scss";

export const metadata = {
	title: "Lunaris",
	icons: {
		icon: "/favicon.ico",
	},
};
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
