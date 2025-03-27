// Session
export const signInUrl = () => '/users/signin';
export const getSearchProductsUrl = (payload: any) => `search?q=${payload.query}&limit=${payload.PAGE_SIZE}`;
export const getProductsUrl = (payload: any) => `?limit=${payload.PAGE_SIZE}&skip=${payload.newPage * payload.PAGE_SIZE}`;
