import React from "react";
import Dropzone from "react-dropzone";
import { Cloud } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import { Credit } from "@/app/actions/credit";

type DropzoneUploaderProps = {
  setImage: (src: string) => void;
  setProcessImage: (src: string) => void;
  setCanvasReady: (ready: boolean) => void;
  setIsLoading: (loading: boolean) => void;
};

export const DropzoneUploader: React.FC<DropzoneUploaderProps> = ({ setImage, setProcessImage, setCanvasReady, setIsLoading }) => (
  <Dropzone multiple={false} onDrop={async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsLoading(true);
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
                <span className="font-semibold" >Click to upload</span>{" "}or drag and drop
              </p>
            </div>
            <input className="hidden" type="file" id="dropzone-file" {...getInputProps()} />
          </label>
        </div>
      </div>
    )}
  </Dropzone>
); 