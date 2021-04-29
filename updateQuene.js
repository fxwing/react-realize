// 链表结构
class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload;
    this.nextUpdate = nextUpdate;
  }
}

// 更新队列
class UpdateQuene {
  constructor() {
    this.baseState = null; // 原始状态
    this.firstUpdate = null; // 第一个更新
    this.lastUpdate = null; // 最后一个更新
  }
  // 往链表中插入update
  enqueneUpdate(update) {
    if (this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = update;
    } else {
      this.lastUpdate.nextUpdate = update; // 上次的最后一个的lastUpdate 指向新插入的update
      this.lastUpdate = update; // 将新插入的这个update设置为最后一个的lastUpdate,
    }
  };
  // 执行当前链表
  froceUpdate() {
    let currState = this.baseState || {};
    let currUpdate = this.firstUpdate;
    while (currUpdate) {
      let nextState =
        typeof currUpdate.payload === "function"
          ? currUpdate.payload(currState)
          : currUpdate.payload;
      currState = { ...currState, ...nextState };
      currUpdate = currUpdate.nextUpdate;
    }
    this.firstUpdate = this.lastUpdate = null; // 更新完成之后将链表清空
    this.baseState = currState;
    return currState;
  };
}

let quene = new UpdateQuene();
// 往队列里添加update
// setState({ name: "1" })
// setState({ name: "0" })
// setState((state) => ({ number: state.number + 1 })))
quene.enqueneUpdate(new Update({ name: "1" }));
quene.enqueneUpdate(new Update({ number: 0 }));
quene.enqueneUpdate(new Update((state) => ({ number: state.number + 1 })));
quene.enqueneUpdate(new Update((state) => ({ number: state.number + 2 })));
// 执行当前队列
quene.froceUpdate();


console.log(quene.baseState);

