import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";

const CustomNode = (props: any) => {
  const { isConnectable, data } = props;

  return (
    <div onClick={data.onClick}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
        onError={(e) => console.log({ e })}
      />
      <p style={{ border: "1px solid black", padding: "16px", margin: 0 }}>
        {data.label}
      </p>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(CustomNode);
