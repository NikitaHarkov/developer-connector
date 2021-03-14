import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postAction';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  const submitHandler = e => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave Comment</h3>
      </div>
      <form className='form my-1' onSubmit={submitHandler}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Write something that interest you'
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
