import React, { useState } from "react";
import { Resizable } from "re-resizable";
import "./styles.css";

const Layout = () => {
  const [componentWidths, setComponentWidths] = useState({
    left: 200,
    middle: 400,
    right: 300
  });

  const handleResize = (direction, component, size) => {
    const newSize = { ...componentWidths, [component]: size.width };
    setComponentWidths(newSize);
  };

  return (
    <div className="layout">
      <Resizable
        defaultSize={{ width: componentWidths.left, height: "100%" }}
        minWidth={100}
        maxWidth="70%"
        onResize={(e, direction, size) =>
          handleResize(direction, "left", size)
        }
      >
        <div className="component left">
          <h2>Left Component</h2>
          <p>Resizable from right</p>
        </div>
      </Resizable>
      <Resizable
        defaultSize={{ width: componentWidths.middle, height: "100%" }}
        minWidth={100}
        maxWidth="70%"
        onResize={(e, direction, size) =>
          handleResize(direction, "middle", size)
        }
      >
        <div className="component middle">
          <h2>Middle Component</h2>
          <p>Resizable from both sides</p>
        </div>
      </Resizable>
      <Resizable
        defaultSize={{ width: componentWidths.right, height: "100%" }}
        minWidth={100}
        maxWidth="70%"
        onResize={(e, direction, size) =>
          handleResize(direction, "right", size)
        }
      >
        <div className="component right">
          <h2>Right Component</h2>
          <p>Resizable from left</p>
        </div>
      </Resizable>
    </div>
  );
};

export default Layout;
