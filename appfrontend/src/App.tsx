import { useState } from 'react';
import { ImageService } from './api/image.service';
import ControlPanel from './components/ControlPanel';
import ImageGrid from './components/ImageGrid';
import type { CategoryImage } from './types';

function App() {
  const [images, setImages] = useState<CategoryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateImages = (images: CategoryImage[]) => {
    // Validations here
    setImages(images);
  };

  const fetchImages = async (imageType: string, amount: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const imageAmount = parseInt(amount || '0', 10);
      const response = await ImageService.getImages(imageType.toLowerCase(), imageAmount);
      updateImages(response);
    } catch (error) {
      console.error(error);
      setError('Could not load images.');
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLatestImage = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await ImageService.getLatestImage();
      updateImages([response]);
    } catch (error) {
      console.error(error);
      setError('Could not load latest image.');
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="w-[1200px] px-6 mx-auto">
          {/* Title */}
          <div className="flex flex-col p-4 mt-4 bg-black rounded-md">
            <h1 className="text-2xl text-white">Camunda Image Challenge</h1>
            <h4 className="text-md text-orange-500">Jonas Noll</h4>
          </div>

          {/* Intro + Options */}
          <div className="flex flex-wrap justify-between mt-4">
            <ControlPanel onFetchImages={fetchImages} onGetLatest={fetchLatestImage} />
            <div className="w-[400px] text-sm">
              Let's get some images from the internet. Choose between Cats, Bears, and a Cool Actor.
              Type in the amount of images you want and hit "Fetch"! If you feel like it, get the
              latest image that has been saved to the database with a click on "Get latest image".
              <br />
              <br />
              Images are unique by dimesions and motive.
            </div>
          </div>

          <div className="w-full h-0.5 my-4 bg-black"></div>

          <div className="min-h-[500px]">
            {/* Image Feed */}
            {error && <div className="text-gray-400 italic text-sm">{error}</div>}
            {isLoading ? (
              <div className="w-6 h-6 border-3 rounded-full animate-spin border-gray-100 border-t-gray-400"></div>
            ) : images.length > 0 ? (
              <div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setImages([])}
                    className="w-4 h-4 rounded-full bg-gray-400 text-white text-[10px] flex items-center justify-center hover:bg-gray-500 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <ImageGrid images={images} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
