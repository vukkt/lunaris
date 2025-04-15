import "../globals.scss";
import SessionProviderWrapper from "./SessionProviderWrapper";
export const metadata = {
	title: "Lunaris",
	icons: {
		icon: "/favicon.ico",
	},
};
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<SessionProviderWrapper>
				<body>{children}</body>
			</SessionProviderWrapper>
		</html>
	);
}
