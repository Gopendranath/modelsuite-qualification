import { useState } from 'react';

const AVATAR_COLORS = [
  'linear-gradient(135deg,#3B82F6,#2563EB)',
  'linear-gradient(135deg,#8B5CF6,#7C3AED)',
  'linear-gradient(135deg,#10B981,#059669)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#EF4444,#DC2626)',
  'linear-gradient(135deg,#EC4899,#DB2777)',
];

const getAvatarColor = (name = '') =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const getInitial = (name) => {
  if (!name || typeof name !== 'string') return '?';
  return name.trim()[0].toUpperCase();
};

const Avatar = ({ src, name, size = 32, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'avatar'}
        className={`rounded-full shrink-0 object-cover ${className}`}
        style={{ width: size, height: size }}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: getAvatarColor(name),
        fontSize: Math.round(size * 0.4),
      }}
    >
      {getInitial(name)}
    </div>
  );
};

export default Avatar;
