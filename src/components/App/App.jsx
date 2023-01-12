import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { GlobalStyle } from '../../GlobalStyles';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { fetchImages } from '../../api';
import { AppWrap } from './App.styled';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    querry: '',
    images: [],
    loading: false,
    page: 1,
    total: 0,
  };

  handleSubmit = querry => {
    this.setState({ querry, page: 1 });
    if (querry !== this.state.querry || this.state.page > 1) {
      this.setState({ images: [] });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.querry !== this.state.querry ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const data = await fetchImages(this.state.querry, this.state.page);

        if (data.hits.length < 1) {
          toast.warning(
            `${this.state.querry} is not defined! Please, enter other value and try again!`
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

        this.setState({
          images: [...this.state.images, ...images],
          total: data.totalHits,
        });
      } catch (error) {
        toast.error('Something went wrong. Please, try again!');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { loading, images, total } = this.state;
    return (
      <AppWrap>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {total > 12 && !loading && <Button onLoadMore={this.loadMore} />}

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
  }
}
