import React, { Component } from 'react';
import cn from 'classnames';
import { isLength, isISBN, isEmpty, isInt, isNumeric} from 'validator';
import { transform } from 'lodash';
import books from './data';
import BooksList from './BooksList';
import Book from './Book';

class App extends Component {
  state = {
    books,
    view: 'list',
    form: {
      title: '',
      cover: '',
      description: '',
      author: '',
      isbn: '',
      edition: '',
      rate: ''
    },
    invalidFields: new Set(),
    requiredFields: ['title', 'description', 'author', 'isbn', 'edition'],
    activePage: {
      main: true,
      addPage: false
    }
  }

  onMainClick = (e) => {
    e.preventDefault();
    this.setState({
      view: 'list',
      invalidFields: new Set(),
      activePage: { main: true, addPage: false }
    });
  }

  onAddBookClick = (e) => {
    e.preventDefault();
    const { form } = this.state;
    const currentBook = transform(form, (obj, value, key) => obj[key] = '', {});
    this.setState({
      view: 'addBook',
      form: currentBook,
      invalidFields: new Set(),
      activePage: { main: false, addPage: true }
    });
  }

  onBookClick = (currentISBN) => (e) => {
    e.preventDefault();
    const currentBook = this.state.books.find(({ isbn }) => isbn === currentISBN);
    this.setState({
      view: 'viewBook',
      form: currentBook,
      activePage: { main: false, addPage: false }
    });
  };

  onImageLoad = (reader) => () =>{
    const { form } = this.state;
    this.setState({ form: { ...form, cover: reader.result } });
  }

  onInputChange = ({ target: { name, value, files } }) => {
    const { form, invalidFields } = this.state;
    const  checkValidity = {
      title: (value) => isLength(value, {min:10, max: 100}),
      description: (value) => isLength(value, {min:100, max: 1000}),
      author: (value) => isLength(value, {min:10, max: 100}),
      isbn: (value) => isISBN(value),
      edition: (value) => isNumeric(value) && isLength(value, {min:2, max: 4}),
      rate: (value) => isEmpty(value) || isInt(value, {min:0, max: 5})
    }

    if (files) {
      const reader = new FileReader();
      if (files[0].type.includes('image/')) {
        reader.addEventListener('load', this.onImageLoad(reader));
        reader.readAsDataURL(files[0]);
      }
      return;
    }
    const newInvalidFields = new Set([...invalidFields]);

    if (!checkValidity[name](value)) {
      newInvalidFields.add(name);
    } else {
      newInvalidFields.delete(name);
    }
    this.setState({ form: { ...form, [name]: value }, invalidFields: newInvalidFields });
  }

  onImageDelete = (e) => {
    e.preventDefault();
    const { form } = this.state;
    this.setState({ form: { ...form, cover: '' } })
  }

  onEditClick = (e) => {
    e.preventDefault();
    this.setState({ view: 'editBook' });
  }

  onSaveClick = (e) => {
    e.preventDefault();
    if(this.state.invalidFields.size > 0) {
      return;
    }
    const { books, form } = this.state;
    const newBooks = books.filter(({ isbn }) => isbn !== form.isbn);
    this.setState({ view: 'viewBook', books: [...newBooks, form] });
  }

  onAddClick = (e) => {
    e.preventDefault();
    const { invalidFields, requiredFields, form, books } = this.state;

    if (invalidFields.size > 0) {
      return false;
    }

    const notFilledFields = requiredFields.filter(field => isEmpty(form[field]));

    if (notFilledFields.length > 0 ) {
      this.setState({ invalidFields: new Set(notFilledFields) });
      return;
    }

    this.setState({ view: 'bookAdded', books: [...books, form]});
  }

  render() {
    const generalParams = {
      form: this.state.form,
      status: this.state.view,
      invalidFields: this.state.invalidFields,
    }

    const viewParams = {
      onSubmit: this.onEditClick,
    }

    const editParams = {
      onInputChange: this.onInputChange,
      onSubmit: this.onSaveClick,
      onImageDelete: this.onImageDelete,
      invalidFields: this.state.invalidFields
    }

    const addParams = {
      onInputChange: this.onInputChange,
      onSubmit: this.onAddClick,
    }

    const content = {
      list: <BooksList books={this.state.books} onBookClick={this.onBookClick}/>,
      viewBook: <Book params={{ ...generalParams, ...viewParams}}/>,
      editBook: <Book params={{...generalParams, ...editParams}}/>,
      addBook: <Book params={{...generalParams, ...addParams}} />,
      bookAdded: <Book  params={generalParams}/>
    }

    const { activePage } = this.state;

    return (
      <div>
        <header>
          <div className='container'>
            <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor: '#e3f2fd'}}>
              <ul className='navbar-nav'>
                <li className={cn({'nav-item': true, active: activePage.main })}>
                  <a className='nav-link' href='#' onClick={this.onMainClick}>Главная</a>
                </li>
                <li className={cn({'nav-item': true, active: activePage.addPage })}>
                  <a className='nav-link' href='#' onClick={this.onAddBookClick}>Добавить книгу</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <div className='container'>
            {content[this.state.view]}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
