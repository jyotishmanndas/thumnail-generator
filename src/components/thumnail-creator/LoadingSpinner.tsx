import React from "react";

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px]">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-dashed border-gray-800"></div>
    Processing image...
  </div>
); 