import React, { Component } from 'react';
import './Book.css'

export default class Book extends Component {
  render() {
    const { form, status, onInputChange, onSubmit, onImageDelete } = this.props;
    const formEditability = status === 'viewBook' || status === 'bookAdded';
    const src = form.cover !== '' ? form.cover : '../../images/no-photo.jpg';
    const submitButtonText = {
      viewBook: 'Редактировать',
      editBook: 'Сохранить',
      addBook: 'Добавить',
      bookAdded: 'Книга добавлена'
    }
    const imageButtonText = status !== 'addBook' &&  status !== 'bookAdded' ? 'Заменить обложку' : 'Добавить обложку';

    return (
      <form className='pt-3' onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <div className="form-group col-md-6 justify-content-center d-flex flex-wrap">
            <img
              className='mb-3'
              style={
                {
                  'objectFit': 'contain',
                  'objectPosition': '50% 50%'
                }
              }
              src={src}
              alt={form.title}
              accept="image/*"
              width="400"
              height="400"
            />
            <input type="file" id="cover" name="cover" className="Book-hidden" disabled={formEditability} onChange={onInputChange}/>
            <label className="btn mb-0 btn-outline-success mr-3" htmlFor="cover">{imageButtonText}</label>
            <button className="btn btn-outline-danger" type='button' disabled={formEditability} onClick={onImageDelete}>Удалить обложку</button>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="title" className="col-form-label font-weight-bold">Название</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              required
              placeholder="Название"
              onChange={onInputChange}
              value={form.title}
              readOnly={formEditability}
            />
            <label htmlFor="author" className="col-form-label font-weight-bold">Автор</label>
            <input
              type="text"
              name="author"
              className="form-control"
              id="author"
              required
              placeholder="Автор"
              onChange={onInputChange}
              value={form.author}
              readOnly={formEditability}
            />
            <label htmlFor="isbn" className="col-form-label font-weight-bold">Код ISBN</label>
            <input
              type="text"
              name="isbn"
              className="form-control"
              id="isbn"
              required
              placeholder="Код ISBN"
              onChange={onInputChange}
              value={form.isbn}
              readOnly={formEditability}
            />
            <label htmlFor="edition" className="col-form-label font-weight-bold">Год издания</label>
            <input
              type="text"
              name="edition"
              className="form-control"
              id="edition"
              required
              placeholder="Год издания"
              onChange={onInputChange}
              value={form.edition}
              readOnly={formEditability}
            />
            <label htmlFor="rate" className="col-form-label font-weight-bold">Рейтинг</label>
            <input
              type="text"
              name="rate"
              className="form-control"
              id="rate"
              placeholder="Рейтинг"
              onChange={onInputChange}
              value={form.rate}
              readOnly={formEditability}
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="description" className="col-form-label mb-2 font-weight-bold">Описание</label>
          <textarea
            type="text"
            className="form-control Book-textarea"
            name="description"
            id="description"
            required
            readOnly={formEditability}
            placeholder="Описание"
            onChange={onInputChange}
            value={form.description}>
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block" >{submitButtonText[status]}</button>
      </form>
    );
  }
}
