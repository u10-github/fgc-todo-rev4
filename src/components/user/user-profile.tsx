import React, { useState } from 'react';
import { Input } from '../common/input';

interface UserProfileProps {
  initialName?: string;
  initialEmail?: string;
  initialGameTitles?: string[];
  onUpdateProfile: (profile: {
    name: string;
    email: string;
    gameTitles: string[];
  }) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  initialName = '',
  initialEmail = '',
  initialGameTitles = [],
  onUpdateProfile
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [gameTitles, setGameTitles] = useState(initialGameTitles);

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleGameTitleChange = (value: string) => {
    const updatedGameTitles = gameTitles.includes(value)
      ? gameTitles.filter(title => title !== value)
      : [...gameTitles, value];
    setGameTitles(updatedGameTitles);
  };

  const handleSubmit = () => {
    onUpdateProfile({
      name,
      email,
      gameTitles
    });
  };

  const availableGameTitles = [
    'Street Fighter 6',
    '鉄拳8',
    'GUILTY GEAR -STRIVE-',
    '大乱闘スマッシュブラザーズ SPECIAL'
  ];

  return (
    <div>
      <Input
        label="名前"
        value={name}
        onChange={handleNameChange}
        placeholder="名前を入力"
      />
      <Input
        label="メールアドレス"
        value={email}
        onChange={handleEmailChange}
        placeholder="メールアドレスを入力"
        type="email"
      />
      <div>
        <h3>プレイするゲーム</h3>
        {availableGameTitles.map(title => (
          <label key={title}>
            <input
              type="checkbox"
              checked={gameTitles.includes(title)}
              onChange={() => handleGameTitleChange(title)}
            />
            {title}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>プロフィールを更新</button>
    </div>
  );
};