export const mockGroups = [
  {
    id: "1",
    name: "Baking Enthusiasts",
    description: "A group for sharing baking tips and recipes",
    memberCount: 150,
    category: "Baking",
    createdAt: "2024-02-01",
    coverImage: "https://example.com/baking-cover.jpg"
  },
  {
    id: "2",
    name: "Asian Cuisine Masters",
    description: "Explore and share Asian cooking techniques",
    memberCount: 120,
    category: "Regional Cuisine",
    createdAt: "2024-02-05",
    coverImage: "https://example.com/asian-cuisine-cover.jpg"
  }
];

export const mockDiscussions = [
  {
    id: "101",
    groupId: "1",
    title: "Best flour for sourdough?",
    content: "What's your preferred flour brand for making sourdough bread?",
    author: "Jane Smith",
    createdAt: "2024-02-10",
    replies: []
  }
];

export const mockMembers = [
  {
    id: "301",
    groupId: "1",
    name: "Jane Smith",
    role: "admin",
    avatar: "https://example.com/avatar1.jpg",
    joinedAt: "2024-01-01"
  }
];

export const mockPosts = [
  {
    id: "201",
    groupId: "1",
    title: "My first sourdough success!",
    content: "After months of practice, finally got the perfect crumb!",
    author: "Sarah Wilson",
    createdAt: "2024-02-15",
    likes: 25,
    comments: []
  },
  {
    id: "202",
    groupId: "1",
    title: "New baking tools haul",
    content: "Just got these amazing new baking tools!",
    author: "Tom Brown",
    createdAt: "2024-02-16",
    likes: 15,
    comments: []
  }
]; 