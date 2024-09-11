// HeaderBox.tsx
import React from 'react';

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {/* Ensure that the user is displayed only when type is 'greeting' and user is present */}
        {type === "greeting" && user ? (
          <span className="text-indigo-900">&nbsp;{user}</span>
        ) : (
          type === "greeting" && (
            <span className="text-indigo-900">&nbsp;{user}</span>
          ) // Fallback for missing user
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  )
};

export default HeaderBox;
