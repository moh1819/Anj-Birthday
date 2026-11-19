/**
 * Gallery photos.
 * Full-size images live in  public/images/photo-XX.webp
 * Thumbnails live in        public/images/thumbs/photo-XX.webp
 *
 * To replace a photo: drop a new file in with the SAME name (any aspect ratio works —
 * frames crop automatically). To add or remove photos, edit this list.
 * `focus` controls which part of the photo stays visible inside the polaroid frame
 * ("50% 25%" = centred horizontally, near the top).
 */
const photos = [
  { file: 'photo-01.webp', alt: 'Anjali in an ivory embroidered dupatta', caption: 'Grace in ivory', focus: '50% 22%' },
  { file: 'photo-02.webp', alt: 'Anjali in a red silk saree', caption: 'Radiant in red', focus: '50% 30%' },
  { file: 'photo-03.webp', alt: 'Anjali in a turquoise drape outfit', caption: 'Ocean blue', focus: '50% 30%' },
  { file: 'photo-04.webp', alt: 'Anjali in sunglasses surrounded by kittens', caption: 'Queen of cats', focus: '50% 35%' },
  { file: 'photo-05.webp', alt: 'Close-up of golden temple jhumkas and a green silk saree', caption: 'Golden details', focus: '60% 45%' },
  { file: 'photo-06.webp', alt: 'Holding a big bouquet of red roses', caption: 'A hundred roses', focus: '50% 45%' },
  { file: 'photo-07.webp', alt: 'Black and white photo of Anjali in festive antlers', caption: 'Festive mood', focus: '50% 30%' },
  { file: 'photo-08.webp', alt: 'Black and white mirror photo in a long coat', caption: 'Effortless', focus: '50% 30%' },
  { file: 'photo-09.webp', alt: 'Anjali in a purple silk saree in front of a flower wall', caption: 'Blooming', focus: '55% 28%' },
];

export default photos.map((p) => ({
  ...p,
  src: `/images/${p.file}`,
  thumb: `/images/thumbs/${p.file}`,
}));
