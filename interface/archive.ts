export type ArchiveTemplate = {
  type: string;
  document: File | String
}

export type ArchiveTemplates = ArchiveTemplate & {
  id: number;
}

export type ArchiveDocument = {
  title: string;
  document: File | String;
}

export type ArchiveDocuments = ArchiveDocument & {
  id: number;
}
