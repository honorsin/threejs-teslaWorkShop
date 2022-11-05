import { Color } from "three";

export default function ColorPicker() {
  const handleClick = e => {
    if (!window.activeMesh) return
    window.activeMesh.material.color = new Color(e.target.style.backgroundColor)
  }

  return (
    <div
      style={{
        display: "flex",
        left: 0,
        margin: "auto",
        position: "absolute",
        right: 0,
        top: "20px",
        width: "fit-content",
        zIndex: 1,
      }}
    >
      <div
        style={{ backgroundColor: "blue", height: 50, width: 50 }}
        onClick={handleClick}
      ></div>
      <div
        style={{ backgroundColor: "red", height: 50, width: 50 }}
        onClick={handleClick}
      ></div>
      <div
        style={{ backgroundColor: "black", height: 50, width: 50 }}
        onClick={handleClick}
      ></div>
    </div>
  );
}
