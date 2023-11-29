import prisma from "@/prisma/client";

export async function getPaginatedList<T>(
    model: string,
    page: number,
    pageSize: number,
    queryOptions?: prisma.ModelSelect<T> | undefined
  ): Promise<PaginatedList<T>> {
    const skip = (page - 1) * pageSize;
    const total = await prisma[model].count();
    const last_page = Math.ceil(total / pageSize);
  
    const data = await prisma[model].findMany({
      skip,
      take: pageSize,
      ...(queryOptions || {}),
    });
  
    const links: PaginateLinks[] = [];
    for (let i = 1; i <= last_page; i++) {
      if (i === page) {
        // Add link for the current page
        links.push({ label: i.toString(), page: null });
      } else if (
        i === 1 || // First page
        i === last_page || // Last page
        (i >= page - 1 && i <= page + 1) // Pages around the current page
      ) {
        links.push({ label: i, page: i });
      } else if (
        (i === page - 2 && i !== 1) || // Two pages before the current page (except when i is 1)
        (i === page + 2 && i !== last_page) // Two pages after the current page (except when i is the last_page)
      ) {
        links.push({ label: '...', page: null });
      }
    }
  
    return {
      data,
      total,
      last_page,
      current_page: page,
      links,
    };
  }
