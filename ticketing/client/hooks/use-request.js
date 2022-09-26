import axios from 'axios';
import React, { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const res = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(res.data);
      }

      return res.data;
    } catch (error) {
      setErrors(
        <div className='alert alert-danger'>
          <h4>Ooops...</h4>
          <ul className='my-0'>
            {error.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
