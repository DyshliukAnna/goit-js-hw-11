import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let gallery = new SimpleLightbox('.gallery .photo-card__img', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 500,
});
