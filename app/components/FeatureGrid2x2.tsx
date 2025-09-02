import React from 'react';
import Text from './Text';

interface FeatureItemText {
  title: string;
  description: string;
}

interface FeatureGridProps {
  img1: string;
  img2: string;
  text1: FeatureItemText;
  text2: FeatureItemText;
  className?: string;
}

const FeatureGrid2x2: React.FC<FeatureGridProps> = ({
  img1,
  img2,
  text1,
  text2,
  className = '',
}) => {
  return (
    <div
      className={`grid grid-cols-2 grid-rows-2 gap-0 w-full ${className}`}
      style={{ width: '100%' }}
    >
      {/* Top Left - Image */}
      <div
        style={{
          height: '350px',
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Top Right - Text */}
      <div
        style={{ height: '350px' }}
        className="flex flex-col items-center justify-center text-center p-6 bg-white"
      >
        <Text type="title" className="mb-2">
          {text1.title}
        </Text>
        <Text type="description">{text1.description}</Text>
      </div>

      {/* Bottom Left - Text */}
      <div
        style={{ height: '350px' }}
        className="flex flex-col items-center justify-center text-center p-6 bg-white"
      >
        <Text type="title" className="mb-2">
          {text2.title}
        </Text>
        <Text type="description">{text2.description}</Text>
      </div>

      {/* Bottom Right - Image */}
      <div
        style={{
          height: '350px',
          backgroundImage: `url(${img2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

export default FeatureGrid2x2;
