import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2, Upload } from 'lucide-react';
import { useId, useState } from 'react';

/**
 * FileUpload Component
 * 
 * A reusable drag-and-drop file upload component with validation and preview.
 * 
 * @example
 * ```tsx
 * // Basic PDF upload
 * const [file, setFile] = useState<File | null>(null);
 * 
 * <FileUpload
 *   file={file}
 *   onFileChange={setFile}
 *   label="Upload Document"
 *   accept=".pdf"
 *   allowedTypes={['application/pdf']}
 *   required
 * />
 * 
 * // Image upload with custom settings
 * <FileUpload
 *   file={imageFile}
 *   onFileChange={setImageFile}
 *   label="Upload Profile Photo"
 *   description="Choose a profile picture (JPG, PNG)"
 *   accept="image/*"
 *   allowedTypes={['image/jpeg', 'image/png']}
 *   maxSizeMB={5}
 *   uploadText="Choose photo"
 *   hintText="JPG or PNG, max 5MB"
 * />
 * ```
 */

interface FileUploadProps {
    /**
     * The file that has been selected
     */
    file: File | null;
    
    /**
     * Callback when file is selected or changed
     */
    onFileChange: (file: File | null) => void;
    
    /**
     * Label for the upload field
     */
    label?: string;
    
    /**
     * Description text shown below the upload area
     */
    description?: string;
    
    /**
     * Error message to display
     */
    error?: string;
    
    /**
     * Accept attribute for file input (e.g., ".pdf", "image/*")
     */
    accept?: string;
    
    /**
     * Maximum file size in MB
     */
    maxSizeMB?: number;
    
    /**
     * Whether the field is required
     */
    required?: boolean;
    
    /**
     * Whether the field is disabled
     */
    disabled?: boolean;
    
    /**
     * Name attribute for the hidden input
     */
    name?: string;
    
    /**
     * Custom text for the upload area
     */
    uploadText?: string;
    
    /**
     * Custom hint text for file type/size
     */
    hintText?: string;
    
    /**
     * Allowed file types for validation (e.g., ['application/pdf'])
     */
    allowedTypes?: string[];
    
    /**
     * Custom className for the container
     */
    className?: string;
}

export function FileUpload({
    file,
    onFileChange,
    label = 'Upload File',
    description,
    error,
    accept,
    maxSizeMB = 10,
    required = false,
    disabled = false,
    name = 'file',
    uploadText = 'Click to upload',
    hintText,
    allowedTypes,
    className,
}: FileUploadProps) {
    const inputId = useId();
    const [dragActive, setDragActive] = useState(false);

    const validateFile = (selectedFile: File): boolean => {
        // Validate file type if allowedTypes specified
        if (allowedTypes && !allowedTypes.includes(selectedFile.type)) {
            const typeNames = allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ');
            alert(`Please upload a ${typeNames} file only`);
            return false;
        }

        // Validate file size
        if (maxSizeMB && selectedFile.size > maxSizeMB * 1024 * 1024) {
            alert(`File size must be less than ${maxSizeMB}MB`);
            return false;
        }

        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            onFileChange(selectedFile);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && validateFile(droppedFile)) {
            onFileChange(droppedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

    const removeFile = () => {
        onFileChange(null);
        // Reset the input
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) input.value = '';
    };

    const defaultHintText = hintText || (
        accept === '.pdf' || allowedTypes?.includes('application/pdf')
            ? `PDF files only (Max ${maxSizeMB}MB)`
            : `Max ${maxSizeMB}MB`
    );

    return (
        <Field className={className}>
            <FieldLabel htmlFor={inputId}>
                {label}
                {required && ' *'}
            </FieldLabel>
            
            {!file ? (
                <div
                    className={cn(
                        'relative rounded-lg border-2 border-dashed transition-colors',
                        error
                            ? 'border-destructive bg-destructive/5'
                            : dragActive
                              ? 'border-primary bg-primary/5'
                              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Input
                        id={inputId}
                        type="file"
                        name={name}
                        onChange={handleFileChange}
                        disabled={disabled}
                        accept={accept}
                        {...(required && { required: true })}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    />
                    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                        <div className="mb-4 rounded-lg bg-muted p-3">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="mb-2">
                            <span className="font-medium text-primary">{uploadText}</span>
                            <span className="text-sm text-muted-foreground"> or drag and drop</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {defaultHintText}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded bg-primary/10 p-2">
                                <svg
                                    className="h-5 w-5 text-primary"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        {!disabled && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={removeFile}
                                className="h-8 w-8 p-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            )}
            
            {description && (
                <FieldDescription>{description}</FieldDescription>
            )}
            {error && (
                <FieldError>{error}</FieldError>
            )}
        </Field>
    );
}
