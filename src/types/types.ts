export interface Form {
  id: string;
  Content: string;
  CopiedCount: number;
  Email: string;
  IsOfficial: boolean;
  IsValid: boolean;
  LikeCount: number;
  Title: string;
  Writer: string;
  tags: string[];
}

export interface DetailProps {
  params: { id: string };
}
