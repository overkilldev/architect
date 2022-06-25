import React from "react";
import { Link as RRDLink, useNavigate } from "react-router-dom";

import { LinkProps as Props } from "./Link.types";

const Link: React.FC<Props> = props => {
  const { children, to, ...rest } = props;
  const navigate = useNavigate();

  if (!window.isVsCode) {
    return (
      <RRDLink {...rest} to={to}>
        {children}
      </RRDLink>
    );
  }

  return (
    <div className="Link inline" onClick={() => navigate(to)}>
      {children}
    </div>
  );
};

Link.defaultProps = {};

export default Link;
