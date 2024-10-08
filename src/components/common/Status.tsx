"use client";

export default function Status(p: { isActive?: boolean }) {
  return (
    <div
      style={{
        color: p.isActive ? "#1EFF29" : "#CCC",
        padding: "2px 8px",
        backgroundColor: p.isActive ? "#DAFFDB" : "#eee",
        fontSize: 13,
      }}
    >
      {p.isActive ? "فعال" : "غیر فعال"}
    </div>
  );
}
