import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/config";

export const alt = `${PROFILE.fullName} — Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #050610 0%, #0B0C10 100%)",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              color: "#C4B5FD",
              lineHeight: 1,
              marginBottom: 28,
            }}
          >
            {PROFILE.name}
          </div>
          <div
            style={{
              fontSize: 44,
              color: "white",
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94A3B8",
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            React · Next.js · TypeScript · Node.js
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 50,
            fontSize: 20,
            color: "#67E8F9",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>github.com/{PROFILE.github}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
