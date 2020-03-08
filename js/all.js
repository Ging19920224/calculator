new Vue({
  el:'#app',
  data:{
    process: '',          //運算過程
    valueArray: [],       //算式數值
    isFloat: false,       //是否有小數
    inputNumber: {        //輸入的按鈕
      value: '',          //按鈕的值
      status: 'number'    //按鈕的狀態
    },
    actionMode:'',        //運算模式
    button:[              //按鈕資料
      { 
        number: '7',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '8',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '9',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '÷',
        isSquare: true,
        type: 'except'
      },
      { 
        number: '4',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '5',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '6',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '×',
        isSquare: true,
        type: 'multiply'
      },
      { 
        number: '1',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '2',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '3',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '+',
        isSquare: true,
        type: 'add'
      },
      { 
        number: '0',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '00',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '.',
        isSquare: false,
        type: 'number'
      },
      { 
        number: '-',
        isSquare: true,
        type: 'less'
      },
      { 
        number: 'AC',
        isSquare: false,
        type: 'clear'
      },
      { 
        number: '⌫',
        isSquare: false,
        type: 'back'
      },
    ]
  },
  methods: {
    input(number, type) {
      const vm = this;
      if (number === '.') { 
        if (vm.isFloat) return
        else vm.isFloat = true 
      }
      switch (type) {
        case 'number':
          if (vm.filter > 99999999) return;
          if (!vm.lengthCheck) {
            if (vm.inputNumber.status !== 'number') {
              vm.inputNumber.value = '';
              vm.inputNumber.status = 'number';
            }
            if (vm.actionMode === 'result') vm.valueArray = [];
            vm.inputNumber.value += number;
          }
          break
        case 'add':
          vm.isFloat = false;
          if (vm.inputNumber.status === 'Operator') {
            vm.actionMode = 'add';
            vm.updateOperator(vm.actionMode);
          } else {
            vm.resetProcess(number);
            if (vm.valueArray.length === 2) vm.compute();
            vm.actionMode = 'add';
          }
          break
        case 'less':
          vm.isFloat = false;
          if (vm.inputNumber.status === 'Operator') {
            vm.actionMode = 'less';
            vm.updateOperator(vm.actionMode);
          } else {
            vm.resetProcess(number);
            if (vm.valueArray.length === 2) vm.compute();
            vm.actionMode = 'less';
          }
          break
        case 'multiply':
          vm.isFloat = false;
          if (vm.inputNumber.status === 'Operator') {
            vm.actionMode = 'multiply';
            vm.updateOperator(vm.actionMode);
          } else {
            vm.resetProcess(number);
            if (vm.valueArray.length === 2) vm.compute();
            vm.actionMode = 'multiply';
          }
          break
        case 'except':
          if (vm.inputNumber.status === 'Operator') {
            vm.actionMode = 'except';
            vm.updateOperator(vm.actionMode);
          } else {
            vm.resetProcess(number);
            if (vm.valueArray.length === 2) vm.compute();
            vm.actionMode = 'except';
          }
          break
        case 'clear':
          vm.valueArray = [];
          vm.process = '';
          vm.inputNumber.value = '';
          vm.inputNumber.status = 'number';
          vm.isFloat = false;
          break
        case 'back':
          let newArr = vm.inputNumber.value.split("");
          let length = newArr.length;
          newArr.splice(length-1, 1);
          let result = newArr.join('');
          vm.inputNumber.value = result;
          break
      }
    },
    resetProcess(number) {
      this.process += this.inputNumber.value;
      this.valueArray.push(this.inputNumber.value);
      this.inputNumber.value = '';
      this.inputNumber.status = 'Operator';
      this.process += number;
    },
    updateResult(result) {
      const vm = this;
      vm.inputNumber.value = result;
      vm.valueArray = [];
      vm.valueArray.push(result);
    },
    updateOperator(status) {
      let newStatus = '';
      switch (status) {
        case 'add':
          newStatus = '+';
          break
        case 'less':
          newStatus = '-';
          break
        case 'multiply':
          newStatus = '×';
          break
        case 'except':
          newStatus = '÷';
          break
      }
      const vm = this;
      let newArr = vm.process.split("");
      let length = vm.process.length;
      newArr.splice(length-1, 1);
      newArr.push(newStatus);
      let result = newArr.join(''); 
      vm.process = result;
    },
    arithmetic(type) {
      const vm = this;
      let result;
      switch (type) {
        case 'add':
          result = Number(vm.valueArray[0]).plus( Number(vm.valueArray[1]));
          break
        case 'less':
          result = Number(vm.valueArray[0]).minus(Number(vm.valueArray[1]));
          break
        case 'multiply':
          result = Number(vm.valueArray[0]).times(Number(vm.valueArray[1]));
          break
        case 'except':
          result = Number(vm.valueArray[0]).div(Number(vm.valueArray[1]));
          break
      }
      vm.updateResult(result);
    },
    result() {
      const vm = this;
      if(vm.actionMode === 'result') return;
      vm.compute();
      vm.process = '';
      vm.valueArray = [];
      vm.valueArray.push(vm.inputNumber.value);
      vm.actionMode = 'result';
      vm.isFloat = false;
    },
    compute() {
      const vm = this;
      let status = vm.actionMode;
      let number = vm.inputNumber.value;
      vm.resetProcess(number);
      switch (status) {
        case 'add':
          vm.arithmetic('add');
          break
        case 'less':
          vm.arithmetic('less');
          break
        case 'multiply':
          vm.arithmetic('multiply');
          break
        case 'except':
          vm.arithmetic('except');
          break
      };
    },
  },
  computed: {
    filter() {
      const vm = this;
      const n = vm.inputNumber.value + '';
      const num = n.split('.');
      let numArr = num[0].split('').reverse();
      let idx = 0;
      let returnArr = [];
      numArr.forEach((item) => {
        idx ++;
        if (idx > 3) {
          idx = 1;
          returnArr.push(',');
        }
        returnArr.push(item);
      })
      const resultFont = returnArr.reverse().join('');
      const result = resultFont + '.' + num[1];
      const resultFontFloat = resultFont + '.';
      if (num[1]) return result;
      if (vm.isFloat) {
        return resultFontFloat;
      } else {
        return resultFont;
      }
    },
    lengthCheck() {
      const vm = this;
      const length = vm.filter.length;
      if (length >= 10) {
        return true;
      } else {
        return false;
      }
    }
  },
})