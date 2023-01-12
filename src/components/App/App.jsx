import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { GlobalStyle } from '../../GlobalStyles';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { fetchImages } from '../../api';
import { AppWrap } from './App.styled';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    if (searchQuery !== query || page > 1) {
      setImages([]);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const controller = new AbortController();

    const fetch = async function () {
      try {
        setLoading(true);
        const data = await fetchImages(query, page, controller);

        if (data.hits.length < 1) {
          toast.warning(
            `${query} is not defined! Please, enter other value and try again!`
          );
        }

        const images = data.hits.map(
          ({ id, largeImageURL, tags, webformatURL }) => {
            return {
              id,
              largeImageURL,
              tags,
              webformatURL,
            };
          }
        );

        setImages(prevState => [...prevState, ...images]);
        setTotal(data.totalHits);
      } catch (error) {
        toast.error('Something went wrong. Please, try again!');
      } finally {
        setLoading(false);
      }
    };

    fetch();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  return (
    <AppWrap>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {page < Math.ceil(total / 12) && !loading && (
        <Button onLoadMore={loadMore} />
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <GlobalStyle />
    </AppWrap>
  );
};
