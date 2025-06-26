import React, { useEffect, useRef } from "react";

type ThumbnailCanvasProps = {
  image: string;
  processImage: string;
  text: string;
  fontSize: number;
  fontFamily: string;
  textOpacity: number;
  horizontalPosition: number;
  verticalPosition: number;
  canvasReady: boolean;
};

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({
  image,
  processImage,
  text,
  fontSize,
  fontFamily,
  textOpacity,
  horizontalPosition,
  verticalPosition,
  canvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasReady || !image || !processImage) return;
    const canvass = canvasRef.current;
    if (!canvass) return;
    const ctx = canvass.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.onload = () => {
      canvass.width = img.width;
      canvass.height = img.height;
      ctx.drawImage(img, 0, 0, canvass.width, canvass.height);
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.globalAlpha = textOpacity / 100;
      const x = (horizontalPosition / 100) * canvass.width;
      const y = (verticalPosition / 100) * canvass.height;
      ctx.fillStyle = "white";
      ctx.fillText(text, x, y);
      ctx.restore();
      const fgImg = new window.Image();
      fgImg.onload = () => {
        ctx.drawImage(fgImg, 0, 0, canvass.width, canvass.height);
      };
      fgImg.src = processImage;
    };
    img.src = image;
  }, [canvasReady, image, processImage, text, fontSize, fontFamily, textOpacity, horizontalPosition, verticalPosition]);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-full max-h-[600px] rounded-lg border object-contain mx-auto block"
      width={300}
      height={300}
    />
  );
}; 