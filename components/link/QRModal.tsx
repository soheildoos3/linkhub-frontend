"use client";

import { X, Download, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function QRModal({ isOpen, onClose, url, title }: QRModalProps) {
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!svgRef.current) return;
    
    const svgElement = svgRef.current.querySelector("svg");
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qrcode-${title.replace(/\s/g, "-")}.png`;
      link.href = pngFile;
      link.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">QR کد</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="dark:text-gray-400 dark:hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-4 p-6 text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
          <p className="break-all text-xs text-gray-500 dark:text-gray-400">{url}</p>

          {/* QR Code */}
          <div ref={svgRef} className="flex justify-center">
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600">
              <QRCodeSVG
                value={url}
                size={200}
                level="H"
                includeMargin
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCopyUrl}
              variant="outline"
              className="flex-1 gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  کپی شد!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  کپی لینک
                </>
              )}
            </Button>
            <Button onClick={handleDownloadQR} className="flex-1 gap-2">
              <Download size={16} />
              دانلود QR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}