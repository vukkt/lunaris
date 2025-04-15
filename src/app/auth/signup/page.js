"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, name }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to create user");
			}

			const data = await res.json();
			console.log("User created:", data);
			// Redirect after successful sign-up
			router.push("/protected");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Sign Up</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<label>
				Email:{" "}
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</label>
			<br />
			<label>
				Password:{" "}
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</label>
			<br />
			<label>
				Name:{" "}
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<br />
			<button type="submit" disabled={loading}>
				{loading ? "Signing up..." : "Sign Up"}
			</button>
		</form>
	);
}
