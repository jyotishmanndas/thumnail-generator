"use client"

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { HeaderSection } from "./HeaderSection";
import { DropzoneUploader } from "./DropzoneUploader";
import { ThumbnailCanvas } from "./ThumbnailCanvas";
import { TextEditorPanel } from "./TextEditorPanel";

export function UploadDropzone() {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [canvasReady, setCanvasReady] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [processImage, setProcessImage] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [fontSize, setFontSize] = useState(50);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [textOpacity, setTextOpacity] = useState(100);
    const [horizontalPosition, setHorizontalPosition] = useState(50);
    const [verticalPosition, setVerticalPosition] = useState(50);

    // Download handler for canvas
    const handleDownload = () => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            const link = document.createElement("a");
            link.download = "image.png";
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="h-full bg-gray-50 p-4 flex items-center justify-center flex-col w-full">
            {image ? (
                loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="flex w-full max-w-6xl mx-auto items-start gap-6">
                        <div className="flex-1 flex flex-col items-center gap-4">
                            <button onClick={() => {
                                setImage(null);
                                setProcessImage(null);
                                setCanvasReady(false);
                            }} className="flex items-center gap-2 self-start py-2 hover:text-gray-600 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Go back</span>
                            </button>
                            <div className="bg-white rounded-lg border p-4 w-full">
                                {image && processImage && (
                                    <ThumbnailCanvas
                                        image={image}
                                        processImage={processImage}
                                        text={text}
                                        fontSize={fontSize}
                                        fontFamily={fontFamily}
                                        textOpacity={textOpacity}
                                        horizontalPosition={horizontalPosition}
                                        verticalPosition={verticalPosition}
                                        canvasReady={canvasReady}
                                    />
                                )}
                            </div>
                        </div>
                        <TextEditorPanel
                            text={text}
                            setText={setText}
                            fontFamily={fontFamily}
                            setFontFamily={setFontFamily}
                            fontSize={fontSize}
                            setFontSize={setFontSize}
                            textOpacity={textOpacity}
                            setTextOpacity={setTextOpacity}
                            horizontalPosition={horizontalPosition}
                            setHorizontalPosition={setHorizontalPosition}
                            verticalPosition={verticalPosition}
                            setVerticalPosition={setVerticalPosition}
                            handleDownload={handleDownload}
                        />
                    </div>
                )
            ) : (
                <>
                    <HeaderSection />
                    <DropzoneUploader
                        setImage={setImage}
                        setProcessImage={setProcessImage}
                        setCanvasReady={setCanvasReady}
                        setIsLoading={setIsLoading}
                    />
                </>
            )}
        </div>
    );
}