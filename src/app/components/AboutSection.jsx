"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2 columns-2">
        <li>Linux</li>
        <li>Ansible</li>
        <li>Puppet</li>
        <li>AWS</li>
        <li>Jenkins</li>
        <li>Docker</li>
        <li>Podman</li>
        <li>Kubernetes</li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-2">
        <li>
          Dhandhania Infotech <span className="font-semibold">Nov-2024</span><br />
          <span>System Adminitsrator.</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>
          Priydarshani Bhagwati College of Engineering, Nagpur. <span className="font-semibold">2019 - 2023</span><br />
          <span>BE - Computer Science & Engineering.</span>
        </li>
        <br/>
        <li>
          Lal Bahadur Shastri Junior College, Bhandara. <span className="font-semibold">2018 - 2019</span><br />
          <span> HSC - Science.</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>
          <a 
            href="https://www.credly.com/badges/2a7cc7e1-e275-43a8-82f9-14805213c48b/public_url" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:bg-clip-text hover:text-purple-500 hover-gradient transition duration-300"
          >
            Red Hat Certified System Administrator (RHCSA)
          </a>
        </li>
        <li>
          <a 
            href="https://www.credly.com/badges/b395ad98-9ed2-4cbd-93af-1fabf8328097/public_url" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:bg-clip-text hover:text-purple-500 hover-gradient transition duration-300"
          >
            Red Hat Certified Engineer (RHCE)
          </a>
        </li>
        <li>
          <a 
            href="https://www.credly.com/badges/c8dd6e2d-a917-48c7-932d-cbd82241df80/public_url" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:bg-clip-text hover:text-purple-500 hover-gradient transition duration-300"
          >
            Red Hat Certified Specialist in Containers (RHCSC)
          </a>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} alt="about-image"/>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
                  I am a DevOps Engineer and Cloud Engineer focused on optimizing systems and 
          enhancing operational efficiency. Experienced in automation and CI/CD, I work 
          with tools like Docker, Jenkins, AWS, and Ansible. I thrive in collaborative 
          environments and continuously seek to expand my skills. Excited to contribute 
          to innovative projects, I aim to help organizations achieve their goals through 
          effective infrastructure management.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton selectTab={() => handleTabChange("experience")} active={tab === "experience"} >
              {" "}Experience{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"} >
              {" "}Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")} active={tab === "education"} >
              {" "}Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")} active={tab === "certifications"} >
              {" "}Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
