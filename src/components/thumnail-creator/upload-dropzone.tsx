"use client"

import { ArrowLeft, Cloud, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone"
import { removeBackground } from "@imgly/background-removal";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Credit } from "@/app/actions/credit";
import { Slider } from "../ui/slider";
import { fonts } from "@/app/fonts";

export function UploadDropzone() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [canvasReady, setCanvasReady] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [processImage, setProcessImage] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [fontSize, setFontSize] = useState(48);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [textOpacity, setTextOpacity] = useState([100])
    const [horizontalPosition, setHorizontalPosition] = useState([50]);
    const [verticalPosition, setVerticalPosition] = useState([50]);

    useEffect(() => {
        if (canvasReady) {
            draw();
        }
    }, [canvasReady, text, fontSize, fontFamily, horizontalPosition, verticalPosition, textOpacity, image])

    const draw = () => {
        if (!canvasRef.current || !canvasReady || !image || !processImage) {
            return
        }

        const canvass = canvasRef.current;
        const ctx = canvass.getContext("2d");
        if (!ctx) return;

        const img = new Image();

        img.onload = () => {
            canvass.width = img.width;
            canvass.height = img.height;

            ctx.drawImage(img, 0, 0, canvass.width, canvass.height);
            ctx.save();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.globalAlpha = textOpacity[0] / 100;

            const x = (horizontalPosition[0] / 100) * canvass.width;
            const y = (verticalPosition[0] / 100) * canvass.height;

            ctx.fillStyle = "white";
            ctx.fillText(text, x, y);
            ctx.restore();

            const fgImg = new Image();
            fgImg.onload = () => {
                ctx.drawImage(fgImg, 0, 0, canvass.width, canvass.height);
            }

            fgImg.src = processImage;
        }
        img.src = image;
    }

    const handleDownload = async () => {
        if (canvasRef.current) {
            const link = document.createElement("a");
            link.download = "image.png";
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    }

    return (
        <div className="h-full bg-gray-50 p-4 flex items-center justify-center flex-col">
            {image ? (
                <>
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-dashed border-gray-800"></div>
                        </div>
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
                                    <canvas
                                        ref={canvasRef}
                                        className="max-w-full max-h-[600px] rounded-lg border object-contain mx-auto block"
                                        width="300"
                                        height="300"
                                    />
                                </div>
                            </div>
                            <Card className="w-80 shrink-0">
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
                                            max={120}
                                            step={1}
                                            value={[fontSize]}
                                            onValueChange={(value) => setFontSize(value[0])}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* opacity */}
                                    <div className="space-y-2">
                                        <Label htmlFor="opacity">Opacity: {textOpacity[0]}%</Label>
                                        <Slider
                                            id="opacity"
                                            min={0}
                                            max={100}
                                            step={5}
                                            value={textOpacity}
                                            onValueChange={setTextOpacity}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* horizintalPosition */}
                                    <div className="space-y-2">
                                        <Label>Horizontal Position: {horizontalPosition[0]}%</Label>
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={horizontalPosition}
                                            onValueChange={setHorizontalPosition}
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
                                        <Label>Vertical Position: {verticalPosition[0]}%</Label>
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={verticalPosition}
                                            onValueChange={setVerticalPosition}
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
                    )}
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">Create Custom Thumbnails</h1>
                            <p className="text-gray-600">
                                Upload any image and add custom text overlays to create eye-catching thumbnails
                            </p>
                        </div>
                    </div>
                    <Dropzone multiple={false} onDrop={async (acceptedFiles) => {
                        const file = acceptedFiles[0];

                        if (file) {
                            setIsLoading(true)
                            const reader = new FileReader();
                            reader.onload = async (e) => {
                                const src = e.target?.result as string;
                                setImage(src);

                                const blob = await removeBackground(src);

                                const processURL = URL.createObjectURL(blob);
                                setProcessImage(processURL);
                                setCanvasReady(true);
                                setIsLoading(false);
                            };
                            reader.readAsDataURL(file);
                            await Credit();
                        }
                    }}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="border h-44 w-96 border-dashed border-gray-300 rounded-lg mt-4 ">
                                <div className="flex items-center justify-center h-full w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Cloud className="w-6 h-6 text-neutral-500 mb-2" />
                                            <p className="mb-2 text-sm text-zinc-700">
                                                <span className="font-semibold" >
                                                    Click to upload
                                                </span>{" "}
                                                or drag and drop
                                            </p>
                                        </div>

                                        <input className="hidden" type="file" id="dropzone-file" {...getInputProps()} />
                                    </label>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </>
            )}
        </div>
    )
}