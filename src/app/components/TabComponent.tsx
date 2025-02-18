"use client";

import { useState, ReactNode } from 'react';

interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabComponentProps {
  tabs: TabItem[];
  defaultTab?: number;
}

export default function TabComponent({ tabs, defaultTab = 0 }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === index
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
