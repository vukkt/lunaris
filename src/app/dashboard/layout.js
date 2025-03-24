export default function DashboardLayout({ children }) {
	return (
		<div style={{ fontFamily: "sans-serif" }}>
			<header style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
				<h1>Dashboard</h1>
			</header>
			<main style={{ padding: "1rem" }}>{children}</main>
			<footer style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
				<p>&copy; {new Date().getFullYear()} Your Company</p>
			</footer>
		</div>
	);
}
