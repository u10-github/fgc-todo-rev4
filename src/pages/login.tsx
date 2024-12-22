import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '../components/common/input';
import { useSupabase } from '../hooks/useSupabase';
import { signInWithGoogle } from '../api/auth/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle(supabase);
      if (error) throw error;
      router.push('/task-list');
    } catch (error) {
      console.error('Google Sign In Error:', error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      router.push('/task-list');
    } catch (error) {
      console.error('Email Sign In Error:', error);
    }
  };

  return (
    <div>
      <Input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <Input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button onClick={handleEmailSignIn}>ログイン</button>
      <button onClick={handleGoogleSignIn}>Googleでログイン</button>
    </div>
  );
};

export default LoginPage;