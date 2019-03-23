import React, { Component } from 'react';
import cn from 'classnames';
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
    invalidFields: [],
    activePage: {
      main: true,
      addPage: false
    }
  }

  onMainClick = (e) => {
    e.preventDefault();
    this.setState({ view: 'list', activePage: { main: true, addPage: false }});
  }

  onAddBookClick = (e) => {
    e.preventDefault();
    const currentBook = {
      title: '',
      cover: '',
      description: '',
      author: '',
      isbn: '',
      edition: '',
      rate: ''
    };
    this.setState({ view: 'addBook', form: currentBook, activePage: { main: false, addPage: true }})
  }

  onBookClick = (currentISBN) => (e) => {
    e.preventDefault();
    const currentBook = this.state.books.find(({ isbn }) => isbn === currentISBN);
    this.setState({ view: 'viewBook', form: currentBook, activePage: { main: false, addPage: false } });
  };

  onImageLoad = (reader) => () =>{
    const { form } = this.state;
    this.setState({ form: { ...form, cover: reader.result } });
  }


  onInputChange = ({ target: { name, value, files} }) => {
    const { form } = this.state;
    if (files) {
      const reader = new FileReader();
      if (files[0].type.includes('image/')) {
        reader.addEventListener('load', this.onImageLoad(reader));
        reader.readAsDataURL(files[0]);
      }
      return;
    }

    this.setState({ form: { ...form, [name]: value } });
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
    const { books, form } = this.state;
    const newBooks = books.filter(({ isbn }) => isbn !== form.isbn);
    this.setState({ view: 'viewBook', books: [...newBooks, form] });
  }

  onAddClick = (e) => {
    e.preventDefault();
    const { books, form } = this.state;
    this.setState({ view: 'bookAdded', books: [...books, form]});
  }

  render() {
    const content = {
      list: <BooksList books={this.state.books} onBookClick={this.onBookClick}/>,
      viewBook: <Book form={this.state.form} status={this.state.view} onSubmit={this.onEditClick}/>,
      editBook: <Book form={this.state.form} status={this.state.view} onInputChange={this.onInputChange}onSubmit={this.onSaveClick} onImageDelete={this.onImageDelete}/>,
      addBook: <Book form={this.state.form} status={this.state.view} onInputChange={this.onInputChange}onSubmit={this.onAddClick}/>,
      bookAdded: <Book form={this.state.form} status={this.state.view} />
    }

    const { activePage } = this.state;

    return (
      <div>
        <header>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#e3f2fd'}}>
              <ul className="navbar-nav">
                <li className={cn({'nav-item': true, active: activePage.main })}>
                  <a className="nav-link" href="#" onClick={this.onMainClick}>Главная</a>
                </li>
                <li className={cn({'nav-item': true, active: activePage.addPage })}>
                  <a className="nav-link" href="#" onClick={this.onAddBookClick}>Добавить книгу</a>
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
