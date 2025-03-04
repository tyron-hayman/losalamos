import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "@sanity/client";

interface Director {
  _id?: string;
  name: string;
  image: SanityImageSource;
}

interface Post {
  _id: string;
  title: string;
  tageline?: string;
  directors: Director[];
  date: string;
  image: SanityImageSource;
  content: any;
}

interface PageData extends SanityDocument {
  title: string;
  tagline: string;
  subtitle: string;
  date: string;
  post: Post[];
  aboutSection: any;
}

interface GemResponses {
  position: string,
  color: string,
  width: string,
  response: string
}

export type { Director, Post, PageData, GemResponses };