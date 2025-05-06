'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/UI/logo.jsx"
import showPassword from "@/public/assets/images/icon-show-password.svg";
import hidePassword from "@/public/assets/images/icon-hide-password.svg";

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
    <main className="login-page">
        <div className="login-holder bg-and-outline rounded-corners">
            <div className="logo-holder">
                <Logo />
            </div>
            <h1 className="text-1">Welcome to Note</h1>
            <p className="text-5">Please log in to continue</p>
            <form>
                <div className="input-holder">
                    <label htmlFor="email" className="tetx-4">Email Adress</label>
                    <input type="email" id="email" name="email" required placeholder="email@example.com"/>
                </div>
                <div className="input-holder">
                    <div className="label-and-forgot">
                        <button className="show-password" type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? (
                                <Image src={hidePassword} alt="Hide password" width={20} height={15}/>
                            ) : (
                                <Image src={showPassword} alt="Show password" width={20} height={15}/>
                            )}
                        </button>
                        <label htmlFor="password" className="tetx-4">Password</label>
                        <Link href="#" className="forgot-password">Forgot</Link>
                    </div>
                    <input type={passwordVisible ? "text" : "password"} id="password" name="password" required />
                </div>
                <button type="submit" className="btn-main big text-3">Login</button>
                <div className="horizontal-line"></div>
                <p className="text-5">Or login with:</p>
                <button className="btn-outline">
                <svg id="icon-google" xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none" viewBox="0 0 24 25"><path fillRule="evenodd" d="M20.838 14.718a8.932 8.932 0 0 0 .086-2.857.558.558 0 0 0-.557-.473h-7.805a.562.562 0 0 0-.562.562v2.206c0 .31.252.562.562.562h4.275c.176 0 .305.18.239.343-.935 2.31-3.39 3.826-6.132 3.32-2.106-.39-3.832-2.06-4.284-4.153a5.477 5.477 0 0 1 8.369-5.776.572.572 0 0 0 .73-.06l1.703-1.733a.559.559 0 0 0-.046-.832 8.897 8.897 0 0 0-5.161-1.815c-4.872-.135-9.091 3.823-9.25 8.694-.167 5.108 3.927 9.302 8.995 9.302 4.383 0 8.037-3.14 8.838-7.29Z" clipRule="evenodd"/></svg>
                    Google</button>
                <div className="horizontal-line"></div>
                <p className="text-5">No account yet? <Link href="#" className="sign-up">Sign Up</Link></p>
            </form>
        </div>
    </main>
    )
}