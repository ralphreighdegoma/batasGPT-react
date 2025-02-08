"use client";

import Post from "./Post";

export default function MyPosts() {
  //get user from local storage
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);
  const userAvatar = userData.avatar;
  const userName = userData.name;
  const userTitle = userData.title;
  const userBio = userData.bio;
  const samplePosts = [
    {
      content: "Just finished working on an exciting case involving AI and intellectual property rights. The intersection of technology and law continues to present fascinating challenges. Looking forward to sharing more insights on this topic! #LegalTech #AI #IntellectualProperty",
    },
    {
      content: "Gave a guest lecture today at the local law school about the importance of digital literacy in modern legal practice. It's crucial that the next generation of lawyers understands how technology is reshaping our profession. #LegalEducation #DigitalTransformation",
    },
    {
      content: "Published a new article on our firm's blog about recent developments in privacy law and data protection. Check it out if you're interested in staying up-to-date with the latest regulatory changes! #PrivacyLaw #DataProtection",
    },
    {
      content: "Excited to announce that I'll be speaking at next month's Legal Tech Conference about AI-powered legal research tools. If you're attending, come say hello! #Conference #LegalInnovation",
    },
    {
      content: "Reflecting on how much legal practice has changed in the last decade. From paper-based systems to cloud computing and AI assistants - it's been quite a journey! What changes do you think the next decade will bring? #FutureOfLaw #LegalTechnology",
    }
  ];

  return (
    <div className="space-y-6">
      <Post
        userAvatar={userAvatar}
        userName={userName}
        content=""
      />
      {samplePosts.map((post, index) => (
        <Post
          key={index}
          userAvatar="https://randomuser.me/api/portraits/men/42.jpg"
          userName="John Doe"
          content={post.content}
        />
      ))}
    </div>
  );
}
