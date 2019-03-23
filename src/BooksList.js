import React, { Component } from 'react';
import { uniqueId } from 'lodash';

export default class BooksList extends Component {
  getRate = (rate) => {
    const maxRate = 5;
    const iter = (acc) => {
      if (acc.length === maxRate) {
        return acc;
      }
      const fill = acc.length < rate ? '#FEC71C' : '#a2a0a0';
      const newStar = (
        <svg
          id='Layer_1'
          key={uniqueId()}
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='xMinYMid'
          viewBox='0 0 15 15'
          width='15'
          height='15'
        >
          <path
            d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'
            fill={fill}
          />
        </svg>
      );
      return iter([...acc, newStar]);
    }
    return (
      <div className='d-flex'>
        {iter([])}
      </div>
    );
  };

  render() {
    const { books, onBookClick } = this.props;
    return (
      <ul className='list-group'>
        {books.map(({ title, rate, isbn }) => (
          <li className='list-group-item list-group-item-action' key={uniqueId()}>
            <a href='#' onClick={onBookClick(isbn)}>
              <h2>{title}</h2>
              {this.getRate(rate)}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
