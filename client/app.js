App = {
  contracts: {},
  init: async () => {
    console.log('Loaded');
    await App.loadAccount();
    await App.loadEthereum();
    await App.loadTask();
    App.render();
    App.renderTask();
  },

  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('no tene');
    }
  },

  loadAccount: async () => {
    const account = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    App.account = account[0];
  },

  loadTask: async () => {
    const response = await fetch('/TasksContract.json');
    const tasksJSON = await response.json();

    App.contracts.tasksContract = TruffleContract(tasksJSON);

    App.contracts.tasksContract.setProvider(App.web3Provider);

    App.tasksContract = await App.contracts.tasksContract.deployed();
  },

  render: async () => {
    document.getElementById('contact').innerText = App.account;
  },

  createTask: async (title, description) => {
    const result = await App.tasksContract.createTask(title, description, {
      from: App.account
    });
    console.log(result.logs[0].args);
  },

  renderTask: async () => {
    const counter = await App.tasksContract.taskCounter();
    const counterNumber = counter.toNumber();

    let html = '';

    for (let i = 1; i < counterNumber; i++) {
      const task = await App.tasksContract.tasks([i]);
      const taskId = task[0];
      const taskTitle = task[1];
      const taskDescription = task[2];
      const taskDone = task[3];
      const taskCreated = task[4];

      let taskElement = `
      <div class="card bg-dark rounded-0 mb-2">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span class="text-secondary">${taskTitle}</span>
          <div class="form-check form-switch">
            <input class="form-check-input" data-id="${taskId}" type="checkbox" ${
        taskDone && 'checked'
      } onchange="App.toggleDone(this)" />
          </div>
        </div>
        <div class="card-body">
        <span class="text-secondary">${taskDescription}</span>
          <p class="text-primary"> Task was created ${new Date(
            taskCreated * 1000
          ).toLocaleString()}</p>
        </div>
      
      
      </div>
      
      `;

      html += taskElement;
    }
    document.getElementById('tasklist').innerHTML = html;
  },

  toggleDone: async (element) => {
    const taskId = element.dataset.id;

    await App.tasksContract.toggleDone(taskId, {
      from: App.account
    });
  }
};
