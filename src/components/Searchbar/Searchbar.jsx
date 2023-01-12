import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';

import { Searchbar, SearchForm, SearchBtn, Input } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    if (event.currentTarget.elements.querry.value === '') {
      toast.error('Please, enter a value!');
      event.currentTarget.reset();
      return;
    }
    onSubmit(event.currentTarget.elements.querry.value.toLowerCase());
    event.currentTarget.reset();
  };
  return (
    <Searchbar>
      <SearchForm
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <SearchBtn type="submit">
          <BsSearch size="24" />
        </SearchBtn>

        <Input
          name="querry"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
