export interface Course {
  id: number;
  title: string;
  code: string;
  podcasts?: number;
  announcements?: number;
  buttonColor?: string;
  borderColor?: string;
  documents?: number;
  image?: string;
  hasInfo?: boolean;
  hasNotification?: boolean;
}
