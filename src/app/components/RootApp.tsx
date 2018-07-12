import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Footer from '@src/app/components/Footer';
import Message from '@src/app/components/Message';
import TodoForm from '@src/app/components/TodoForm';
import TodoList from '@src/app/components/TodoList';

type Props = {
  title?: string;
  targetAddress?: string;
  pushToTarget?: void;
  currentTodo?: string;
  updateCurrent?: (val: any) => void;
};

class RootApp extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">🍉</div>
        </header>
        <Router>
          <div className="Todo-App">
            <Message/>
            <TodoForm/>
            <Route path="/:filter?" component={TodoList}/>
            <Footer/>
          </div>
        </Router>
      </div>
    );
  }
}

export default RootApp;
