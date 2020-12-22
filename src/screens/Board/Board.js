import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { isEmpty, findIndex } from 'lodash';
import { withRouter } from 'react-router-dom';

import { db } from '../../firebase';
import withAuthorization from '../../utils/withAuthorization';
import { getBoardKey, mergeDataWithKey } from '../../utils/index';

import BoardTitle from '../../components/BoardTitle';
import Loader from '../../components/Loader';
import { AddList, Lists } from './styled';
import FormCreation from '../../components/FormCreation';
import Cards from './Cards';
import List from '../../components/List';
import ListHeader from '../../components/ListHeader';

class BoardScreen extends Component {
  state = {
    isLoading: false,
    board: {},
    boardKey: '',
    lists: []
  };

  componentDidMount = () => {
    this.setState({
      isLoading: true
    });
    const boardKey = getBoardKey();
    Promise.all([db.onceGetBoard(boardKey), db.onceGetLists(boardKey)])
      .then(snapshots => {
        const board = snapshots[0].val();
        const lists = mergeDataWithKey(snapshots[1].val());
        this.setState(() => ({ boardKey, board, lists }));
      })
      .finally(() =>
        this.setState(() => ({
          isLoading: false
        }))
      );
  };

  handleCreateList = listTitle => {
    const { boardKey } = this.state;
    return db.doCreateList(boardKey, { title: listTitle }).then(response => {
      const lists = [...this.state.lists];
      lists.push(response);
      this.setState({
        lists
      });
    });
  };

  handleUpdateList = (listKey, title) => {
    const { boardKey } = this.state;
    return db.doUpdateList(boardKey, listKey, { title }).then(response => {
      const lists = [...this.state.lists];
      lists[findIndex(lists, list => list.key === listKey)] = {
        ...response,
        key: listKey
      };
      this.setState(() => ({
        lists
      }));
    });
  };

  handleDeleteList = listKey => {
    const { boardKey } = this.state;
    return db.doDeleteList(boardKey, listKey).then(() => {
      const lists = this.state.lists.filter(list => list.key !== listKey);
      this.setState({
        lists
      });
    });
  };

  handleAddToFavorites = () => {
    const { boardKey } = this.state;
    const updatedBoard = { ...this.state.board };
    updatedBoard.favorite = !updatedBoard.favorite;
    return db.doEditBoard(boardKey, updatedBoard).then(() => {
      this.setState(() => ({
        board: updatedBoard
      }));
    });
  };

  handleDeleteBoard = boardKey => {
    return db.doDeleteBoard(boardKey).then(() => {
      this.props.history.push('/boards');
    });
  };

  handleUpdateBoard = (boardKey, title) => {
    return db.doUpdateBoard(boardKey, title).then(() => {
      const updatedBoard = { ...this.state.board, ...title };
      this.setState({
        board: updatedBoard
      });
    });
  };

  render() {
    const { board, lists, boardKey } = this.state;
    return this.state.isLoading ? (
      <Loader />
    ) : (
      !isEmpty(board) && (
        <React.Fragment>
          <BoardTitle
            title={board.title}
            favorite={board.favorite}
            boardKey={boardKey}
            onAddToFavorites={this.handleAddToFavorites}
            deleteBoard={this.handleDeleteBoard}
            updateBoard={this.handleUpdateBoard}
          />

          <Lists>
            {lists.map((list, index) => (
              <List key={index}>
                <ListHeader
                  listKey={list.key}
                  listTitle={list.title}
                  onEditList={this.handleUpdateList}
                  onDeleteList={this.handleDeleteList}
                />
                <Cards list={list} />
              </List>
            ))}
            <AddList>
              <FormCreation
                placeholder="Create new list"
                onCreate={this.handleCreateList}
              />
            </AddList>
          </Lists>
        </React.Fragment>
      )
    );
  }
}

const authCondition = authUser => !!authUser;

export default withRouter(
  withAuthorization(authCondition)(DragDropContext(HTML5Backend)(BoardScreen))
);
