import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Your Gitsume Resume",
    description: "Gitsume is a GitHub-powered resume generator that leverages the data from a user's GitHub profile to automatically generate a professional resume. ",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}
