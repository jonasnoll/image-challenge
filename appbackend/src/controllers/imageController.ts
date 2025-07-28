import { Router } from 'express';
import { ImageService } from '../service/imageService';
import { toImagesResponseDTO } from './toDTO';

const router = Router();

// Get images based on image type and amount
router.get('/', async (req, res) => {
  try {
    const imageType = req.query.imageType as string;
    const amount = parseInt(req.query.amount as string, 10);

    // validation
    if (!imageType || !amount) {
      return res.status(400).json({ error: 'Image type and amount are required' });
    }

    if (amount < 1 || amount > 100000) {
      return res.status(400).json({ error: 'Amount must be between 1 and 100000' });
    }

    if (!['bear', 'cat', 'actor'].includes(imageType)) {
      return res.status(400).json({ error: 'Invalid image type' });
    }

    const images = await ImageService.getImages(imageType, amount);

    // convert  to DTO
    const imagesResponse = toImagesResponseDTO(images);

    res.json({
      message: `Fetched ${amount} ${imageType} image(s) successfully.`,
      data: imagesResponse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get latest stored image
router.get('/latest', async (req, res) => {
  try {
    const image = await ImageService.getLatestImage();
    if (!image) {
      return res.status(404).json({ error: 'No image found' });
    }
    // convert to DTO
    const imageResponse = toImagesResponseDTO([image])[0];
    res.json({
      message: 'Retreived latest image successfully.',
      data: imageResponse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
