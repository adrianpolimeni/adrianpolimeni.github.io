import React from 'react';
import { Result, Button } from 'antd';

const Error = () => (
  <Result
    status="error"
    title="Whoops!"
    subTitle="Something went wrong."
    extra={(
      <Button
        type="primary"
        size="large"
        href="/itin"
      >
        Take me back home
      </Button>
    )}
  />
);

export default Error;