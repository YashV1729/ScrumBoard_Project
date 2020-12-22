import styled from 'styled-components';

const BoardTypes = styled.div`
  margin-bottom: 10px;
  margin: auto;
`;

const BoardTypeTitle = styled.h4`
  i {
    margin-right: 5px;
    color: gray;
  }
  margin-left: 5px;
  margin-bottom: 0px;
`;

const Boards = styled.div``;

const BoardForm = styled.form`
  width: 100%;
`;

const BoardsContainer = styled.div`
  display: flex;
`;

export { BoardForm, BoardTypes, BoardTypeTitle, Boards, BoardsContainer };
