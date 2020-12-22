import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Loading = styled.div`
  text-align: center;
`;

const Loader = () => (
  <Loading>
    <Button shape="circle" loading />
  </Loading>
);

export default Loader;
