export interface FetchArgs {
    method:
      | 'GET'
      | 'POST'
      | 'get'
      | 'post'
      | 'put'
      | 'PUT'
    url: string;
    baseUrl?: string;
    data?: any;
    params?: {[key: string]: string | number | boolean};
    bodyType?: 'json' | 'text';
    resType?: 'json' | 'text';
    options?: {[key: string]: string | number | boolean};
    headers?: {[key: string]: string | number};
    'X-Api-Key'?: string
  }
  
  export default FetchArgs;
  