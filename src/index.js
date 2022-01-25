import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';


class Menager extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      history:  [],
    };

    this.AddElement = this.AddElement.bind(this);
  }

  AddElement(value) {
    value = value.toString();
    this.state.history.push(value);
    this.setState({history: this.state.history})
    console.log(this.state.history);
  }

  
    
  render(){
    const current = this.state.history[this.state.history.length - 1]; 
    console.log(this.state.history.length);
    console.log(current);
    return(
        <Calculator current={current} AddElement={this.AddElement} history={this.state.history}/>
    );
  }
  
}


function Calculator(params) {

  const [u_field, setU_Field] = useState("");
  const [field, setField] = useState(params.current);
  const [isCalc, setCalc] = useState(false);
  const [calc_type, setCalc_Type] = useState("");


  function AddNumber(value) {
    if (!isCalc) {
      setField(value);
      setCalc(true);
      return;
    }
    setField(field+value);
  }

  useEffect(() => {
    setField(params.current);
  }, [params.current]);

  function DoCalc(value) {
    if (calc_type!="") {
      return;
    }
    setCalc_Type(value);
    if (field==""||field==undefined) {
      setU_Field("0");
      return;
    }
    setU_Field(field);
    setField("");
  }

  function Equal() {
    if (calc_type=="") {
      return;
    }
    let upper = parseFloat(u_field);
    let lower = parseFloat(field==""?1:field);
    
    let result;
    switch (calc_type) {
      case "+":
        result = upper + lower;
        break;
      case "-":
        result = upper - lower;
        break;
      case "*":
        result = upper * lower;
        break;
      case "/":
        result = upper / lower;
        break;
    }
    setCalc(false);
    setU_Field("");
    setCalc_Type("");
    params.AddElement(result);
  }

  function Adw(value) {
    if (field=="") {
      return;
    }
    if (value==0) {
      setField(Math.sqrt(field));
      return;
    }
    setField(Math.pow(field, 2))
    
  }

  function Delete() {
    console.log(field);
    if (field=="") {
      return;
    }

    if (field.length==1) {
      setField("");      
    }

    setField(field.substring(0,field.length-1));
    
  }

  function AddDot() {
    if (field==""||field==undefined) 
      return;

    if (field.includes(".")) {
      return;
    }

    AddNumber(".");
  }
  
  function ChooseHistory(value)
  {
    setField(params.history[value]);
  }

  function CE() {
    setField("");
    setU_Field("");
    setCalc_Type("");
    setCalc(false);
  }

  return(
    <div id='container'>
      

      <div id='calculator'>
        <div id='field'>
          <span id='upper_field'>{u_field + calc_type}<br></br></span>
          <span id='lower_field'>{field}</span>
          
        </div>
        <div id='sqrt' className='c_button' onClick={()=>Adw(0)}><i class="fas fa-square-root-alt"></i></div>
        <div id='pow' className='c_button' onClick={()=>Adw(1)}>x²</div>
        <div id='del' onClick={Delete}><i class="fas fa-backspace"></i></div>
        <div id='del' onClick={CE}>CE</div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("1")}>1</div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("2")}>2</div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("3")}>3</div>
        <div id='sqrt' className='c_button' onClick={()=>DoCalc("-")}><i class="fas fa-minus"></i></div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("4")}>4</div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("5")}>5</div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("6")}>6</div>
        <div id='sqrt' className='c_button' onClick={()=>DoCalc("*")}><i class="fas fa-times"></i></div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("7")}>7</div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("8")}>8</div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("9")}>9</div>
        <div id='sqrt' className='c_button' onClick={()=>DoCalc("/")}><i class="fas fa-divide"></i></div>
        <div id='sqrt' className='c_button' onClick={()=>AddNumber("0")}>0</div>
        <div id='sqrt' className='c_button' onClick={AddDot}>.</div>
        <div id='sqrt' className='c_button' onClick={()=>DoCalc("+")}><i class="fas fa-plus"></i></div>
        <div id='equal' className='c_button' onClick={Equal}><i class="fas fa-equals"></i></div>

      </div>
      <History ChooseHistory = {ChooseHistory} history={params.history}/>
    </div>
  )
}


function History(params) {
  
  return(
    <div id='history_box'>
      {params.history.map((step, index)=>{
        return <div className='history_field' onClick={()=>params.ChooseHistory(index)}>{step}</div>
      })}
    </div>
  )
}

ReactDOM.render(
  <Menager/>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
