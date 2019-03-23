import React, { Component } from 'react';
import cn from 'classnames';
import './Book.css'

export default class Book extends Component {
  render() {
    const { form, status, onInputChange, onSubmit, onImageDelete, invalidFields } = this.props.params;
    const formEditability = status === 'viewBook' || status === 'bookAdded';
    const src = form.cover !== '' ? form.cover : '../../images/no-photo.jpg';
    const submitButtonText = {
      viewBook: 'Редактировать',
      editBook: 'Сохранить',
      addBook: 'Добавить книгу',
      bookAdded: 'Книга добавлена'
    }
    const imageButtonText = status !== 'addBook' &&  status !== 'bookAdded' ? 'Заменить обложку' : 'Добавить обложку';

    return (
      <form className='pt-3' onSubmit={onSubmit} noValidate>
        <div className='form-row'>
          <div className='form-group col-md-6 justify-content-center d-flex flex-wrap'>
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
              accept='image/*'
              width='400'
              height='400'
            />
            <input
              type='file'
              id='cover'
              name='cover'
              className='Book-image-input'
              disabled={formEditability}
              onChange={onInputChange}
            />
            <label className='btn mb-0 btn-outline-success mr-3' htmlFor='cover'>{imageButtonText}</label>
            <button className='btn btn-outline-danger' type='button' disabled={formEditability} onClick={onImageDelete}>Удалить обложку</button>
          </div>
          <div className='form-group col-md-6'>
            <div className='Book-input-groups'>
              <label htmlFor='title' className='col-form-label font-weight-bold'>Название</label>
              <small className='text-muted'>
                Длина от 10 до 100 символов
              </small>
              <input
                type='text'
                name='title'
                className={cn({'form-control': true, 'Book-invalid': invalidFields.has('title')})}
                id='title'
                required
                placeholder='Название'
                onChange={onInputChange}
                value={form.title}
                readOnly={formEditability}
              />
            </div>
            <div className='Book-input-groups'>
              <label htmlFor='author' className='col-form-label font-weight-bold'>Автор</label>
              <small className='text-muted'>
                Длина от 10 до 100 символов
              </small>
              <input
                type='text'
                name='author'
                className={cn({'form-control': true, 'Book-invalid': invalidFields.has('author')})}
                id='author'
                required
                placeholder='Автор'
                onChange={onInputChange}
                value={form.author}
                readOnly={formEditability}
              />
            </div>
            <div className='Book-input-groups'>
              <label htmlFor='isbn' className='col-form-label font-weight-bold'>Код ISBN</label>
              <small className='text-muted'>
                Например: 978-5-699-79119-4
              </small>
              <input
                type='text'
                name='isbn'
                className={cn({'form-control': true, 'Book-invalid': invalidFields.has('isbn')})}
                id='isbn'
                required
                placeholder='Код ISBN'
                onChange={onInputChange}
                value={form.isbn}
                readOnly={formEditability}
              />
            </div>
            <div className='Book-input-groups'>
              <label htmlFor='edition' className='col-form-label font-weight-bold'>Год издания</label>
              <small className='text-muted'>
                Например: 17 или 2017
              </small>
              <input
                type='text'
                name='edition'
                className={cn({'form-control': true, 'Book-invalid': invalidFields.has('edition')})}
                id='edition'
                required
                placeholder='Год издания'
                onChange={onInputChange}
                value={form.edition}
                readOnly={formEditability}
              />
            </div>
            <div className='Book-input-groups'>
              <label htmlFor='rate' className='col-form-label font-weight-bold'>Рейтинг</label>
              <small className='text-muted'>
                Рейтинг от 0 до 5
              </small>
              <input
                type='text'
                name='rate'
                className={cn({'form-control': true, 'Book-invalid': invalidFields.has('rate')})}
                id='rate'
                placeholder='Рейтинг'
                onChange={onInputChange}
                value={form.rate}
                readOnly={formEditability}
              />
            </div>
          </div>
        </div>
        <div className='form-group mb-4'>
          <div className='Book-input-groups'>
            <label htmlFor='description' className='col-form-label mb-2 font-weight-bold'>Описание</label>
            <small className='text-muted'>
              Длина от 100 до 1000 символов
            </small>
            <textarea
              type='text'
              className={cn({'form-control': true, 'Book-textarea': true,'Book-invalid': invalidFields.has('description')})}
              name='description'
              id='description'
              required
              readOnly={formEditability}
              placeholder='Описание'
              onChange={onInputChange}
              value={form.description}>
            </textarea>
          </div>
        </div>
        <button type='submit' className='btn btn-primary btn-lg btn-block' disabled={invalidFields.size > 0 || status === 'bookAdded'}>{submitButtonText[status]}</button>
      </form>
    );
  }
}
