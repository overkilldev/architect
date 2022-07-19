import { HTMLAttributes } from "react";
// Interfaces and types from component SocialButton

// Component Props
export interface SocialButtonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "ref"> {
  icon: JSX.Element;
  title: string;
}

// Styled Component Props
export interface SocialButtonStyledProps {
  className: string;
}
