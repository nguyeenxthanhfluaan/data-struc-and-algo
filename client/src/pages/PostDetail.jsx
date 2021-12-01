import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Marginer from '../components/Marginer';

import { fetchPostById } from '../redux/post/post.actions';

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { post } = useSelector(({ post }) => ({ post: post.post }));

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, []);
  return (
    <div className="post-detail">
      {post && (
        <div>
          <h3 className="post-detail__heading">{post.title}</h3>
          <Marginer margin="20px" />
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
