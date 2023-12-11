export function getPaginatedList(page: number ,last_page: number){
  const links: PaginateLinks[] = [];
  if(last_page > 1){
    for (let i = 1; i <= last_page; i++) {
      if (i === page) {
        // Add link for the current page
        links.push({ label: i.toString(), page: 0 });
      } else if (
        i === 1 || // First page
        i === last_page || // Last page
        (i >= page - 1 && i <= page + 1) // Pages around the current page
      ) {
        links.push({ label: i.toString() , page: i });
      } else if (
        (i === page - 2 && i !== 1) || // Two pages before the current page (except when i is 1)
        (i === page + 2 && i !== last_page) // Two pages after the current page (except when i is the last_page)
      ) {
        links.push({ label: '...', page: 0 });
      }
    }
  }
  return links;
}
