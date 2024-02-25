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
  const [phase, setPhase] = useState(1);
  const [reposWithCheck, setReposWithCheck] = useState(
    Repos.map((repo) => ({ repo, checked: false }))
  );
  const [schoolname, setschoolname] = useState("");
  const [degree, setdegree] = useState("");
  const [major, setmajor] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [desc, setdesc] = useState("");

  const [jobtitle, setjobtitle] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [location, setlocation] = useState("");
  const [jobstartdate, setjobstartdate] = useState("");
  const [jobenddate, setjobenddate] = useState("");
  const [jobdesc, setjobdesc] = useState("");

  const [skill, setskill] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!User) {
      router.push("/");
    }
  }, [User, router]);

  const setEduction = () => {
    if (schoolname.length < 1 || User === null) return;
    const education: Education = {
      school: schoolname,
      degree: degree,
      major: major,
      description: desc,
      date_range: startdate + "," + enddate,
    };
    if (!User.education) {
      setUser({ ...User, education: [education] });
    } else {
      setUser({ ...User, education: [...User.education, education] });
    }
  };
  const setExp = () => {
    if (jobtitle.length < 1 || User === null) return;
    const experiences: UserExperience = {
      title: jobtitle,
      company: companyname,
      location: location,
      description: jobdesc,
      date_range: jobstartdate + "," + jobenddate,
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
                <Card key={repo.repo.name}>
                  <CardHeader>
                    <h3>{repo.repo.name}</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>{repo.repo.description}</p>
                  </CardBody>
                  <CardFooter>
                    <Checkbox
                      isSelected={repo.checked}
                      onValueChange={(check) => {
                        setReposWithCheck(
                          reposWithCheck.map((r) => {
                            if (r?.repo?.name === repo?.repo?.name) {
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
                setschoolname(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Degree"
              onChange={(e) => {
                setdegree(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Major"
              onChange={(e) => {
                setmajor(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <div className="md:flex md:space-x-3">
              <Input
                placeholder="Graduation start date"
                onChange={(e) => {
                  setstartdate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
              <Input
                placeholder="Graduation end date"
                onChange={(e) => {
                  setenddate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
            </div>
            <Input
              placeholder="Description"
              onChange={(e) => {
                setdesc(e.target.value);
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
                setjobtitle(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Company name"
              onChange={(e) => {
                setcompanyname(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <Input
              placeholder="Location"
              onChange={(e) => {
                setlocation(e.target.value);
              }}
              // defaultValue={User?.education}
              variant="faded"
              labelPlacement="outside"
            />
            <div className="md:flex md:space-x-3">
              <Input
                placeholder="Job start date"
                onChange={(e) => {
                  setjobstartdate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
              <Input
                placeholder="Job end date"
                onChange={(e) => {
                  setjobenddate(e.target.value);
                }}
                // defaultValue={User?.education}
                variant="faded"
                labelPlacement="outside"
              />
            </div>
            <Input
              placeholder="Job description"
              onChange={(e) => {
                setjobdesc(e.target.value);
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
                      const filterskill = User.skills.filter(
                        (item) => item !== c
                      );
                      setUser({ ...User, skills: filterskill });
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
              onChange={(e) => {
                const val = e.target.value;
                setskill(val);
              }}
              onKeyDown={(e) => {
                if (!User) return;
                const { key } = e;
                const trimmedInput = skill.trim();
                if (key.toString() === "Enter" && trimmedInput.length > 0) {
                  if (User?.skills) {
                    e.preventDefault();
                    setskill((a) => "");
                    setUser({ ...User, skills: [...User.skills, skill] });
                  } else {
                    e.preventDefault();
                    setskill((a) => "");
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
              }
            }}
          >
            {phase === 4 ? "Create Resume" : "Next"}
          </Button>
        </div>
        {phase === 2 && User && User?.education?.length > 0 && (
          <div>
            {User.education.map((ed, ind) => {
              return <h1 key={ind}>{ed.school}</h1>;
            })}
          </div>
        )}
        {phase === 3 && User && User?.experiences?.length > 0 && (
          <div>
            {User.experiences.map((ed, ind) => {
              return (
                <>
                  <h1 key={ind}>{ed.title}</h1>
                </>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
