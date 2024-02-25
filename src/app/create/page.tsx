"use client";
import React, { useEffect, useState } from "react";
import Container from "./_components/Container";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  Input,
  Spinner,
} from "@nextui-org/react";
import { fetchUserDataFromGitHub, fetchUserRepositories } from "@/lib/github";
import useMyStore from "@/utils/context";
import { useRouter } from "next/navigation";
import { Education, UserExperience } from "@/utils/types";

export default function CreateResume() {
  const User = useMyStore((state) => state.user);
  const Repos = useMyStore((state) => state.repos);
  const setUser = useMyStore((state) => state.setUser);
  const setRepos = useMyStore((state) => state.setRepos);
  const [phase, setPhase] = useState(1);
  const [reposWithCheck, setReposWithCheck] = useState(Repos);
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [desc, setDesc] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const [skill, setSkill] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!User) {
      router.push("/");
    }
  }, [User, router]);

  const setEduction = () => {
    if (schoolName.length < 1 || User === null) return;
    const education: Education = {
      school: schoolName,
      degree: degree,
      major: major,
      description: desc,
      date_range: startDate + "," + endDate,
    };
    if (!User.education) {
      setUser({ ...User, education: [education] });
    } else {
      setUser({ ...User, education: [...User.education, education] });
    }
  };
  const setExp = () => {
    if (jobTitle.length < 1 || User === null) return;
    const experiences: UserExperience = {
      title: jobTitle,
      company: companyName,
      location: location,
      description: jobDesc,
      date_range: jobStartDate + "," + jobEndDate,
    };
    if (!User.experiences) {
      setUser({ ...User, experiences: [experiences] });
    } else {
      setUser({ ...User, experiences: [...User.experiences, experiences] });
    }
  };

  return (
    <>
      <Container>
        {phase === 1 && (
          <div className="flex flex-col gap-3 my-3">
            <Card>
              <CardHeader>
                <h1>{User?.name}</h1>
              </CardHeader>
              <CardBody className="flex flex-col gap-3">
                <Input
                  onChange={(e) => {
                    if (User !== null)
                      setUser({ ...User, bio: e.target.value });
                  }}
                  placeholder="Summary"
                  defaultValue={User?.bio}
                  variant="faded"
                  labelPlacement="outside"
                />
                <Input
                  placeholder="Email"
                  onChange={(e) => {
                    if (User !== null)
                      setUser({ ...User, email: e.target.value });
                  }}
                  defaultValue={User?.email}
                  variant="faded"
                  labelPlacement="outside"
                />
                <Input
                  placeholder="location"
                  onChange={(e) => {
                    if (User !== null)
                      setUser({ ...User, location: e.target.value });
                  }}
                  defaultValue={User?.location}
                  variant="faded"
                  labelPlacement="outside"
                />
              </CardBody>
            </Card>

            {reposWithCheck?.map((repo) => {
              return (
                <Card key={repo.name}>
                  <CardHeader>
                    <h3>{repo.name}</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>{repo.description}</p>
                  </CardBody>
                  <CardFooter>
                    <Checkbox
                      isSelected={repo.checked}
                      onValueChange={(check) => {
                        setReposWithCheck(
                          reposWithCheck.map((r) => {
                            if (r?.name === repo?.name) {
                              return { ...r, checked: check };
                            }
                            return r;
                          })
                        );
                      }}
                    >
                      Take it in Resume?
                    </Checkbox>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {phase === 2 && (
          <div className="flex flex-col gap-3 my-3">
            <h1 className="text-3xl">Education</h1>
            <Input
              placeholder="School"
              onChange={(e) => {
                setSchoolName(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Degree"
              onChange={(e) => {
                setDegree(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Major"
              onChange={(e) => {
                setMajor(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <div className="md:flex gap-3">
              <Input
                placeholder="Graduation start date"
                type="date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
              <Input
                placeholder="Graduation end date"
                type="date"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
            </div>
            <Input
              placeholder="Description"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Button
              className=""
              color="primary"
              variant="solid"
              onClick={setEduction}
            >
              Add Eduction
            </Button>
          </div>
        )}
        {phase === 3 && (
          <div className="flex flex-col gap-3 my-3">
            <h1 className="text-3xl">Experience</h1>
            <Input
              placeholder="Title"
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Company name"
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <div className="md:flex gap-3">
              <Input
                placeholder="Job start date"
                type="date"
                onChange={(e) => {
                  setJobStartDate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
              <Input
                placeholder="Job end date"
                type="date"
                onChange={(e) => {
                  setJobEndDate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
            </div>
            <Input
              placeholder="Job description"
              onChange={(e) => {
                setJobDesc(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Button
              className=""
              color="primary"
              variant="solid"
              onClick={setExp}
            >
              Add Experience
            </Button>
          </div>
        )}
        {phase === 4 && (
          <div className="flex flex-col gap-3 my-3">
            <h1 className="text-3xl">Skills</h1>
            <div className="flex gap-4 flex-wrap">
              {User?.skills?.map((c, ind) => {
                return (
                  <Chip
                    onClose={() => {
                      const filterSkill = User.skills.filter(
                        (item) => item !== c
                      );
                      setUser({ ...User, skills: filterSkill });
                    }}
                    key={ind}
                    size="lg"
                  >
                    {c}
                  </Chip>
                );
              })}
            </div>

            <Input
              placeholder="Add skill and press enter"
              value={skill}
              onChange={(e) => {
                const val = e.target.value;
                setSkill(val);
              }}
              onKeyDown={(e) => {
                if (!User) return;
                const { key } = e;
                const trimmedInput = skill.trim();
                if (key.toString() === "Enter" && trimmedInput.length > 0) {
                  if (User?.skills) {
                    e.preventDefault();
                    setSkill((a) => "");
                    setUser({ ...User, skills: [...User.skills, skill] });
                  } else {
                    e.preventDefault();
                    setSkill((a) => "");
                    setUser({ ...User, skills: [skill] });
                  }
                }
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
          </div>
        )}
        <div className="flex gap-3">
          <Button
            className="flex-1"
            color="primary"
            variant="solid"
            disabled={phase === 1}
            onClick={() => {
              setPhase(phase - 1);
            }}
          >
            Back
          </Button>
          <Button
            className="flex-1"
            color="primary"
            variant="solid"
            onClick={() => {
              if (phase < 4) {
                setPhase(phase + 1);
              } else {

                console.log(reposWithCheck, User);
                setRepos(reposWithCheck);
                router.push("/resume");
              }
            }}
          >
            {phase === 4 ? "Create Resume" : "Next"}
          </Button>
        </div>
        {phase === 2 && User && User?.education?.length > 0 && (
          <div className="my-3 flex flex-col gap-3">
            {User.education.map((ed, ind) => {
              return <Card key={ind}>
                <CardHeader>
                  <h1>{ed.school}</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Degree : {ed.degree}</p>
                  <p>Major: {ed.major}</p>
                  <p>Date : {ed.date_range}</p>
                  <p>Description : {ed.description}</p>
                </CardBody>
              </Card>
            })}
          </div>
        )}
        {phase === 3 && User && User?.experiences?.length > 0 && (
          <div className="my-3 flex flex-col gap-3">
            {User.experiences.map((ed, ind) => {
              return (
                <Card key={ind}>
                  <CardHeader>
                    <h1>{ed.title}</h1>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Company : {ed.company}</p>
                    <p>Location: {ed.location}</p>
                    <p>Date : {ed.date_range}</p>
                    <p>Description : {ed.description}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
