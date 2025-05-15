import React, { useState, ReactNode, isValidElement } from "react";

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
  title?: string;
}

interface CardItem extends React.PropsWithChildren<{}> {
  props: {
    children: React.ReactNode[];
  };
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder: React.FC<FolderProps> = ({
  color = "#00d8ff",
  size = 1,
  items = [],
  className = "",
  title = "",
}) => {
  const maxItems = 5;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";
  const paper4 = darkenColor("#ffffff", 0.03);
  const paper5 = darkenColor("#ffffff", 0.08);

  const handleClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.65;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    if (index === 0) return "translate(-120%, -70%) rotate(-15deg)";
    if (index === 1) return "translate(50%, -70%) rotate(15deg)";
    if (index === 2) return "translate(-150%, -100%) rotate(5deg)";
    if (index === 3) return "translate(-180%, -85%) rotate(-10deg)";
    if (index === 4) return "translate(140%, -85%) rotate(10deg)";
    return "";
  };

  const spacing = 20; // Spacing between cards when open
  const getSpreadTransform = (index: number) => {
    if (!open) return "";
    const angles = [-30, -15, 0, 15, 30];
    const distance = 180;
    const angle = angles[index];
    const x = Math.sin((angle * Math.PI) / 180) * distance;
    const y = -Math.cos((angle * Math.PI) / 180) * distance - spacing;
    return `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  };

  const getCardPosition = (index: number) => {
    if (!open) return "";

    const baseY = -100; // Increased vertical offset
    const spreadWidth = 90; // Increased horizontal spacing between cards
    const verticalStagger = 5; // Slight vertical stagger

    const centerIndex = 2;
    const xOffset = (index - centerIndex) * spreadWidth;
    const yOffset = Math.abs(index - centerIndex) * verticalStagger;

    // Subtle rotation for visual interest
    const rotation = (index - centerIndex) * 2;

    return `translate(${xOffset}px, ${
      baseY + yOffset
    }px) rotate(${rotation}deg)`;
  };

  const renderCardContent = (item: React.ReactNode) => {
    if (!isValidElement(item)) return null;
    const itemWithProps = item as React.ReactElement<{
      children: React.ReactNode[];
    }>;
    const children = React.Children.toArray(itemWithProps.props.children);
    return {
      icon: children[0],
      content: children.slice(1),
    };
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? "hover:-translate-y-1" : ""
        }`}
        style={{
          ...folderStyle,
          transform: open ? "translateY(-8px)" : undefined,
        }}
        onClick={handleClick}
      >
        {title && (
          <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 text-center w-full whitespace-nowrap font-medium text-sm">
            {title}
          </div>
        )}
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {papers.map((item, i) => {
            const sizeClasses = open
              ? "w-[140px] h-[90px]"
              : "w-[65px] h-[50px]";
            const cardContent = item ? renderCardContent(item) : null;

            return (
              <div
                key={i}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                  !open
                    ? "transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0"
                    : ""
                } ${sizeClasses} hover:z-50 hover:-translate-y-2 hover:shadow-lg`}
                style={{
                  ...(!open ? {} : { transform: getCardPosition(i) }),
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: open
                    ? "0 4px 8px rgba(0,0,0,0.1)"
                    : "0 2px 4px rgba(0,0,0,0.05)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  marginLeft: open ? "-70px" : "0",
                  willChange: "transform, box-shadow",
                }}
              >
                {cardContent && (
                  <div className="w-full h-full relative group/card">
                    {!open ? (
                      <div className="w-full h-full flex items-center justify-center"></div>
                    ) : (
                      <div className="w-full h-full">
                        {/* Icon container - visible by default, hidden on hover */}
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-100 bg-white group-hover/card:opacity-0">
                          <div className="p-3 rounded-full transition-colors duration-300">
                            {cardContent.icon}
                          </div>
                        </div>
                        {/* Text container - hidden by default, visible on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300 bg-white">
                          <div className="text-xs font-medium text-center p-3 break-words leading-tight max-w-[90%]">
                            {cardContent.content}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(15deg) scaleY(0.6)" }),
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(-15deg) scaleY(0.6)" }),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
