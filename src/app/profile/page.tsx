"use client";

import ProfileInfo from '../components/ProfileInfo';
import Sidebar from '../components/Sidebar';
import ProfileAbout from '../components/ProfileAbout';
import ProfileTab from '../components/ProfileTab';
import MyPosts from '../components/MyPosts';
export default function ProfilePage() {
  return (
    <div className="min-h-screen flex">
      <div className="fixed top-0 left-0 w-64 mt-4 ml-4">
        <Sidebar activeMenu="profile" />
      </div>

      <div className="ml-72 flex-1 bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <ProfileInfo
            name="John Doe"
            title="Legal Technology Specialist"
            bio="Dedicated legal technology specialist with expertise in developing innovative solutions for the legal industry. Focused on creating tools and platforms that make legal services more accessible and efficient. Passionate about the intersection of law and technology."
          />
          <ProfileTab
            tabs={[
            { label: 'Posts', content: <MyPosts /> },
            { label: 'About', content: <ProfileAbout /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
