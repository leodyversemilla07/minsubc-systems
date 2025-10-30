// SAS Module Types

export interface Organization {
    id: number;
    organization_code: string;
    organization_name: string;
    org_name: string; // Alias for organization_name
    org_slug: string; // URL-friendly slug
    organization_type: 'Minor' | 'Major';
    category: string;
    mission?: string;
    vision?: string;
    establishment_date?: string;
    logo_path?: string;
    status: 'Active' | 'Inactive' | 'Suspended';
    adviser_id?: number;
    contact_email?: string;
    contact_phone?: string;
    adviser?: {
        id: number;
        name: string;
        email: string;
    };
    officers_count?: number;
    members_count?: number;
    activities_count?: number;
    created_at: string;
    updated_at: string;
}

export interface OrganizationOfficer {
    id: number;
    organization_id: number;
    user_id?: number;
    officer_name: string;
    position: string;
    contact_email?: string;
    contact_phone?: string;
    term_start: string;
    term_end: string;
    is_current: boolean;
    user?: {
        id: number;
        name: string;
        email: string;
    };
    organization?: Organization;
    created_at: string;
    updated_at: string;
}

export interface OrganizationMember {
    id: number;
    organization_id: number;
    user_id?: number;
    member_name: string;
    student_id?: string;
    contact_email?: string;
    membership_date: string;
    status: 'Active' | 'Inactive';
    user?: {
        id: number;
        name: string;
        email: string;
    };
    organization?: Organization;
    created_at: string;
    updated_at: string;
}

export interface SASActivity {
    id: number;
    activity_title: string;
    slug: string;
    description: string | null;
    start_date: string;
    end_date: string;
    all_day: boolean;
    location: string | null;
    category: string | null;
    organizer: string | null;
    organization_id: number | null;
    organization?: Organization;
    color: string;
    is_recurring: boolean;
    recurrence_rule: string | null;
    activity_status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    target_participants: number | null;
    actual_participants: number | null;
    completion_report: string | null;
    created_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface Scholarship {
    id: number;
    scholarship_name: string;
    scholarship_type: 'TES' | 'TDP' | 'Merit-Based' | 'Sports' | 'Academic' | 'Financial Aid' | 'Other';
    description?: string;
    requirements?: string;
    amount?: number;
    slots_available?: number;
    application_start?: string;
    application_end?: string;
    status: 'Open' | 'Closed' | 'Suspended';
    created_at: string;
    updated_at: string;
}

export interface ScholarshipRecipient {
    id: number;
    scholarship_id: number;
    user_id?: number;
    student_name: string;
    student_id?: string;
    email?: string;
    phone?: string;
    award_date: string;
    status: 'Active' | 'Completed' | 'Suspended' | 'Revoked';
    scholarship?: Scholarship;
    created_at: string;
    updated_at: string;
}

export interface InsuranceRecord {
    id: number;
    user_id?: number;
    student_name: string;
    student_id?: string;
    policy_number?: string;
    insurance_provider?: string;
    coverage_type?: string;
    coverage_amount?: number;
    start_date: string;
    expiry_date: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Expired';
    remarks?: string;
    reviewed_by?: number;
    reviewed_at?: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
}
