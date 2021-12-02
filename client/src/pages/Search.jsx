import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { fetchPosts } from '../redux/post/post.actions';

import Button from '../components/Button';
import Marginer from '../components/Marginer';
import List from '../components/List';

const Search = () => {
  const dispatch = useDispatch();

  const { search } = useLocation();

  const { posts, categories, subjects } = useSelector(({ post, category, subject }) => ({
    posts: post.posts,
    categories: category.categories,
    subjects: subject.subjects,
  }));

  const searchParams = new URLSearchParams(search);

  const keyword = searchParams.get('keyword');

  const [category, setCategory] = useState('');

  const [subject, setSubject] = useState('');

  useEffect(() => {
    dispatch(
      fetchPosts({
        keyword,
        category: searchParams.get('category') || null,
        subject: searchParams.get('subject') || null,
      })
    );
    if (searchParams.get('category')) setCategory(searchParams.get('category'));
    if (searchParams.get('subject')) setSubject(searchParams.get('subject'));
  }, []);

  const filter = () => {
    console.log({ keyword, category, subject });
    dispatch(fetchPosts({ keyword, category, subject }));
  };

  return (
    <div className="search">
      <div className="search__header">
        <h6 className="search__header__text">
          {keyword ? (
            <>
              Tìm kiếm cho <q>{keyword}</q>
            </>
          ) : (
            'Danh sách'
          )}
        </h6>

        <div className="search__filter__group">
          <label htmlFor="select-category" className="search__filter__label">
            Chọn danh mục
          </label>
          <select
            id="select-category"
            className="search__filter__select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""> -- Chọn tất cả -- </option>
            {categories &&
              categories.length > 0 &&
              categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="search__filter__group">
          <label htmlFor="select-subject" className="search__filter__label">
            Chọn chủ đề
          </label>
          <select
            id="select-subject"
            className="search__filter__select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value=""> -- Chọn tất cả -- </option>
            {subjects &&
              subjects.length > 0 &&
              subjects
                .filter((item) => item.category._id === category)
                .map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
          </select>
        </div>

        <Button onClick={filter}>Áp dụng</Button>
      </div>

      <Marginer margin={'50px'} />
      {posts && posts.length > 0 && <List data={posts} />}
    </div>
  );
};

export default Search;
