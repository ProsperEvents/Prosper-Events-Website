export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

const marchFirstGalleryFilenames = [
  "1-_DSC9572.jpg",
  "2-_DSC9573.jpg",
  "3-_DSC9574.jpg",
  "4-_DSC9576.jpg",
  "5-_DSC9577.jpg",
  "6-_DSC9578.jpg",
  "7-_DSC9579.jpg",
  "8-_DSC9580.jpg",
  "9-_DSC9582.jpg",
  "10-_DSC9583.jpg",
  "11-_DSC9585.jpg",
  "12-_DSC9586.jpg",
  "13-_DSC9589.jpg",
  "14-_DSC9591.jpg",
  "15-_DSC9592.jpg",
  "16-_DSC9593.jpg",
  "17-_DSC9601.jpg",
  "18-_DSC9602.jpg",
  "19-_DSC9604.jpg",
  "20-_DSC9608.jpg",
  "21-_DSC9609.jpg",
  "22-_DSC9610.jpg",
  "23-_DSC9612.jpg",
  "24-_DSC9616.jpg",
  "25-_DSC9619.jpg",
  "26-_DSC9625.jpg",
  "27-_DSC9628.jpg",
  "28-_DSC9635.jpg",
  "29-_DSC9642.jpg",
  "30-_DSC9650.jpg",
  "31-_DSC9661.jpg",
  "32-_DSC9667.jpg",
  "33-_DSC9675.jpg",
  "34-_DSC9700.jpg",
  "35-_DSC9703.jpg",
  "36-_DSC9710.jpg",
  "37-_DSC9712.jpg",
  "38-_DSC9715.jpg",
  "39-_DSC9717.jpg",
  "40-_DSC9719.jpg",
  "41-_DSC9725.jpg",
  "42-_DSC9728.jpg",
  "43-_DSC9733.jpg",
  "44-_DSC9734.jpg",
  "45-_DSC9735.jpg",
  "46-_DSC9741.jpg",
  "47-_DSC9742.jpg",
] as const;

export const galleryImages: GalleryImage[] = marchFirstGalleryFilenames.map(
  (filename, index) => ({
    id: `march-1-${String(index + 1).padStart(2, "0")}`,
    src: `/assets/gallery/march-1/${filename}`,
    alt: `Prosper Events March 1 gallery photo ${index + 1}`,
  }),
);
