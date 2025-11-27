import { Button } from '@/components/ui/button';
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Download,
    RotateCw,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface DocumentViewerProps {
    documentUrl: string;
    onVerify?: () => void;
    showVerifyButton?: boolean;
}

export function DocumentViewer({
    documentUrl,
    onVerify,
    showVerifyButton = false,
}: DocumentViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [rotation, setRotation] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setLoading(false);
    };

    const onDocumentLoadError = (error: Error) => {
        console.error('Error loading PDF:', error);
        setLoading(false);
    };

    const goToPreviousPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber((prev) => Math.min(prev + 1, numPages));
    };

    const zoomIn = () => {
        setScale((prev) => Math.min(prev + 0.1, 2.0));
    };

    const zoomOut = () => {
        setScale((prev) => Math.max(prev - 0.1, 0.5));
    };

    const rotate = () => {
        setRotation((prev) => (prev + 90) % 360);
    };

    const downloadDocument = () => {
        window.open(documentUrl, '_blank');
    };

    // Check if the file is a PDF
    const isPDF = documentUrl.toLowerCase().endsWith('.pdf');

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={zoomOut}
                        disabled={scale <= 0.5 || !isPDF}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[60px] text-center text-sm">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={zoomIn}
                        disabled={scale >= 2.0 || !isPDF}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={rotate}
                        disabled={!isPDF}
                    >
                        <RotateCw className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    {showVerifyButton && onVerify && (
                        <Button onClick={onVerify} variant="default">
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Verified
                        </Button>
                    )}
                    <Button variant="outline" onClick={downloadDocument}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            {/* Document Viewer */}
            <div className="max-h-[600px] overflow-auto rounded-lg border bg-gray-50 dark:bg-gray-900">
                {isPDF ? (
                    <div className="flex justify-center p-4">
                        {loading && (
                            <div className="flex items-center justify-center p-8">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                            </div>
                        )}
                        <Document
                            file={documentUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={
                                <div className="flex items-center justify-center p-8">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                                </div>
                            }
                        >
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                rotate={rotation}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                            />
                        </Document>
                    </div>
                ) : (
                    <div className="flex justify-center p-4">
                        <img
                            src={documentUrl}
                            alt="Document"
                            className="max-w-full"
                            style={{
                                transform: `scale(${scale}) rotate(${rotation}deg)`,
                                transformOrigin: 'center',
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Page Navigation (PDF only) */}
            {isPDF && numPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={goToPreviousPage}
                        disabled={pageNumber <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <span className="text-sm">
                        Page {pageNumber} of {numPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
