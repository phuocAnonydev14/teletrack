export interface Params {
  [key: string]: any;
}

export interface GenericOptions {
  url: string;
  params?: Params;
}

export interface ErrorResponse {
  // *This can depending on your backend server error response
  status: string;
  message: string;
}
