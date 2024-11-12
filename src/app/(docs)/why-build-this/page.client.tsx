"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


export function WhyBuildThisPageClient() {
  return (
    <motion.div
      className="prose prose-gray max-w-xl mx-auto space-y-4 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
    <motion.h1
      className="text-center text-2xl font-bold"
      variants={itemVariants}
    >
      Why Build Relaunch?
    </motion.h1>
    <motion.p className="text-center text-sm" variants={itemVariants}>
      Irere Emmanuel, Founder of Relaunch
    </motion.p>
    <motion.h3 className="text-lg font-bold" variants={itemVariants}>
      The Inspiration
    </motion.h3>
    <motion.p variants={itemVariants}>
      My inspiration for this project stemmed from my experience working on a
      project called Spek. I recognized the importance of gathering feedback
      to refine the product into something that truly meets the needs of
      users. By leveraging reviews and analytics, that would not only enhance
      the product but also share the concept with a broader community of
      creators.
    </motion.p>
    <motion.h3 className="text-lg font-bold" variants={itemVariants}>
      The Features
    </motion.h3>
    <motion.p variants={itemVariants}>
      One of the key features of Relaunch is the ability to create detailed{" "}
      <mark>
        <i>project profiles</i>
      </mark>
      . These profiles allow creators to showcase their projects, providing
      potential users and collaborators with a comprehensive understanding of
      the project's <mark>goals</mark>, <mark>progress</mark>, and{" "}
      <mark>unique aspects</mark>.
    </motion.p>
    <motion.p variants={itemVariants}>
      <mark>
        <i>Analytics</i>
      </mark>{" "}
      play a crucial role in the development and refinement of projects on
      Relaunch. By providing creators with in-depth insights into{" "}
      <mark>user behavior</mark> and <mark>engagement</mark>, they can make{" "}
      <mark>data-driven decisions</mark> to enhance their projects and better
      meet the needs of their audience.
    </motion.p>
    <motion.p variants={itemVariants}>
      Gathering <mark>
        <i>feedback</i>
      </mark>{" "}
      is essential for the continuous improvement of any project. Relaunch
      offers a robust feedback system that enables users to share their
      thoughts and suggestions, helping creators to identify areas for
      improvement and implement changes that will resonate with their
      audience.
    </motion.p>
    <motion.p variants={itemVariants}>
      The <mark>
        <i>rating feature</i>
      </mark>{" "}
      on Relaunch allows users to rate projects based on their experiences.
      This not only helps other users discover high-quality projects but also
      provides valuable feedback to creators, enabling them to understand how
      their projects are perceived and where they can make improvements.
    </motion.p>
    <motion.p variants={itemVariants}>
      In the near future, Relaunch will introduce a{" "}
      <mark>project newsletter feature</mark>. This will allow creators to
      keep their audience informed about the latest updates, milestones, and
      developments in their projects, fostering a sense of community and
      engagement.
    </motion.p>
    <motion.p variants={itemVariants}>
      Additionally, Relaunch has plans to implement <mark>waitlists</mark> for
      upcoming projects. This feature will enable users to express their
      interest in new projects before they are launched, helping creators{" "}
      <mark>gauge demand</mark> and <mark>build anticipation</mark> for their
      releases.
    </motion.p>
  </motion.div>
  )
}
