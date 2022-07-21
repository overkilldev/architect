import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { SiderProps as Props } from "./Sider.types";

const Sider: React.FC<Props> = props => {
  const { children, expanded, onChange } = props;
  const siderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<Element | null>(null);
  const [collapsed, setCollapsed] = useState(!expanded);

  useEffect(() => {
    setCollapsed(!expanded);
  }, [expanded]);

  useEffect(() => {
    onChange?.(!collapsed);
  }, [collapsed, onChange]);

  useLayoutEffect(() => {
    if (!siderRef.current) return;
    contentRef.current = siderRef.current?.previousElementSibling ?? null;
  }, []);

  useLayoutEffect(() => {
    const sider = siderRef.current;
    const content = contentRef.current as HTMLElement;
    if (!sider || !content) return;
    if (!("style" in content)) return;

    if (collapsed) {
      sider.style.transform = "translateX(0px)";
      sider.style.willChange = "unset";
      content.style.marginRight = "0px";
      content.style.willChange = "unset";
    } else {
      const siderWidth = sider.getBoundingClientRect().width;
      sider.style.transform = `translateX(-${siderWidth}px)`;
      sider.style.willChange = "transform";
      content.style.marginRight = `${siderWidth}px`;
      content.style.willChange = "transform";
    }
  }, [collapsed]);

  return (
    <aside
      className="Sider w-96 bg-red-500 h-full fixed top-0 left-full transition-transform"
      ref={siderRef}
      onClick={() => setCollapsed(prev => !prev)}
    >
      {children}
    </aside>
  );
};

Sider.defaultProps = {};

export default Sider;
