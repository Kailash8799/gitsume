"use client";
import React, { useEffect, useState } from "react";
import Container from "./_components/Container";
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Divider, Input, Spinner } from "@nextui-org/react";
import { fetchUserDataFromGitHub, fetchUserRepositories } from "@/lib/github";
import useMyStore from "@/utils/context";
import { useRouter } from "next/navigation";

export default function CreateResume() {
  const User = useMyStore((state) => state.user);
  const Repos = useMyStore((state) => state.repos);
  const [phase, setPhase] = useState(1)
  const [reposWithCheck, setReposWithCheck] = useState(Repos.map((repo) => ({ repo, checked: false })))

  const router = useRouter();

  useEffect(() => {
    if (!User) {
      router.push("/");
    }
  }, [User, router]);

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
                <Input placeholder="Summary" defaultValue={User?.bio} variant="faded" labelPlacement="outside" />
                <Input placeholder="Email" defaultValue={User?.email} variant="faded" labelPlacement="outside" />
                <Input placeholder="location" defaultValue={User?.location} variant="faded" labelPlacement="outside" />
              </CardBody>
            </Card>

            {reposWithCheck.map((repo) => {
              return (<Card key={repo.repo.name} >
                <CardHeader>
                  <h3>{repo.repo.name}</h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>{repo.repo.description}</p>
                </CardBody>
                <CardFooter>
                  <Checkbox isSelected={repo.checked} onValueChange={(check) => {
                    setReposWithCheck(reposWithCheck.map((r) => {
                      if (r.repo.name === repo.repo.name) {
                        return { ...r, checked: check }
                      }
                      return r
                    }))
                  }}>Take it in Resume?</Checkbox>
                </CardFooter>
              </Card>)
            })}
          </div>
        )}

        {phase === 2 && (
          <div className="flex flex-col gap-3 my-3">
            <h1 className="text-3xl">Education</h1>
            <Input placeholder="School" variant="faded" labelPlacement="outside" />
          </div>
        )}
        {phase === 3 && (
          <div className="flex flex-col gap-3 my-3">
            <h1>Experience</h1>
          </div>
        )}
        {phase === 4 && (
          <div className="flex flex-col gap-3 my-3">
            <h1>Skills</h1>
          </div>
        )}
        <div className="flex gap-3">
          <Button className="flex-1" color="primary" variant="solid" disabled={phase === 1} onClick={() => {
            setPhase(phase - 1)
          }}>
            Back
          </Button>
          <Button className="flex-1" color="primary" variant="solid" onClick={() => {
            if (phase < 4) {
              setPhase(phase + 1)
            } else {
              console.log(reposWithCheck, User);
            }
          }}>
            {phase === 4 ? "Create Resume" : "Next"}
          </Button>
        </div>
      </Container>
    </>
  );
}
