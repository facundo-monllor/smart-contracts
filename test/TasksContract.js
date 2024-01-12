const TasksContract = artifacts.require('TasksContract');

contract('TasksContract', () => {
  before(async () => {
    this.taskContract = await TasksContract.deployed();
  });

  it('migrate deployed successfully', async () => {
    const address = this.taskContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
  });

  it('Get tasks list', async () => {
    const tasksCounter = await this.taskContract.taskCounter();
    const task = await this.taskContract.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter);
    assert.equal(task.title, 'first task');
    assert.equal(task.description, 'i need do anything');
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  });

  it('Task created successfully', async () => {
    const result = await this.taskContract.createTask(
      'second task',
      'description two'
    );
    const taskEvent = result.logs[0].args;
    const taskCounter = await this.taskContract.taskCounter();

    assert.equal(taskCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, 'second task');
    assert.equal(taskEvent.description, 'description two');
    assert.equal(taskEvent.done, false);
  });
});
