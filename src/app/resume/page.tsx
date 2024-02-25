"use client"
import useMyStore from '@/utils/context'
import { Repo, User } from '@/utils/types'
import { Button, Spinner } from '@nextui-org/react'
import jsPDF from 'jspdf'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const generateResumeTemplate = (user: User, projects: Repo[]) => {
    return `
    <html lang="en">
    <body>
        <style>
            /* Add your custom styles here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                margin: 0;
                padding: 0;
                line-height: 1.6;
            }
            .container1 {
                width: 100% !important;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            header {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
            }
            .avatar {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin-bottom: 10px;
            }
            h1, h2, h3 {
                color: #007bff;
            }
            .section {
                margin-bottom: 10px;
            }
            .section-title {
                font-size: 24px;
                margin-bottom: 10px;
                border-bottom: 2px solid #007bff;
                padding-bottom: 5px;
            }
            .subsection {
                margin-top: 20px;
            }
            .subsection-title {
                font-size: 18px;
                margin-bottom: 5px;
                color: #555;
            }
            .list {
                padding-left: 20px;
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            .list-item {
                margin-bottom: 5px;
            }
            .project {
                margin-bottom: 20px;
            }
            .project-title {
                font-size: 20px;
                margin-bottom: 5px;
            }
            .project-description {
                margin-bottom: 5px;
            }
            .project-meta {
                font-size: 14px;
                color: #555;
            }
        </style>
        <style type="text/css" media="print">
            @page {
                size: auto;   /* auto is the initial value */
                margin: 0;  /* this affects the margin in the printer settings */
            }
        </style>
    
        <div class="container1" id="resume">
            <header>
                <img class="avatar" src="${user.avatar_url}" alt="Profile Picture">
                <h1>${user.name}</h1>
                <p>${user.bio}</p>
                <p>${user.location}</p>
                <p>${user.email}</p>
                <p>Followers: ${user.followers} | Following: ${user.following}</p>
            </header>
            <div class="section">
                <h2 class="section-title">Skills</h2>
                <ul class="list">
                    ${user.skills.map(skill => `<li class="list-item">${skill}</li>`).join('')}
                </ul>
            </div>
            <div class="section">
                <h2 class="section-title">Experience</h2>
                ${user.experiences.map(experience => `
                    <div class="subsection">
                        <h3 class="subsection-title">${experience.title}</h3>
                        <p>${experience.company} | ${experience.location}</p>
                        <p>${new Date(experience.date_range.split(',')[0]).getFullYear()} - ${experience.date_range.split(',')[1] !== "" ? new Date(experience.date_range.split(',')[1]).getFullYear() : "present"}</p>
                        <p>${experience.description}</p>
                    </div>
                `).join('')}
            </div>
            <div class="section">
                <h2 class="section-title">Education</h2>
                ${user.education.map(edu => `
                    <div class="subsection">
                        <h3 class="subsection-title">${edu.school}</h3>
                        <p>${edu.degree} - ${edu.major}</p>
                        <p>${new Date(edu.date_range.split(',')[0]).getFullYear()} - ${edu.date_range.split(',')[1] !== "" ? new Date(edu.date_range.split(',')[1]).getFullYear() : "present"}</p>
                        <p>${edu.description}</p>
                    </div>
                `).join('')}
            </div>
            <div class="section">
                <h2 class="section-title">Projects</h2>
                ${projects.map(project => `
                    <div class="project">
                        <a href="${project.html_url}">
                        <h3 class="project-title">${project.name}</h3>
                        </a>
                        <p class="project-description">${project.description}</p>
                        <p class="project-meta">Language: ${project.language}</p>
                        <p class="project-meta">Stars: ${project.stargazers_count}</p>
                        <p class="project-meta">Created at: ${new Date(project.created_at).getFullYear()}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </body>
    </html>
    `;
};

export default function Page() {
    const user = useMyStore(state => state.user)
    const repos = useMyStore(state => state.repos)
    const resume = useMyStore(state => state.resume)
    const setResume = useMyStore(state => state.setResume)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const GenerateResume = async () => {
        const resume = generateResumeTemplate(user!, repos.filter(repo => repo.checked))
        console.log(resume);

        setResume(resume)
        setLoading(false)
    }

    const downloadPdf = () => {
        document.getElementById('navbar')?.style.setProperty('display', 'none');
        document.getElementById('btn')?.style.setProperty('display', 'none');
        window.print();
        document.getElementById('navbar')?.style.setProperty('display', 'flex');
        document.getElementById('btn')?.style.setProperty('display', 'block');
    }

    useEffect(() => {
        if (!user || !repos) {
            router.push('/');
        } else {
            GenerateResume();
        }
    }, [user, repos, router])

    return (
        <div className='flex flex-col gap-5 my-5 justify-center items-center'>

            {loading && <Spinner label='Generating Resume For you' />}

            {!loading && <Button id='btn' onClick={downloadPdf}>Download PDF</Button>}

            <div className='w-full' dangerouslySetInnerHTML={{ __html: resume }}>
            </div>

        </div>
    )
}
