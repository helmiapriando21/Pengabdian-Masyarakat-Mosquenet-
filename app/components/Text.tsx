import React from "react";

type TextType =
  | "header1"
  | "header2"
  | "header3"
  | "header4"
  | "header5"
  | "header6"
  | "title"
  | "subtitle"
  | "description"
  | "caption"
  | "paragraph";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  type?: TextType;
  children: React.ReactNode;
  className?: string;
}

const textComponentMap: Record<TextType, React.ElementType> = {
  header1: (props) => <h1 {...props} />,
  header2: (props) => <h2 {...props} />,
  header3: (props) => <h3 {...props} />,
  header4: (props) => <h4 {...props} />,
  header5: (props) => <h5 {...props} />,
  header6: (props) => <h6 {...props} />,
  title: (props) => <h2 {...props} />,
  subtitle: (props) => <h3 {...props} />,
  description: (props) => <p {...props} />,
  caption: (props) => <span {...props} />,
  paragraph: (props) => <p {...props} />,
};

const defaultStyles: Record<TextType, string> = {
  header1: "text-[75px] font-bold",
  header2: "text-3xl font-semibold",
  header3: "text-2xl font-semibold",
  header4: "text-xl font-medium",
  header5: "text-lg font-medium",
  header6: "text-base font-medium",
  title: "text-[40px] font-bold",
  subtitle: "text-xl font-semibold",
  description: "text-[25px]",
  caption: "text-sm",
  paragraph: "text-base",
};

const Text: React.FC<TextProps> = ({
  type = "paragraph",
  children,
  className = "",
  ...props
}) => {
  const Component = textComponentMap[type];
  const styleClass = defaultStyles[type];

  return (
    <Component className={`${styleClass} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Text;
