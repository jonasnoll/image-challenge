import type { CategoryImage } from '../types';

interface ImageGridProps {
  images: CategoryImage[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
  // sort by created at, latest first
  const sortedImages = [...images].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {sortedImages.map((image, index) => {
        const firstSixDigits = image.id.slice(0, 6);

        return (
          <div
            key={image.id}
            className="flex flex-col items-center border border-gray-200 rounded-lg p-2 bg-gray-50"
          >
            <img
              src={image.imageURI}
              alt={`Image ${index + 1}`}
              className="w-full h-48 rounded-md object-contain"
            />
            <p className="mt-2 text-xs text-gray-600 font-mono">ID: {firstSixDigits}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
