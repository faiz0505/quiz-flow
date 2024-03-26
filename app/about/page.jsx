import Link from "next/link";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
const page = () => {
  return (
    <main className="w-full px-2 md:px-12 lg:px-28">
      <h1 className="text-3xl font-bold mb-4 text-white mt-10">
        About QuizFlow
      </h1>
      <p className="text-white mb-8">
        QuizFlow is a dynamic quiz platform designed to make learning fun and
        engaging. Our mission is to provide a diverse range of quizzes across
        various categories, fostering a love for knowledge and friendly
        competition.
      </p>
      <h2 className="text-2xl font-bold mb-4 text-white">Meet the Developer</h2>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold">Faiz Ali</h3>
        <p className="text-gray-600">
          Full Stack Web Developer [Reactjs,Nextjs,Nodejs]
        </p>
        <p className="text-gray-600 text-sm">
          College : Late Babanrao Deshmukh Mahaviddiyalay, Amravati
        </p>
        <h4 className="mt-2 font-bold mb-1">Follow :</h4>
        <ul className="flex gap-x-4">
          <li>
            <Link
              href={
                "https://www.instagram.com/sayyad_faiz_ali_?igsh=MXhnNTUxeGFheWx6OA=="
              }
            >
              <FaInstagram className="text-2xl" />
            </Link>
          </li>
          <li>
            <Link
              href={
                "https://www.linkedin.com/in/faiz-ali-041343217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              }
            >
              <FaLinkedin className="text-2xl" />
            </Link>
          </li>
          <li>
            <Link href={"https://github.com/faiz0505"}>
              <FaGithub className="text-2xl" />
            </Link>
          </li>
        </ul>
        <h4 className="mt-4 font-bold mb-1">Contact:</h4>
        <p className="text-gray-600">Email: faizali786313@.gmail.com</p>
      </div>
    </main>
  );
};

export default page;
