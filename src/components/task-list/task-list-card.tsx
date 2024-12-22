import React, { useState } from 'react';
import Button from '../common/button';
import TagSelector from '../common/tag-selector';

interface TaskListCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  isPublic: boolean;
  onLike: (id: string) => void;
  onShare: (id: string) => void;
}

const TaskListCard: React.FC<TaskListCardProps> = ({
  id,
  title,
  description,
  tags,
  likes,
  isPublic,
  onLike,
  onShare
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);

  const handleLike = () => {
    onLike(id);
  };

  const handleShare = () => {
    onShare(id);
  };

  return (
    <div className="task-list-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="task-list-tags">
        <TagSelector 
          selectedTags={selectedTags}
          onTagChange={setSelectedTags}
          readOnly
        />
      </div>
      <div className="task-list-actions">
        <Button onClick={handleLike}>
          いいね {likes}
        </Button>
        {isPublic && (
          <Button onClick={handleShare}>
            共有
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskListCard;