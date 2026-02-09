"use client";
import React, { useRef } from "react";
import CertificateCard from "./CertificationCard";
import { motion, useInView } from "framer-motion";

const CertificationData = [
  {
    id: 1,
    title: "Red Hat Certified System Administrator",
    description: "I mastered essential Linux administration skills, focusing on system configuration, managing users, and automating tasks, which strengthened my foundation in Linux systems.",
    image: "/images/badges/RHCSA.png",
    credlyUrl: "https://www.credly.com/badges/2a7cc7e1-e275-43a8-82f9-14805213c48b/public_url",
    previewUrl: "/documents/certificates/Red_Hat_Certified_System_Administrator__RHCSA__Badge20240918-7-yud221.pdf",
  },
  {
    id: 2,
    title: "Red Hat Certified Engineer",
    description: "Through this certification, I honed my expertise in advanced Linux system administration and automation with Ansible, enabling me to streamline complex IT processes and improve efficiency.",
    image: "/images/badges/RHCE.png",
    credlyUrl: "https://www.credly.com/badges/b395ad98-9ed2-4cbd-93af-1fabf8328097/public_url",
    previewUrl: "/documents/certificates/Red_Hat_Certified_Engineer__RHCE__Badge20240918-7-vgeatx.pdf",
  },
  {
    id: 3,
    title: "Red Hat Certified Specialist in Containers",
    description: "I developed specialized skills in containerization, learning how to deploy, manage, and troubleshoot containerized applications using tools like Podman and Docker to enhance scalability and flexibility.",
    image: "/images/badges/RHCSC.png",
    credlyUrl: "https://www.credly.com/badges/c8dd6e2d-a917-48c7-932d-cbd82241df80/public_url",
    previewUrl: "/documents/certificates/Red_Hat_Certified_Specialist_in_Containers_Badge20240918-7-dd7few.pdf",
  },
];

const CertificationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="certificate">
      <h2 className="text-center text-4xl font-bold text-white mt-8 mb-4 md:mb-6">
        My Certifications
      </h2>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {CertificationData.map((certificate, index) => (
          <motion.li
            key={certificate.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <CertificateCard
              title={certificate.title}
              description={certificate.description}
              imgUrl={certificate.image}
              credlyUrl={certificate.credlyUrl}
              previewUrl={certificate.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default CertificationSection;
