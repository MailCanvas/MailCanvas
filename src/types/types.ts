export interface Form {
  id: string;
  Content: string;
  CopiedCount: number;
  Email: string;
  IsOfficial: boolean;
  IsValid: boolean;
  IsEmailVisible: boolean;
  LikeCount: number;
  Title: string;
  Writer: string;
  tags: string[];
  replacementTags: string[];
  timestamp: number;
}
