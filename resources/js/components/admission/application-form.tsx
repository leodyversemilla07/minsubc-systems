import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

interface Program {
    id: number;
    name: string;
    course: string;
    course_code: string;
    academic_year: string;
    semester: string;
    slots_available: number;
    description: string | null;
}

interface ApplicationFormProps {
    programs: Program[];
}

export function ApplicationForm({ programs }: ApplicationFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        program_id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        address: '',
        city: '',
        province: '',
        zip_code: '',
        last_school_attended: '',
        strand: '',
        gpa: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admission.application.store'));
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Program Selection */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Program Choice</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select the program you wish to apply for.</p>
                <div className="mt-4">
                    <Label htmlFor="program_id">Program *</Label>
                    <Select value={data.program_id} onValueChange={(v) => setData('program_id', v)}>
                        <SelectTrigger id="program_id" className="mt-1">
                            <SelectValue placeholder="Select a program..." />
                        </SelectTrigger>
                        <SelectContent>
                            {programs.map((program) => (
                                <SelectItem key={program.id} value={String(program.id)}>
                                    {program.course_code} — {program.name} ({program.academic_year}, {program.semester} Sem)
                                    {program.slots_available <= 5 && (
                                        <span className="ml-2 text-xs text-amber-600">({program.slots_available} slots left)</span>
                                    )}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.program_id && <p className="mt-1 text-sm text-red-600">{errors.program_id}</p>}
                </div>
            </div>

            {/* Personal Information */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Provide your complete personal details.</p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input id="first_name" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} className="mt-1" />
                        {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="middle_name">Middle Name</Label>
                        <Input id="middle_name" value={data.middle_name} onChange={(e) => setData('middle_name', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="last_name">Last Name *</Label>
                        <Input id="last_name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} className="mt-1" />
                        {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1" />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+63 XXX XXX XXXX" className="mt-1" />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <Label htmlFor="date_of_birth">Date of Birth *</Label>
                        <Input id="date_of_birth" type="date" value={data.date_of_birth} onChange={(e) => setData('date_of_birth', e.target.value)} className="mt-1" />
                        {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
                    </div>
                    <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={data.gender} onValueChange={(v) => setData('gender', v)}>
                            <SelectTrigger id="gender" className="mt-1">
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="zip_code">ZIP Code</Label>
                        <Input id="zip_code" value={data.zip_code} onChange={(e) => setData('zip_code', e.target.value)} className="mt-1" />
                    </div>
                </div>

                <div className="mt-4">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1" rows={2} />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="city">City / Municipality</Label>
                        <Input id="city" value={data.city} onChange={(e) => setData('city', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="province">Province</Label>
                        <Input id="province" value={data.province} onChange={(e) => setData('province', e.target.value)} className="mt-1" />
                    </div>
                </div>
            </div>

            {/* Educational Background */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Educational Background</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Provide your previous education details.</p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="last_school_attended">Last School Attended</Label>
                        <Input id="last_school_attended" value={data.last_school_attended} onChange={(e) => setData('last_school_attended', e.target.value)} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="strand">Strand (SHS)</Label>
                        <Input id="strand" value={data.strand} onChange={(e) => setData('strand', e.target.value)} placeholder="e.g., STEM, ABM, HUMSS" className="mt-1" />
                    </div>
                </div>

                <div className="mt-4 sm:w-1/3">
                    <Label htmlFor="gpa">GPA (if applicable)</Label>
                    <Input id="gpa" type="number" step="0.01" min="0" max="100" value={data.gpa} onChange={(e) => setData('gpa', e.target.value)} className="mt-1" />
                    {errors.gpa && <p className="mt-1 text-sm text-red-600">{errors.gpa}</p>}
                </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between border-t pt-6 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fields marked with * are required.
                </p>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Creating Application...' : 'Create Application'}
                </Button>
            </div>
        </form>
    );
}