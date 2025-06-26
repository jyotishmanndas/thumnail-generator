import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { fonts } from "@/app/fonts";

type TextEditorPanelProps = {
  text: string;
  setText: (v: string) => void;
  fontFamily: string;
  setFontFamily: (v: string) => void;
  fontSize: number;
  setFontSize: (v: number) => void;
  textOpacity: number;
  setTextOpacity: (v: number) => void;
  horizontalPosition: number;
  setHorizontalPosition: (v: number) => void;
  verticalPosition: number;
  setVerticalPosition: (v: number) => void;
  handleDownload: () => void;
};

export const TextEditorPanel: React.FC<TextEditorPanelProps> = ({
  text,
  setText,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  textOpacity,
  setTextOpacity,
  horizontalPosition,
  setHorizontalPosition,
  verticalPosition,
  setVerticalPosition,
  handleDownload,
}) => (
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
); 