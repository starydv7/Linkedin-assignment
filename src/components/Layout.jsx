import React, { useState } from "react";
import { Resizable } from "re-resizable";
import "./styles.css";

const Layout = () => {
  const [componentWidths, setComponentWidths] = useState({
    left: 200,
    middle: 400,
    right: 300
  });

  const handleResize = (component, size) => {
    setComponentWidths(prevWidths => ({
      ...prevWidths,
      [component]: size.width
    }));
  };

  return (
    <div className="layout">
      <Resizable
        defaultSize={{ width: componentWidths.left, height: "100%" }}
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: true,
          topRight: false,
          bottomRight: true,
          bottomLeft: true,
          topLeft: false
        }}
        onResizeStop={(e, direction, ref, d) => handleResize("left", ref.style)}
      >
        <div className="component left">
          <h2>Left Component</h2>
          <p>Resizable from all sides</p>
        </div>
      </Resizable>
      <Resizable
        defaultSize={{ width: componentWidths.middle, height: "100%" }}
        enable={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: false,
          bottomRight: true,
          bottomLeft: true,
          topLeft: false
        }}
        onResizeStop={(e, direction, ref, d) => handleResize("middle", ref.style)}
      >
        <div className="component middle">
          <h2>Middle Component</h2>
          <p>Resizable from all sides</p>
        </div>
      </Resizable>
      <Resizable
        defaultSize={{ width: componentWidths.right, height: "100%" }}
        enable={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: false,
          bottomRight: true,
          bottomLeft: true,
          topLeft: false
        }}
        onResizeStop={(e, direction, ref, d) => handleResize("right", ref.style)}
      >
        <div className="component right">
          <h2>Right Component</h2>
          <p>Resizable from all sides</p>
        </div>
      </Resizable>
    </div>
  );
};

export default Layout;
