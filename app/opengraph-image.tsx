import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, color: "#93c5fd", marginBottom: 24 }}>
          omkar-j-portfolio.vercel.app
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>{site.name}</div>
        <div style={{ fontSize: 44, marginTop: 20, color: "#cbd5e1" }}>
          Software Engineer · Backend systems & production AI
        </div>
      </div>
    ),
    size
  );
}
