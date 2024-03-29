import React, { useState, useContext } from 'react';

import { AppContext } from '../../store/context';
import { Button } from '../';
import { Actions } from '../../constants';

export const NewTask: React.FunctionComponent = () => {
  const [isForm, setIsForm] = useState(false);
  const [title, setTitle] = useState('');

  const { dispatch } = useContext(AppContext);

  const onNewTask = () => setIsForm(true);
  const onAddTask = () => null;
  const onCancelTask = () => setIsForm(false);

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    dispatch({
      type: Actions.add,
      title,
    });

    setIsForm(false);
  };

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = event => setTitle(event.target.value);

  return (
    <div
      role="form"
      className="d-flex flex-column justify-content-start align-items-center py-4"
    >
      {isForm &&
        <form className="w-100" onSubmit={onFormSubmit}>
          <div className="mb-3">
            <label
              htmlFor="taskTitle"
              className="form-label"
            >
              Task Title
            </label>

            <input
              type="text"
              className="form-control"
              id="taskTitle"
              aria-describedby="taskHelp"
              onChange={onTitleChange}
            />

            <div id="taskHelp" className="form-text">
              What are you planning to do
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <Button
              type="button"
              style="dark"
              outline
              onClick={onCancelTask}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              style="primary"
              onClick={onAddTask}
            >
              Add task
            </Button>
          </div>
        </form>
      }

      {!isForm &&
        <Button
          style="dark"
          outline
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
          }
          onClick={onNewTask}
        >
          New task
        </Button>
      }
    </div>
  );
};

export default NewTask;
