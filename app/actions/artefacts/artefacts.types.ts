// types/Artefacts.ts
export interface Artefact {
  ID: number;
  ArtistName: string;
  ArtistLifespan: string;
  ArtworkTitle: string;
  CreationYear: string;
  MediumFoundry: string;
  Category: string;
  CatalogNumber: string;
  AdditionalInfo: string;
  ImageUrl: string;
}

export interface Pagination {
  pagination: number;
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  next_page?: number;
  prev_page?: number;
}

export interface ArtefactsData {
  artefacts: Artefact[];
  pagination: Pagination;
}
