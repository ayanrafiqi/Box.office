import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
const Show = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isLoading, SetIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          SetIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          SetIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('show', show);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>error occured:{error}</div>;
  }

  return <div>This is a Show page</div>;
};

export default Show;
