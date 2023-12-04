interface PaginateLinks {
    label: number;
    page: number;
}

interface PaginatedList<T> {
    data: T[];
    total: number;
    last_page: number;
    current_page: number;
    links: PaginateLinks[];
}

interface Sample {
    id: string;
    title: string;
    slug: string;
    status: string;
    body: string;
    created_at: Date;
}