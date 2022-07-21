import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
// Interfaces and types from component SocialButton

// Component Props
export interface SocialButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: JSX.Element;
  title: string;
}

// Styled Component Props
export interface SocialButtonStyledProps {
  className: string;
}
