import { useState } from 'react';
import ImageCategoryButton from './ImageCategoryButton';

interface ControlPanelProps {
  onFetchImages: (imageType: string, amount: any) => void;
  onGetLatest: () => void;
}

const ControlPanel = ({ onFetchImages, onGetLatest }: ControlPanelProps) => {
  const [imageType, setImageType] = useState('cat');
  const [amount, setAmount] = useState('1');
  const [error, setError] = useState<string | null>(null);

  const handleFetchImages = (imageType: string, amount: string) => {
    // validation
    setError(null);
    if (parseInt(amount) < 1 || parseInt(amount) > 10000) {
      setError('*Amount must be between 1 and 10.000 to get unique random images');
      return;
    }
    onFetchImages(imageType, amount);
  };

  return (
    <div className="flex flex-col w-[500px] mb-4">
      <div className="flex flex-col p-2 bg-gray-200 rounded-md space-y-4">
        {/* Categories */}
        <div className="flex flex-row space-x-2">
          <ImageCategoryButton
            name={'Cat'}
            type={'cat'}
            isSelected={imageType == 'cat'}
            onClicked={setImageType}
          />
          <ImageCategoryButton
            name={'Bear'}
            type={'bear'}
            isSelected={imageType == 'bear'}
            onClicked={setImageType}
          />
          <ImageCategoryButton
            name={'Cool Actor!'}
            type={'actor'}
            isSelected={imageType == 'actor'}
            onClicked={setImageType}
          />
        </div>
        {/* Number of Files */}
        <div className="flex flex-col items-start space-y-2">
          <div className="text-xs">Amount of images to fetch</div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFetchImages(imageType, amount);
              }
            }}
            className="w-full border border-gray-400 bg-white px-2 py-1 rounded"
          />
        </div>
        {error && <div className="text-red-600 text-xs italic">{error}</div>}
        {/* Generate Button */}
        <div>
          <button
            className="w-full cursor-pointer text-sm px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600;"
            onClick={() => handleFetchImages(imageType, amount)}
          >
            Fetch
          </button>
        </div>
      </div>
      {/* Fetch Latest */}
      <div className="flex flex-col mt-4 p-2 bg-gray-200 rounded-md space-y-4">
        <button
          className="w-full cursor-pointer text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600;"
          onClick={onGetLatest}
        >
          Get latest image
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
