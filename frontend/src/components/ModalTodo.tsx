const ModalTodo = () => {

    const listName = "list-name-null";
    const listDate = "list-date-null";

    return (
        <span className="todo-modal d-flex align-items-center justify-content-center">
            <div className="d-flex float-left align-items-center justify-content-between todo-list-main modal-todo-list">
                <span className="d-flex flex-column gap-3 page-dot">
                    {[...Array(13)].map((_, index) => {
                        return (
                            <span key={index}><i className="bi bi-heptagon-fill"></i></span>
                        );
                    })}
                </span>

                <div className="d-flex flex-column align-items-center justify-content-between todo-list-main">
                    <span className='full-w d-flex float-left align-items-center justify-content-between list-header'>
                        <span className='font-bold fs-5'>{listName}</span>
                        <span>{listDate}</span>
                    </span>

                    <span className='mt-2 d-flex flex-column gap-2 full-w align-items-start justify-content-start todo-list-tasks'>
                        {[...Array(13)].map((_, index) => {
                            return (
                                <span key={index} className='d-flex full-w float-left align-items-center gap-2 todo-list-tasks-task'>
                                    <input type='checkbox' className='task-checkbox' />
                                    <span className='task-text'>Task {index + 1}</span>
                                </span>
                            );
                        })}
                    </span>

                    <span className='full-w d-flex align-items-center justify-content-end fs-4 gap-3'>
                        <span><i className="bi bi-pen-fill"></i></span>
                        <span><i className="bi bi-trash-fill"></i></span>
                    </span>
                </div>

            </div>
        </span>
    )
}

export default ModalTodo;