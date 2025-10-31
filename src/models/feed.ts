export interface FeedItem {
  id: string;
  author: {
    id: string;
    name: string;
    status: "normal" | "admin";
  };
  createdAt: number;
  content: {
    space: string;
    title: string;
    description: string;
  };
  poll: {
    status: "open" | "closed";
    totalVotes: number;
    question: string;
    options: Array<{
      id: string;
      label: string;
      votes: number;
    }>;
  };
  engagementCount?: {
    likes: number;
    comments: number;
  };
}
