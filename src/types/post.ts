export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  date?: string;
  link?: string;
  categories?: number[];
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        name: string;
        taxonomy: string;
      }>
    >;
  };
}
