import type { ImageType } from '../types';

interface ImageCategoryButtonProps {
  name: string;
  type: ImageType;
  isSelected: boolean;
  onClicked: (imageType: string) => void;
}

const ImageCategoryButton = ({ name, type, isSelected, onClicked }: ImageCategoryButtonProps) => {
  return (
    <button
      className={`w-full cursor-pointer text-sm px-4 py-2 rounded-md transition-colors  disabled:opacity-50 disabled:cursor-not-allowed ${
        isSelected
          ? 'bg-[#6967FF] text-white'
          : 'bg-white text-gray-600 hover:bg-[#6967FF] hover:text-white'
      }`}
      onClick={() => onClicked(type)}
    >
      <div>{name}</div>
    </button>
  );
};

export default ImageCategoryButton;
