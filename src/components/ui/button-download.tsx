"use client"

import { Download, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DownloadButtonProps {
    downloadStatus: "idle" | "downloading" | "downloaded" | "complete"
    progress: number
    onClick: () => void
    className?: string
}

export default function DownloadButton({ downloadStatus, progress, onClick, className }: DownloadButtonProps) {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            className={cn(
                "rounded-xl w-40 relative overflow-hidden select-none gap-2 group",
                downloadStatus === "downloading" && "bg-primary/50 hover:bg-primary/50",
                downloadStatus !== "idle" && "pointer-events-none",
                className,
            )}
        >
            {/* Diagonal sweep hover effect */}
            <span className={cn(
                "w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0",
                "bg-white"
            )} />

            {downloadStatus === "idle" && (
                <div className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-black">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                </div>
            )}
            {downloadStatus === "downloading" && (
                <div className="z-[5] flex items-center justify-center gap-2 relative">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{progress}%</span>
                </div>
            )}
            {downloadStatus === "downloaded" && (
                <div className="relative z-10 flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Downloaded</span>
                </div>
            )}
            {downloadStatus === "complete" && (
                <div className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-black">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                </div>
            )}
            {downloadStatus === "downloading" && (
                <div
                    className="absolute bottom-0 left-0 h-full bg-primary transition-all duration-100 ease-linear"
                    style={{
                        width: `${progress}%`,
                        transform: 'translateZ(0)',
                        willChange: 'width'
                    }}
                />
            )}
        </Button>
    )
}
