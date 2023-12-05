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
    image: string;
    created_at: Date;
}

interface Gallery {
    id: number;
    url: string;
    path: string;
    name: string;
    format: string;
    size: number;
    created_at: Date;
}
