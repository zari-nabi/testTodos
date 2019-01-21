import React from "react";

const ListItem = (props) => {
    return <li className="list-group-item">
        <button className="btn-success mr-5"
            onClick={props.editTodo}>U</button>
        {props.item.name}
        <button className="btn-danger ml-5"
            onClick={props.deleteTodo}>X</button>
    </li>
}

export default ListItem;