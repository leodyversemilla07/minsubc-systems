import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
    Bold,
    Code,
    Edit,
    Eye,
    Heading1,
    Heading2,
    Heading3,
    Image,
    Italic,
    Link,
    List,
    ListOrdered,
    Quote,
    Strikethrough,
    Table,
    Underline,
} from 'lucide-react';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    minHeight?: number;
    maxHeight?: number;
    showToolbar?: boolean;
    showPreview?: boolean;
    mode?: 'wysiwyg' | 'markdown' | 'both';
    features?: {
        formatting?: boolean;
        headings?: boolean;
        lists?: boolean;
        links?: boolean;
        images?: boolean;
        tables?: boolean;
        code?: boolean;
        alignment?: boolean;
        colors?: boolean;
    };
    onImageUpload?: (file: File) => Promise<string>;
    label?: string;
    error?: string;
    required?: boolean;
}

interface EditorRef {
    focus: () => void;
    getContent: () => string;
    setContent: (content: string) => void;
    insertText: (text: string) => void;
    formatSelection: (format: string) => void;
}

const defaultFeatures = {
    formatting: true,
    headings: true,
    lists: true,
    links: true,
    images: true,
    tables: true,
    code: true,
    alignment: true,
    colors: true,
};

export const RichTextEditor = forwardRef<EditorRef, RichTextEditorProps>(
    (
        {
            value = '',
            onChange,
            placeholder = 'Start writing...',
            className = '',
            disabled = false,
            minHeight = 200,
            maxHeight = 600,
            showToolbar = true,
            showPreview = true,
            mode = 'wysiwyg',
            features = defaultFeatures,
            onImageUpload,
            label,
            error,
            required = false,
        },
        ref,
    ) => {
        const [currentMode, setCurrentMode] = useState<'edit' | 'preview'>(
            mode === 'markdown' ? 'edit' : 'edit',
        );
        const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
        const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
        const [linkUrl, setLinkUrl] = useState('');
        const [linkText, setLinkText] = useState('');
        const [imageUrl, setImageUrl] = useState('');
        const [imageAlt, setImageAlt] = useState('');
        const [selectedText, setSelectedText] = useState('');
        const [selectionRange, setSelectionRange] = useState<{
            start: number;
            end: number;
        } | null>(null);

        const editorRef = useRef<HTMLTextAreaElement>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const mergedFeatures = { ...defaultFeatures, ...features };

        useImperativeHandle(ref, () => ({
            focus: () => editorRef.current?.focus(),
            getContent: () => value,
            setContent: (content: string) => onChange(content),
            insertText: (text: string) => insertAtCursor(text),
            formatSelection: (format: string) => applyFormat(format),
        }));

        useEffect(() => {
            const editor = editorRef.current;
            if (!editor) return;

            const handleSelectionChange = () => {
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const text = editor.value.substring(start, end);
                setSelectedText(text);
                setSelectionRange({ start, end });
            };

            editor.addEventListener('select', handleSelectionChange);
            editor.addEventListener('keyup', handleSelectionChange);
            editor.addEventListener('mouseup', handleSelectionChange);

            return () => {
                editor.removeEventListener('select', handleSelectionChange);
                editor.removeEventListener('keyup', handleSelectionChange);
                editor.removeEventListener('mouseup', handleSelectionChange);
            };
        }, []);

        const insertAtCursor = (text: string) => {
            const editor = editorRef.current;
            if (!editor) return;

            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            const newValue =
                value.substring(0, start) + text + value.substring(end);

            onChange(newValue);

            // Set cursor position after inserted text
            setTimeout(() => {
                editor.selectionStart = start + text.length;
                editor.selectionEnd = start + text.length;
                editor.focus();
            }, 0);
        };

        const wrapSelection = (before: string, after: string = before) => {
            const editor = editorRef.current;
            if (!editor || !selectionRange) return;

            const { start, end } = selectionRange;
            const selectedText = value.substring(start, end);
            const wrappedText = before + selectedText + after;

            const newValue =
                value.substring(0, start) + wrappedText + value.substring(end);
            onChange(newValue);

            setTimeout(() => {
                editor.selectionStart = start + before.length;
                editor.selectionEnd =
                    start + before.length + selectedText.length;
                editor.focus();
            }, 0);
        };

        const applyFormat = (format: string) => {
            switch (format) {
                case 'bold':
                    wrapSelection('**');
                    break;
                case 'italic':
                    wrapSelection('*');
                    break;
                case 'underline':
                    wrapSelection('<u>', '</u>');
                    break;
                case 'strikethrough':
                    wrapSelection('~~');
                    break;
                case 'code':
                    if (selectedText.includes('\n')) {
                        wrapSelection('```\n', '\n```');
                    } else {
                        wrapSelection('`');
                    }
                    break;
                case 'quote':
                    insertAtCursor('> ');
                    break;
                case 'h1':
                    insertAtCursor('# ');
                    break;
                case 'h2':
                    insertAtCursor('## ');
                    break;
                case 'h3':
                    insertAtCursor('### ');
                    break;
                case 'ul':
                    insertAtCursor('- ');
                    break;
                case 'ol':
                    insertAtCursor('1. ');
                    break;
                case 'table':
                    insertAtCursor(
                        '\n| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n',
                    );
                    break;
                default:
                    break;
            }
        };

        const handleLinkInsert = () => {
            if (linkUrl) {
                const linkMarkdown = `[${linkText || selectedText || 'Link'}](${linkUrl})`;
                insertAtCursor(linkMarkdown);
                setLinkUrl('');
                setLinkText('');
                setIsLinkDialogOpen(false);
            }
        };

        const handleImageInsert = () => {
            if (imageUrl) {
                const imageMarkdown = `![${imageAlt}](${imageUrl})`;
                insertAtCursor(imageMarkdown);
                setImageUrl('');
                setImageAlt('');
                setIsImageDialogOpen(false);
            }
        };

        const handleImageUpload = async (
            e: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const file = e.target.files?.[0];
            if (!file || !onImageUpload) return;

            try {
                const uploadedUrl = await onImageUpload(file);
                const imageMarkdown = `![${file.name}](${uploadedUrl})`;
                insertAtCursor(imageMarkdown);
            } catch {
                // Image upload failed
            }

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        };

        const formatMarkdownToHtml = (markdown: string): string => {
            // Basic markdown to HTML conversion for preview
            return markdown
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/~~(.*?)~~/g, '<del>$1</del>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
                .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
                .replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                .replace(
                    /!\[([^\]]*)\]\(([^)]+)\)/g,
                    '<img src="$2" alt="$1" />',
                )
                .replace(/\n/g, '<br />');
        };

        const ToolbarButton = ({
            icon: Icon,
            onClick,
            isActive = false,
            disabled = false,
            tooltip,
        }: {
            icon: React.ComponentType<{ className?: string }>;
            onClick: () => void;
            isActive?: boolean;
            disabled?: boolean;
            tooltip?: string;
        }) => (
            <Button
                type="button"
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={onClick}
                disabled={disabled}
                title={tooltip}
                className="h-8 w-8 p-0"
            >
                <Icon className="h-4 w-4" />
            </Button>
        );

        return (
            <div className={`space-y-2 ${className}`}>
                {label && (
                    <label className="text-sm font-medium">
                        {label}
                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>
                )}

                <Card className={`${error ? 'border-red-500' : ''}`}>
                    {showToolbar && (
                        <div className="border-b p-2">
                            <div className="flex flex-wrap items-center gap-1">
                                {/* Mode Toggle */}
                                {showPreview && (
                                    <>
                                        <div className="flex items-center rounded-md border">
                                            <Button
                                                type="button"
                                                variant={
                                                    currentMode === 'edit'
                                                        ? 'default'
                                                        : 'ghost'
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setCurrentMode('edit')
                                                }
                                                className="h-8 rounded-r-none"
                                            >
                                                <Edit className="mr-1 h-4 w-4" />
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={
                                                    currentMode === 'preview'
                                                        ? 'default'
                                                        : 'ghost'
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setCurrentMode('preview')
                                                }
                                                className="h-8 rounded-l-none"
                                            >
                                                <Eye className="mr-1 h-4 w-4" />
                                                Preview
                                            </Button>
                                        </div>
                                        <Separator
                                            orientation="vertical"
                                            className="h-6"
                                        />
                                    </>
                                )}

                                {currentMode === 'edit' && (
                                    <>
                                        {/* Formatting */}
                                        {mergedFeatures.formatting && (
                                            <>
                                                <ToolbarButton
                                                    icon={Bold}
                                                    onClick={() =>
                                                        applyFormat('bold')
                                                    }
                                                    tooltip="Bold"
                                                />
                                                <ToolbarButton
                                                    icon={Italic}
                                                    onClick={() =>
                                                        applyFormat('italic')
                                                    }
                                                    tooltip="Italic"
                                                />
                                                <ToolbarButton
                                                    icon={Underline}
                                                    onClick={() =>
                                                        applyFormat('underline')
                                                    }
                                                    tooltip="Underline"
                                                />
                                                <ToolbarButton
                                                    icon={Strikethrough}
                                                    onClick={() =>
                                                        applyFormat(
                                                            'strikethrough',
                                                        )
                                                    }
                                                    tooltip="Strikethrough"
                                                />
                                                <Separator
                                                    orientation="vertical"
                                                    className="h-6"
                                                />
                                            </>
                                        )}

                                        {/* Headings */}
                                        {mergedFeatures.headings && (
                                            <>
                                                <ToolbarButton
                                                    icon={Heading1}
                                                    onClick={() =>
                                                        applyFormat('h1')
                                                    }
                                                    tooltip="Heading 1"
                                                />
                                                <ToolbarButton
                                                    icon={Heading2}
                                                    onClick={() =>
                                                        applyFormat('h2')
                                                    }
                                                    tooltip="Heading 2"
                                                />
                                                <ToolbarButton
                                                    icon={Heading3}
                                                    onClick={() =>
                                                        applyFormat('h3')
                                                    }
                                                    tooltip="Heading 3"
                                                />
                                                <Separator
                                                    orientation="vertical"
                                                    className="h-6"
                                                />
                                            </>
                                        )}

                                        {/* Lists */}
                                        {mergedFeatures.lists && (
                                            <>
                                                <ToolbarButton
                                                    icon={List}
                                                    onClick={() =>
                                                        applyFormat('ul')
                                                    }
                                                    tooltip="Bullet List"
                                                />
                                                <ToolbarButton
                                                    icon={ListOrdered}
                                                    onClick={() =>
                                                        applyFormat('ol')
                                                    }
                                                    tooltip="Numbered List"
                                                />
                                                <ToolbarButton
                                                    icon={Quote}
                                                    onClick={() =>
                                                        applyFormat('quote')
                                                    }
                                                    tooltip="Quote"
                                                />
                                                <Separator
                                                    orientation="vertical"
                                                    className="h-6"
                                                />
                                            </>
                                        )}

                                        {/* Code */}
                                        {mergedFeatures.code && (
                                            <>
                                                <ToolbarButton
                                                    icon={Code}
                                                    onClick={() =>
                                                        applyFormat('code')
                                                    }
                                                    tooltip="Code"
                                                />
                                                <Separator
                                                    orientation="vertical"
                                                    className="h-6"
                                                />
                                            </>
                                        )}

                                        {/* Links */}
                                        {mergedFeatures.links && (
                                            <Popover
                                                open={isLinkDialogOpen}
                                                onOpenChange={
                                                    setIsLinkDialogOpen
                                                }
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        title="Insert Link"
                                                    >
                                                        <Link className="h-4 w-4" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80">
                                                    <div className="space-y-3">
                                                        <h4 className="font-medium">
                                                            Insert Link
                                                        </h4>
                                                        <div className="space-y-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Link text"
                                                                value={linkText}
                                                                onChange={(e) =>
                                                                    setLinkText(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="w-full rounded-md border px-3 py-2"
                                                            />
                                                            <input
                                                                type="url"
                                                                placeholder="URL"
                                                                value={linkUrl}
                                                                onChange={(e) =>
                                                                    setLinkUrl(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="w-full rounded-md border px-3 py-2"
                                                            />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={
                                                                    handleLinkInsert
                                                                }
                                                                size="sm"
                                                            >
                                                                Insert
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() =>
                                                                    setIsLinkDialogOpen(
                                                                        false,
                                                                    )
                                                                }
                                                                size="sm"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )}

                                        {/* Images */}
                                        {mergedFeatures.images && (
                                            <>
                                                <Popover
                                                    open={isImageDialogOpen}
                                                    onOpenChange={
                                                        setIsImageDialogOpen
                                                    }
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            title="Insert Image"
                                                        >
                                                            <Image className="h-4 w-4" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80">
                                                        <div className="space-y-3">
                                                            <h4 className="font-medium">
                                                                Insert Image
                                                            </h4>
                                                            <div className="space-y-2">
                                                                <input
                                                                    type="url"
                                                                    placeholder="Image URL"
                                                                    value={
                                                                        imageUrl
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setImageUrl(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    className="w-full rounded-md border px-3 py-2"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Alt text"
                                                                    value={
                                                                        imageAlt
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setImageAlt(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    className="w-full rounded-md border px-3 py-2"
                                                                />
                                                                {onImageUpload && (
                                                                    <>
                                                                        <div className="text-center text-sm text-gray-500">
                                                                            or
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            onClick={() =>
                                                                                fileInputRef.current?.click()
                                                                            }
                                                                            className="w-full"
                                                                        >
                                                                            Upload
                                                                            Image
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    onClick={
                                                                        handleImageInsert
                                                                    }
                                                                    size="sm"
                                                                >
                                                                    Insert
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        setIsImageDialogOpen(
                                                                            false,
                                                                        )
                                                                    }
                                                                    size="sm"
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                                {onImageUpload && (
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageUpload
                                                        }
                                                        className="hidden"
                                                    />
                                                )}
                                            </>
                                        )}

                                        {/* Tables */}
                                        {mergedFeatures.tables && (
                                            <>
                                                <Separator
                                                    orientation="vertical"
                                                    className="h-6"
                                                />
                                                <ToolbarButton
                                                    icon={Table}
                                                    onClick={() =>
                                                        applyFormat('table')
                                                    }
                                                    tooltip="Insert Table"
                                                />
                                            </>
                                        )}
                                    </>
                                )}

                                {/* Word Count */}
                                <div className="ml-auto">
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {value.length} characters
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )}

                    <CardContent className="p-0">
                        {currentMode === 'edit' ? (
                            <textarea
                                ref={editorRef}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={placeholder}
                                disabled={disabled}
                                className={`w-full resize-none border-0 px-4 py-3 focus:ring-0 focus:outline-none ${
                                    disabled
                                        ? 'bg-gray-50 dark:bg-gray-800'
                                        : ''
                                }`}
                                style={{
                                    minHeight: `${minHeight}px`,
                                    maxHeight: `${maxHeight}px`,
                                }}
                            />
                        ) : (
                            <div
                                className="prose prose-sm dark:prose-invert max-w-none px-4 py-3"
                                style={{
                                    minHeight: `${minHeight}px`,
                                    maxHeight: `${maxHeight}px`,
                                    overflowY: 'auto',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        formatMarkdownToHtml(value) ||
                                        '<p class="text-gray-500">Nothing to preview...</p>',
                                }}
                            />
                        )}
                    </CardContent>
                </Card>

                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        );
    },
);

RichTextEditor.displayName = 'RichTextEditor';
