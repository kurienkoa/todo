"use client";

import {AuthProvider} from "../../context/auth";
import HomeComponent from "../../components/home";

export default function Home() {
    return (
        <>
            <AuthProvider>
                <HomeComponent />
            </AuthProvider>
        </>
    )
}
