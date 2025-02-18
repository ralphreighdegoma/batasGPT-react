import React from 'react';
import styled from 'styled-components';

const FollowButton = styled.button`
  border-radius: 10px;
  padding: 4px 13px;
  border: ${props => props.isFollowing ? '1px solid #ef4444' : 'none'};
  background-color: ${props => props.isFollowing ? 'white' : 'rgb(59 130 246 / var(--tw-bg-opacity, 1))'};
  color: ${props => props.isFollowing ? '#ef4444' : 'white'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isFollowing ? '#fee2e2' : '#1991db'};
  }
`;

interface FollowButtonProps {
  onClick?: () => void;
  isFollowing?: boolean;
}

const FollowButtonComponent: React.FC<FollowButtonProps> = ({ onClick, isFollowing = false }) => {
  return (
    <FollowButton onClick={onClick}>
      {isFollowing ? 'Following' : 'Follow'}
    </FollowButton>
  );
};

export default FollowButtonComponent;
