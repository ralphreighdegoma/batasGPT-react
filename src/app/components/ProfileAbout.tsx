"use client";

interface ProfileAboutProps {
  aboutText?: string;
}

export default function ProfileAbout({
  aboutText = "I am a dedicated legal professional with over 10 years of experience in constitutional law and civil rights advocacy. My work focuses on leveraging technology to make legal services more accessible to underserved communities.\n\nI have successfully led multiple pro-bono initiatives and developed digital platforms that help simplify complex legal processes. Currently, I'm working on an AI-powered legal assistance tool that can provide basic legal guidance to those who cannot afford traditional legal services.\n\nOutside of work, I enjoy teaching law at local community colleges and mentoring aspiring legal professionals. I'm also an active member of several legal tech communities and regularly contribute to open-source legal documentation projects.\n\nI believe in the power of technology to democratize legal knowledge and am constantly exploring new ways to bridge the gap between the legal system and the general public."
}: ProfileAboutProps) {

  //get about me from localstorage user.aboutMe
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const aboutMe = user.aboutMe;
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
      <div className="text-gray-600 leading-relaxed whitespace-pre-line">
        {aboutMe}
      </div>
    </div>
  );
}
