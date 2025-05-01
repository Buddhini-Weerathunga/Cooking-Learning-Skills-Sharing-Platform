import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CommunityHome from '../Pages/Community/CommunityHome';
import GroupDetail from '../Pages/Community/GroupDetail';
import CreateGroup from '../Pages/Community/CreateGroup';
import GroupDiscussions from '../Pages/Community/GroupDiscussions';
import GroupPosts from '../Pages/Community/GroupPosts';
import GroupMembers from '../Pages/Community/GroupMembers';
import DiscussionDetail from '../Pages/Community/DiscussionDetail';
import PostDetail from '../Pages/Community/PostDetail';

const CommunityRoutes = () => {
  return (
    <Routes>
      {/* Main Community Routes */}
      <Route path="/" element={<CommunityHome />} />
      
      {/* Group Management Routes */}
      <Route path="/groups/create" element={<CreateGroup />} />
      <Route path="/groups/:groupId" element={<GroupDetail />} />
      
      {/* Group Content Routes */}
      <Route path="/groups/:groupId/discussions" element={<GroupDiscussions />} />
      <Route path="/groups/:groupId/discussions/:discussionId" element={<DiscussionDetail />} />
      <Route path="/groups/:groupId/posts" element={<GroupPosts />} />
      <Route path="/groups/:groupId/posts/:postId" element={<PostDetail />} />
      <Route path="/groups/:groupId/members" element={<GroupMembers />} />
      <Route path="*" element={<Navigate to="/community" replace />} />
    </Routes>
  );
};

export default CommunityRoutes; 