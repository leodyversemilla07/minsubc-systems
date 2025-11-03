import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Download,
    Edit,
    FileText,
    Hash,
    MapPin,
    Trash2,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface DigitalizedDocument {
    id: number;
    document_title: string;
    document_category: string;
    document_type: string | null;
    file_path: string;
    file_name: string;
    file_size: number;
    file_type: string;
    reference_number: string | null;
    original_date: string | null;
    academic_year: string | null;
    related_entity_type: string | null;
    related_entity_id: number | null;
    physical_location: string | null;
    disposal_status: string;
    disposal_permit_number: string | null;
    disposal_date: string | null;
    is_public: boolean;
    uploaded_at: string;
    uploader?: {
        name: string;
        email: string;
    };
    versions?: DocumentVersion[];
    permissions?: DocumentPermission[];
}

interface DocumentVersion {
    id: number;
    version_number: number;
    file_path: string;
    file_name: string;
    changes_description: string | null;
    created_at: string;
    created_by?: {
        name: string;
    };
}

interface DocumentPermission {
    id: number;
    user_id: number;
    permission_type: string;
    granted_at: string;
    user?: {
        name: string;
        email: string;
    };
}

interface Props {
    document: DigitalizedDocument;
}

export default function ShowDocument({ document }: Props) {
    const [isDisposalDialogOpen, setIsDisposalDialogOpen] = useState(false);

    const { data, setData, post, processing } = useForm({
        disposal_status: document.disposal_status,
        disposal_permit_number: document.disposal_permit_number || '',
        disposal_date: document.disposal_date || '',
    });

    function handleDisposalUpdate(e: React.FormEvent) {
        e.preventDefault();
        post(`/sas/admin/documents/${document.id}/disposal-status`, {
            preserveScroll: true,
            onSuccess: () => setIsDisposalDialogOpen(false),
        });
    }

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
        );
    }

    function getDisposalBadge(status: string) {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive' | 'outline'
        > = {
            'Physical Copy Exists': 'default',
            'Pending Disposal Approval': 'secondary',
            'Approved for Disposal': 'outline',
            Disposed: 'destructive',
        };

        return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
    }

    return (
        <AppLayout>
            <Head title={document.document_title} />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={sas.admin.documents.index.url()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {document.document_title}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Document Details and Management
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link
                                href={`/sas/admin/documents/${document.id}/edit`}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <a
                                href={document.file_path}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Document Preview */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-12 dark:border-gray-700 dark:bg-gray-800">
                                <div className="text-center">
                                    <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                                    <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {document.file_name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {document.file_type.toUpperCase()} •{' '}
                                        {formatFileSize(document.file_size)}
                                    </p>
                                    <Button className="mt-4" asChild>
                                        <a
                                            href={document.file_path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Open in New Tab
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Document Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Category
                                    </Label>
                                    <p className="font-medium">
                                        <Badge variant="outline">
                                            {document.document_category}
                                        </Badge>
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Document Type
                                    </Label>
                                    <p className="font-medium">
                                        {document.document_type || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Reference Number
                                    </Label>
                                    <p className="flex items-center gap-1 font-medium">
                                        <Hash className="h-4 w-4 text-gray-500" />
                                        {document.reference_number || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Academic Year
                                    </Label>
                                    <p className="font-medium">
                                        {document.academic_year || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Original Date
                                    </Label>
                                    <p className="flex items-center gap-1 font-medium">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        {document.original_date
                                            ? new Date(
                                                  document.original_date,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Physical Location
                                    </Label>
                                    <p className="flex items-center gap-1 font-medium">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        {document.physical_location || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {document.related_entity_type && (
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Related Entity
                                    </Label>
                                    <p className="font-medium">
                                        {document.related_entity_type} (ID:{' '}
                                        {document.related_entity_id})
                                    </p>
                                </div>
                            )}

                            <div>
                                <Label className="text-xs text-gray-500">
                                    Visibility
                                </Label>
                                <p className="font-medium">
                                    <Badge
                                        variant={
                                            document.is_public
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {document.is_public
                                            ? 'Public'
                                            : 'Private'}
                                    </Badge>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Disposal Management */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Disposal Management</CardTitle>
                                    <CardDescription>
                                        Track document disposal status
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isDisposalDialogOpen}
                                    onOpenChange={setIsDisposalDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button size="sm">Update Status</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <form onSubmit={handleDisposalUpdate}>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Update Disposal Status
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Change the disposal status
                                                    and related information
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="disposal_status">
                                                        Disposal Status
                                                    </Label>
                                                    <Select
                                                        value={
                                                            data.disposal_status
                                                        }
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            setData(
                                                                'disposal_status',
                                                                value,
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Physical Copy Exists">
                                                                Physical Copy
                                                                Exists
                                                            </SelectItem>
                                                            <SelectItem value="Pending Disposal Approval">
                                                                Pending Disposal
                                                                Approval
                                                            </SelectItem>
                                                            <SelectItem value="Approved for Disposal">
                                                                Approved for
                                                                Disposal
                                                            </SelectItem>
                                                            <SelectItem value="Disposed">
                                                                Disposed
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="disposal_permit_number">
                                                        Permit Number
                                                    </Label>
                                                    <Input
                                                        id="disposal_permit_number"
                                                        value={
                                                            data.disposal_permit_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'disposal_permit_number',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="e.g., DP-2024-001"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="disposal_date">
                                                        Disposal Date
                                                    </Label>
                                                    <Input
                                                        id="disposal_date"
                                                        type="date"
                                                        value={
                                                            data.disposal_date
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'disposal_date',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsDisposalDialogOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    Update
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label className="text-xs text-gray-500">
                                        Current Status
                                    </Label>
                                    <p className="mt-1">
                                        {getDisposalBadge(
                                            document.disposal_status,
                                        )}
                                    </p>
                                </div>
                                {document.disposal_permit_number && (
                                    <div>
                                        <Label className="text-xs text-gray-500">
                                            Permit Number
                                        </Label>
                                        <p className="font-medium">
                                            {document.disposal_permit_number}
                                        </p>
                                    </div>
                                )}
                                {document.disposal_date && (
                                    <div>
                                        <Label className="text-xs text-gray-500">
                                            Disposal Date
                                        </Label>
                                        <p className="font-medium">
                                            {new Date(
                                                document.disposal_date,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Document Versions */}
                    {document.versions && document.versions.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Version History</CardTitle>
                                <CardDescription>
                                    Previous versions of this document
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Version</TableHead>
                                            <TableHead>Changes</TableHead>
                                            <TableHead>Updated By</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {document.versions.map((version) => (
                                            <TableRow key={version.id}>
                                                <TableCell>
                                                    v{version.version_number}
                                                </TableCell>
                                                <TableCell>
                                                    {version.changes_description ||
                                                        'No description'}
                                                </TableCell>
                                                <TableCell>
                                                    {version.created_by?.name ||
                                                        'Unknown'}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        version.created_at,
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        asChild
                                                    >
                                                        <a
                                                            href={
                                                                version.file_path
                                                            }
                                                            download
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Upload Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Upload Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-xs text-gray-500">
                                    Uploaded By
                                </Label>
                                <p className="flex items-center gap-2 font-medium">
                                    <User className="h-4 w-4 text-gray-500" />
                                    {document.uploader?.name || 'Unknown'}
                                </p>
                                {document.uploader?.email && (
                                    <p className="mt-1 text-xs text-gray-500">
                                        {document.uploader.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500">
                                    Upload Date
                                </Label>
                                <p className="flex items-center gap-2 font-medium">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    {new Date(
                                        document.uploaded_at,
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Permissions */}
                    {document.permissions &&
                        document.permissions.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Access Permissions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {document.permissions.map(
                                            (permission) => (
                                                <div
                                                    key={permission.id}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {permission.user
                                                                ?.name ||
                                                                'Unknown'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {
                                                                permission.permission_type
                                                            }
                                                        </p>
                                                    </div>
                                                    <Badge variant="outline">
                                                        Active
                                                    </Badge>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                className="w-full"
                                variant="outline"
                                asChild
                            >
                                <Link
                                    href={`/sas/admin/documents/${document.id}/edit`}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Document
                                </Link>
                            </Button>
                            <Button
                                className="w-full"
                                variant="destructive"
                                onClick={() => {
                                    if (
                                        confirm(
                                            'Are you sure you want to delete this document?',
                                        )
                                    ) {
                                        router.delete(
                                            `/sas/admin/documents/${document.id}`,
                                        );
                                    }
                                }}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Document
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
