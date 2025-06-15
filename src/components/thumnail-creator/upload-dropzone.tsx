"use client"

import { ArrowLeft, Cloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone"
// import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Style } from "./style";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "../ui/button";

const presets = {
    style1: {
        fontSize: 100,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 1)",
        opacity: 1
    },
    style2: {
        fontSize: 100,
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 1)",
        opacity: 1
    },
    style3: {
        fontSize: 100,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.7)",
        opacity: 0.7
    }
}

export function UploadDropzone() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedStyle, setSelectedStyle] = useState("style1")
    const [loading, setIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [processImage, setProcessImage] = useState<string | null>(null);
    const [canvasReady, setCanvasReady] = useState(false);
    const [text, setText] = useState("POV");

    // const { startUpload } = useUploadThing("pdfUploader")

    useEffect(() => {
        if (canvasReady) {
            draw();
        }
    }, [canvasReady])

    const draw = () => {
        if (!canvasRef.current || !canvasReady || !image || !processImage) {
            return
        }

        const canvass = canvasRef.current;
        const ctx = canvass.getContext("2d")
        if (!ctx) return;

        const img = new Image();

        img.onload = () => {
            canvass.width = img.width;
            canvass.height = img.height;

            ctx.drawImage(img, 0, 0, canvass.width, canvass.height)

            let preset = presets.style1;

            switch (selectedStyle) {
                case "style2":
                    preset = presets.style2;
                    break;
                case "style3":
                    preset = presets.style3;
                    break;

            }
            ctx.save();

            // calculate font size and to fill to image of the canvas

            ctx.textAlign = "center";
            ctx.textBaseline = "alphabetic";

            let fontsize = 100;
            let selectFont = "Arial";

            ctx.font = `${preset.fontWeight} ${preset.fontSize}px ${selectFont}`
            const textWidth = ctx.measureText(text).width
            const targetWidth = canvass.width * 0.9;

            fontsize = (targetWidth / textWidth) * fontsize
            ctx.font = `${preset.fontWeight} ${fontsize}px ${selectFont}`
            ctx.fillStyle = preset.color;
            ctx.globalAlpha = preset.opacity;

            const x = canvass.width / 2;
            const y = canvass.height / 2;

            ctx.translate(x, y);
            ctx.fillText(text, 0, 0);
            ctx.restore();

            const fgImg = new Image();
            fgImg.onload = () => {
                ctx.drawImage(fgImg, 0, 0, canvass.width, canvass.height)
            }

            fgImg.src = processImage
        }
        img.src = image
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
        <>
            {image ? (
                <>
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full birder-2 border-dashed border-gray-800"></div>
                        </div>
                    ) : (
                        <div className="my-4 w-full flex flex-col items-center gap-3">
                            <button onClick={() => {
                                setImage(null);
                                setProcessImage(null);
                                setCanvasReady(false)
                            }} className="flex items-center gap-2 self-start">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Go back</span>
                            </button>
                            <canvas ref={canvasRef} className="max-h-lg h-auto w-full max-w-lg rounded-lg" />
                            <Button className="mt-5 w-full" onClick={handleDownload}>Download</Button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
                            Want to create a thumnail?
                        </h1>
                        <p className="text-muted-foreground leading-8">
                            Use one of the templates below.
                        </p>

                        <div className="flex items-center gap-4 mt-5 ">
                            <Style image="/dog.png" selectedStyle={() => { setSelectedStyle("style1") }} isSelected={selectedStyle === "style1"} />
                            <Style image="/dog.png" selectedStyle={() => { setSelectedStyle("style2") }} isSelected={selectedStyle === "style2"} />
                            <Style image="/dog.png" selectedStyle={() => { setSelectedStyle("style3") }} isSelected={selectedStyle === "style3"} />
                        </div>
                    </div>
                    <Dropzone multiple={false} onDrop={async (acceptedFiles) => {
                        const file = acceptedFiles[0];

                        if (file) {
                            setIsLoading(true)
                            const reader = new FileReader();
                            reader.onload = async (e) => {
                                const src = e.target?.result as string
                                setImage(src);

                                const blob = await removeBackground(src);

                                const processURL = URL.createObjectURL(blob)
                                setProcessImage(processURL)
                                setCanvasReady(true)
                                setIsLoading(false)
                            };
                            reader.readAsDataURL(file);
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
        </>
    )
}