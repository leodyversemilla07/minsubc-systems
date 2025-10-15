import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { release } from '@/routes/registrar/admin/requests';
import { Form } from '@inertiajs/react';
import { IdCard, Info, Package, User } from 'lucide-react';
import { useState } from 'react';

interface ReleaseDocumentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    requestNumber: string;
    studentName?: string;
}

export function ReleaseDocumentDialog({
    open,
    onOpenChange,
    requestNumber,
    studentName,
}: ReleaseDocumentDialogProps) {
    const [idType, setIdType] = useState('');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <Package className="h-5 w-5 text-primary" />
                        </div>
                        Release Document
                    </DialogTitle>
                    <DialogDescription>
                        Verify student identity and complete the document
                        release for request <strong>{requestNumber}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        Please verify the student's ID before releasing the
                        document. Enter the details below to complete the
                        release.
                    </AlertDescription>
                </Alert>

                <Form
                    action={release(requestNumber).url}
                    method="post"
                    onSuccess={() => {
                        onOpenChange(false);
                        setIdType('');
                    }}
                >
                    {({ errors, processing }) => (
                        <FieldGroup className="space-y-5">
                            {/* Released To */}
                            <Field>
                                <FieldLabel
                                    htmlFor="released_to"
                                    className="flex items-center gap-2"
                                >
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    Released To{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                    id="released_to"
                                    name="released_to"
                                    defaultValue={studentName || ''}
                                    placeholder="Full name of person claiming"
                                    disabled={processing}
                                    className={
                                        errors.released_to
                                            ? 'border-destructive'
                                            : ''
                                    }
                                    required
                                />
                                <FieldDescription>
                                    Enter the name as shown on their ID
                                </FieldDescription>
                                {errors.released_to && (
                                    <FieldError>
                                        {errors.released_to}
                                    </FieldError>
                                )}
                            </Field>

                            {/* ID Type */}
                            <Field>
                                <FieldLabel
                                    htmlFor="released_id_type"
                                    className="flex items-center gap-2"
                                >
                                    <IdCard className="h-4 w-4 text-muted-foreground" />
                                    ID Type{' '}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Select
                                    value={idType}
                                    onValueChange={setIdType}
                                    disabled={processing}
                                    required
                                >
                                    <SelectTrigger
                                        id="released_id_type"
                                        className={
                                            errors.released_id_type
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Select ID type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student_id">
                                            Student ID
                                        </SelectItem>
                                        <SelectItem value="drivers_license">
                                            Driver's License
                                        </SelectItem>
                                        <SelectItem value="passport">
                                            Passport
                                        </SelectItem>
                                        <SelectItem value="others">
                                            Others
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <input
                                    type="hidden"
                                    name="released_id_type"
                                    value={idType}
                                />
                                {errors.released_id_type && (
                                    <FieldError>
                                        {errors.released_id_type}
                                    </FieldError>
                                )}
                            </Field>

                            {/* ID Number */}
                            <Field>
                                <FieldLabel
                                    htmlFor="released_id_number"
                                    className="flex items-center gap-2"
                                >
                                    <IdCard className="h-4 w-4 text-muted-foreground" />
                                    ID Number{' '}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </FieldLabel>
                                <Input
                                    id="released_id_number"
                                    name="released_id_number"
                                    placeholder="ID number or last 4 digits"
                                    disabled={processing}
                                />
                                <FieldDescription>
                                    Optional: Enter ID number for verification
                                    records
                                </FieldDescription>
                            </Field>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Releasing...
                                        </>
                                    ) : (
                                        <>
                                            <Package className="mr-2 h-4 w-4" />
                                            Release Document
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </FieldGroup>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
