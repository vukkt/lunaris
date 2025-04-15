"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import SignUpPage from "./auth/signup/page";

export default function Home() {
	const [showSignUp, setShowSignUp] = useState(false);

	return (
		<div>
			<h1>Hello World</h1>
			<button onClick={() => signIn()}>Sign In</button>
			<button onClick={() => setShowSignUp(true)}>Sign Up</button>
			{showSignUp && <SignUpPage />}
		</div>
	);
}
