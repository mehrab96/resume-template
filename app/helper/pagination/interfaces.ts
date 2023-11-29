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