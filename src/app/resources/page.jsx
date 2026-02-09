"use client";
import React, { useState, useRef } from "react";
import ResourceCard from "./ResourceCard";
import ResourceTag from "./ResourceTag";
import { motion, useInView } from "framer-motion";

const resourcesData = [
  {
    id: 1,
    title: "AWS Resource Audit",
    description: "AWS Resource Audit is a shell script that automates the process of listing various AWS resources across multiple services in a specified region. This tool is ideal for auditing and keeping track of resources such as EC2 instances, S3 buckets, VPCs, and more.",
    image: "/images/projects/1.png",
    tag: ["All", "Script"],
    gitUrl: "https://github.com/PiyushN-24/AWS-Resourse-Audit.git",
    previewUrl: "https://github.com/PiyushN-24/AWS-Resourse-Audit/blob/master/README.md",
  },
  {
    id: 2,
    title: "Ansible VM Watch",
    description: "Ansible-VM-Watch is a powerful automation tool designed to monitor the health of AWS-hosted virtual machines. This project combines Ansible, AWS CLI, and Shell scripting to dynamically manage EC2 inventory, inject SSH keys, tag instances, and extract system health metrics like CPU, RAM, and disk usage.",
    image: "/images/projects/3.png",
    tag: ["All", "DevOps"],
    gitUrl: "https://github.com/PiyushN-24/Ansible-VM-Watch.git",
    previewUrl: "https://github.com/PiyushN-24/Ansible-VM-Watch/blob/master/README.md",
  },
  {
    id: 3,
    title: "Backup Automation Tool",
    description: "The backup_script.sh script is designed to perform backups of a specified directory with optional compression. It supports various compression methods including gzip, bzip2, zip, and xz. The script logs the status of the backup operation and optionally removes old backups.",
    image: "/images/projects/2.jpg",
    tag: ["All", "Script"],
    gitUrl: "https://github.com/PiyushN-24/BackupAutomationTool.git",
    previewUrl: "https://github.com/PiyushN-24/BackupAutomationTool/blob/master/README.md",
  },
  {
    id: 4,
    title: "Ansible Monitoring Stack",
    description: "An Ansible-based Monitoring Stack project designed to automate the deployment and configuration of Grafana, Prometheus, Prometheus Node Exporter, and Alertmanager across a set of nodes. This repository aims to simplify infrastructure monitoring using a reliable and scalable solution.",
    image: "/images/projects/4.jpeg",
    tag: ["All", "Script"],
    gitUrl: "https://github.com/PiyushN-24/Ansible-Monitoring-Stack.git",
    previewUrl: "https://github.com/PiyushN-24/Ansible-Monitoring-Stack/blob/master/README.md",
  }
  
];

const ResourcesSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredresources = resourcesData.filter((resource) =>
    resource.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="resources">
      <h2 className="text-center text-4xl font-bold text-white mt-8 mb-2 md:mb-6">
        Resources
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-4">
        <ResourceTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ResourceTag
          onClick={handleTagChange}
          name="DevOps"
          isSelected={tag === "DevOps"}
        />
        <ResourceTag
          onClick={handleTagChange}
          name="Script"
          isSelected={tag === "Script"}
        />
      </div>
      <ul ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 lg:px-12">
       {filteredresources.map((resource, index) => (
        <motion.li
         key={index}
         variants={cardVariants}
         initial="initial"
         animate={isInView ? "animate" : "initial"}
         transition={{ duration: 0.3, delay: index * 0.4 }}
         className="flex justify-center"
        >
        <ResourceCard
         key={resource.id}
         title={resource.title}
         description={resource.description}
         imgUrl={resource.image}
         gitUrl={resource.gitUrl}
         previewUrl={resource.previewUrl}
        />
       </motion.li>
       ))}
      </ul>
    </section>
  );
};

export default ResourcesSection;
