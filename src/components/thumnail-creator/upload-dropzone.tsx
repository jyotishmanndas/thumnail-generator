"use client"

import { ArrowLeft, Download } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { HeaderSection } from "./HeaderSection";
import { DropzoneUploader } from "./DropzoneUploader";
import { ThumbnailCanvas } from "./ThumbnailCanvas";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { fonts } from "@/app/fonts";

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

                        {/* Text Editor Panel - Consolidated */}
                        <Card className="w-80 shrink-0 sticky top-20">
                            <CardHeader>
                                <CardTitle>Text Editor</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {/* Text Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="text">Text</Label>
                                    <Input
                                        id="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Enter your text"
                                    />
                                </div>
                                {/* font style */}
                                <div className="space-y-2">
                                    <Label htmlFor="fontFamily">Font Family</Label>
                                    <Select value={fontFamily} onValueChange={setFontFamily}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fonts.map((font) => (
                                                <SelectItem key={font} value={font}>
                                                    <span style={{ fontFamily: font }}>{font}</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* font size */}
                                <div className="space-y-2">
                                    <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
                                    <Slider
                                        id="fontSize"
                                        min={12}
                                        max={400}
                                        step={1}
                                        value={[fontSize]}
                                        onValueChange={(value) => setFontSize(value[0])}
                                        className="mt-2"
                                    />
                                </div>
                                {/* opacity */}
                                <div className="space-y-2">
                                    <Label htmlFor="opacity">Opacity: {textOpacity}%</Label>
                                    <Slider
                                        id="opacity"
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={[textOpacity]}
                                        onValueChange={(value) => setTextOpacity(value[0])}
                                        className="mt-2"
                                    />
                                </div>
                                {/* horizontal position */}
                                <div className="space-y-2">
                                    <Label>Horizontal Position: {horizontalPosition}%</Label>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={[horizontalPosition]}
                                        onValueChange={(value) => setHorizontalPosition(value[0])}
                                        className="mt-2"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Left</span>
                                        <span>Center</span>
                                        <span>Right</span>
                                    </div>
                                </div>
                                {/* vertical position */}
                                <div>
                                    <Label>Vertical Position: {verticalPosition}%</Label>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={[verticalPosition]}
                                        onValueChange={(value) => setVerticalPosition(value[0])}
                                        className="mt-2"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Top</span>
                                        <span>Middle</span>
                                        <span>Bottom</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2">
                                <Button className="w-full flex items-center gap-3" onClick={handleDownload}>
                                    <Download className="w-4 h-4" />
                                    Download Thumbnail
                                </Button>
                            </CardFooter>
                        </Card>
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