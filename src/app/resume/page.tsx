"use client"
import useMyStore from '@/utils/context'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// let prompt = `You are tasked with designing a visually stunning and professional resume template in HTML format. The resume should be modern, easy to read, and stand out to potential employers. Consider incorporating elegant typography, subtle colors, and strategic use of whitespace to enhance readability and visual appeal. Your design should highlight the candidate's skills, experience, and achievements effectively, with clear sections for education, work experience, skills, and contact information. Aim to create a resume template that captures attention while maintaining a professional look and feel

//         Candidate's name: ${user?.name}
//         Candidate's email: ${user?.email}
//         ${user?.bio ? `Candidate's bio: ${user?.bio}` : ''}
//         Candidate's location: ${user?.location}
//         Candidate's website: ${user?.blog}
//         Candidate's GitHub: ${user?.html_url}
//         Candidate's social links : ${user?.social_accounts.map((acc) => acc.provider + ' : ' + acc.url).join(', ')}
//         Candidate's skills: ${user?.skills.join(', ')}
//         Candidate's projects: ${repos?.map((repo) => {
//             if (!repo.checked) {
//                 return '';
//             }
//             return `Name : ${repo.name}
//                     description : ${repo.description}
//                     TechStack : ${repo.language}
//                     Github Url : ${repo.html_url}
//                     Live url : ${repo.homepage ? repo.homepage : 'N/A'}
//                     topics : ${repo.topics.join(', ')}
//                     Created at : ${repo.created_at}
//             `;
//         }).join('\n')}
//         Candidate's work experience: ${user?.experiences.map((exp) => {
//             return `Title : ${exp.title}
//                     Company : ${exp.company}
//                     Location : ${exp.location}
//                     Date Range : ${exp.date_range}
//                     Description : ${exp.description}
//             `;
//         })}
//         Candidate's education: ${user?.education.map((edu) => {
//             return `Institution : ${edu.school}
//                     Degree : ${edu.degree}
//                     Field of study : ${edu.major}
//                     Date Range : ${edu.date_range}
//                     Description : ${edu.description}
//             `;
//         })}
//         `;

export default function Page() {
    const user = useMyStore(state => state.user)
    const repos = useMyStore(state => state.repos)
    const resume = useMyStore(state => state.resume)
    const setResume = useMyStore(state => state.setResume)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const GenerateResume = async () => {
        // console.log(prompt);
        // const result = await generateText(prompt);
        // setResume(result)

        setLoading(false)
    }

    useEffect(() => {
        if (!user || !repos) {
            router.push('/');
        } else {
            GenerateResume();
        }
    }, [])

    return (
        <div>
            <p>Generating Resume For you</p>
            {loading && <Spinner />}

            <div dangerouslySetInnerHTML={{ __html: resume }}>
            </div>

        </div>
    )
}
