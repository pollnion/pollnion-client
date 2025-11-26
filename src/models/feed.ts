/**
 * Represents the status of a user account
 */
type UserStatus = "normal" | "admin";

/**
 * Represents the status of a poll
 */
type PollStatus = "open" | "closed";

/**
 * User/Author information for a feed item
 */
interface Author {
  /** Unique identifier for the user */
  id: string;
  /** Display name of the user */
  name: string;
  /** User's account status/role */
  status: UserStatus;
  /** Username/handle of the user */
  username: string;
  /** URL to the user's avatar image */
  avatar?: string;
}

/**
 * Content details for a feed item
 */
interface FeedContent {
  /** The space/category this content belongs to */
  space: { label: string; value: string }[];
  /** Title of the feed item */
  title: string;
  /** Detailed description of the feed item */
  description: string;
}

/**
 * Poll option within a feed item
 */
interface PollOption {
  /** Unique identifier for the poll option */
  id: string;
  /** Display label for the poll option */
  label: string;
  /** Number of votes this option received */
  votes: number;
}

/**
 * Poll details for a feed item
 */
interface Poll {
  /** Current status of the poll */
  status: PollStatus;
  /** Total number of votes across all options */
  totalVotes: number;
  /** The question being asked in the poll */
  question: string;
  /** Available options for the poll */
  options: PollOption[];
}

/**
 * Engagement metrics for a feed item
 */
interface EngagementCount {
  /** Number of likes */
  likes: number;
  /** Number of comments */
  comments: number;
  /** Number of reposts */
  repost: number;
}

/**
 * Feed item interface representing a complete feed entry.
 *
 * A feed item typically contains user-generated content with polling functionality,
 * author information, and engagement metrics. This is the primary data structure
 * for displaying content in the feed.
 */
export interface FeedItem {
  /** Unique identifier for the feed item */
  id: string;
  /** Information about the author of this feed item */
  author: Author;
  /** Timestamp when the feed item was created (Unix timestamp in milliseconds) */
  created_at: number;
  /** The main content of the feed item */
  content: FeedContent;
  /** Poll associated with this feed item */
  poll: Poll;
  /** Optional engagement metrics (likes, comments, etc.) */
  engagementCount?: EngagementCount;
}
