export const fetchBearImage = async (width: number, height: number) => {
  try {
    const response = await fetch(`https://placebear.com/${width}/${height}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCatImage = async (width: number, height: number) => {
  try {
    const response = await fetch(`https://placecats.com/${width}/${height}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchActorImage = async (width: number, height: number) => {
  try {
    const response = await fetch(`https://placekeanu.com/${width}/${height}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
