// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract TasksContract {

    uint public taskCounter = 0;
    constructor () {
        createTask("first task", "i need do anything");
    }

    event TaskCreated (
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    );

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    mapping(uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter,_title,_description,false,block.timestamp);
        emit TaskCreated(taskCounter,_title,_description,false,block.timestamp);
    }

    function toggleDone(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
    }
}