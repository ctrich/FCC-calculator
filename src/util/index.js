export const getNumber = (state, action) => {
  if (state.isChained && !state.operator) {
    return {
      firstNum: action.payload,
      isChained: false,
      secondNum: 0,
      lastDigitIsOperator: false,
      negativeNumber: false
    };
  }
 
  if (!state.operatorl && !state.isChained) {
    if (state.firstNum.length >= 15) {
      return state;
    }
    if (state.firstNum === 0) {
      return { firstNum: action.payload, lastDigitIsOperator: false };
    }
    if (state.firstNum === "0" && action.payload === "0") {
      return state;
    }
    return {
      firstNum: `${state.firstNum}${action.payload}`,
      lastDigitIsOperator: false
    };
  }
  if (state.secondNum.length >= 15) {
    return state;
  }
  if (state.secondNum === 0 && state.negativeNumber) {
    return {
      secondNum: -action.payload,
      lastDigitIsOperator: false,
      negativeNumber: false
    };
  }
  if (state.secondNum === 0) {
    return { secondNum: action.payload, lastDigitIsOperator: false };
  }
  if (state.secondNum === "0" && action.payload === "0") {
    return state;
  }
  return {
    secondNum: `${state.secondNum}${action.payload}`,
    lastDigitIsOperator: false
  };
};

export const checkDecimal = state => {
  if (state.operator === null && !state.isChained) {
    if (/^\d+\.(\d+)?$/.test(state.firstNum)) {
      return state;
    }
    return { firstNum: `${state.firstNum}.`, lastDigitIsOperator: false };
  }
  if (/^\d+\.(\d+)?$/.test(state.secondNum)) {
    return state;
  }
  return { secondNum: `${state.secondNum}.`, lastDigitIsOperator: false };
};

export const result = state => {
  if (state.lastDigitIsOperator && state.operator === "-") {
    return {
      firstNum: +state.firstNum - +state.secondNum,
      secondNum: 0,
      operator: null,
      isChained: true
    };
  }
  if (state.operator === "+") {
    return {
      firstNum: +state.firstNum + +state.secondNum,
      secondNum: 0,
      operator: null,
      isChained: true
    };
  } else if (state.operator === "-") {
    return {
      firstNum: +state.firstNum - +state.secondNum,
      secondNum: 0,
      operator: null,
      isChained: true
    };
  } else if (state.operator === "*") {
    return {
      firstNum: +state.firstNum * +state.secondNum,
      secondNum: 0,
      operator: null,
      isChained: true
    };
  } else if (state.operator === "/") {
    return {
      firstNum: +state.firstNum / +state.secondNum,
      secondNum: 0,
      operator: null,
      isChained: true
    };
  }
  return state;
};

export const getOperator = (state, action) => {
  if (state.isChained && state.lastDigitIsOperator && action.payload === "-") {
    return {
      negativeNumber: true,
      isChained: false
    };
  }
  if (state.isChained) {
    return {
      ...result(state),
      operator: action.payload,
      lastDigitIsOperator: true,
      negativeNumber: false
    };
  }
  return {
    operator: action.payload,
    isChained: true,
    lastDigitIsOperator: true,
    negativeNumber: false
  };
};
