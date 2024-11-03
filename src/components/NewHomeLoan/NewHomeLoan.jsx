import './NewHomeLoan.css'
import { useEffect, useState } from 'react'
import BreakDownResults from '../BreakdownResults/BreakDownResults';

export default function NewHomeLoan(){
    const [homePrice, setHomePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [downPaymentAmt, setDownPaymentAmt] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanType, setLoanType] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [breakDownFor, setBreakDownFor] = useState(0);
  let totalInterestWithoutExtra = 0;
  let totalInterestWithExtra = 0;
  const [breakDown, setBreakDown] = useState([]);
  const [interestSaved, setInterestSaved] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);
  const [hoa, setHoa] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [tax, setTax] = useState(0);
  //const [worthDisplayText, setWorthDisplayText] = useState('');
  
  useEffect(() => {
    setDownPaymentAmt(homePrice/100*downPayment);
  }, [homePrice, downPayment]);


  const handlehomePriceChange = (Event) => {
    setHomePrice(Event.target.value);
  }

  const handleDownPaymentChange = (Event) => {
    setDownPayment(Event.target.value);
  }

  const handleDownPaymentAmtChange  = (Event) => {
    setDownPaymentAmt(Event.target.value);
  }

  const handleInterestRateChange = (Event) => {
    setInterestRate(Event.target.value);
  }

  const handleLoanTypeChange = (Event) => {
    setLoanType(Event.target.value);
  }

  const handleExtraPayment = (Event) => {
    setExtraPayment(Event.target.value);
  }

  const handleBreakDownFor = (Event) => {
    setBreakDownFor(Event.target.value);
  }

  const handlehoaChange = (Event) => {
    setHoa(Event.target.value);
  }

  const handleInsuranceChange = (Event) => {
    setInsurance(Event.target.value);
  }

  const handleTaxChange = (Event) => {
    setTax(Event.target.value);
  }

  const monthlyPaymentCal = (principal, monthlyInterestRate,numberOfPayments) => {
    return principal* (monthlyInterestRate * Math.pow(1+monthlyInterestRate,numberOfPayments))/(Math.pow(1+monthlyInterestRate,numberOfPayments)-1);
  }

  const breakdownWithoutExtra = (monthlyInterestRate, balance, monthlyPaymentResults,extra) => {
    let totalMonthlyPayment = parseFloat(monthlyPaymentResults) + parseFloat(extra);
    const brkDownArray = [];
    let year = 1;
    let monthofYear = 0;
    for(let month = 1; month <= breakDownFor; month ++){
      if(balance > 0){
        if(monthofYear == 12){
          year ++;
        }
        if(monthofYear == 12){
          monthofYear = 1;
        }else{
          monthofYear++;
        }
        
        let interest = balance * monthlyInterestRate;
        let principal = totalMonthlyPayment - interest;
        balance -= principal;
        
        if(extra != 0){
          totalInterestWithExtra+=interest;
        }else{
          totalInterestWithoutExtra+=interest;
        }
        
        brkDownArray.push({month: monthofYear,
                            year: year,
                            interestPaid: parseFloat(interest).toFixed(2),
                            principalPaid: parseFloat(principal).toFixed(2),
                            PrincipalLeft : parseFloat(balance).toFixed(2)
                          })
        }else{
          break;
        }
        if(extra != 0){
          setInterestPaid(totalInterestWithExtra.toFixed(2));
        }else{
          setInterestPaid(totalInterestWithoutExtra.toFixed(2));
        }
      }
      
    return brkDownArray;
  }

  const savedInInterest = (totalWith, totalWithout) => {
    return totalWithout - totalWith;
  }


  const calculate = () =>{
    let principal = homePrice - ((homePrice/100) * downPayment);
    let monthlyInterestRate = (interestRate/100)/12;
    let numberOfPayments = loanType*12;
    let monthlyPaymentResults = monthlyPaymentCal(principal,monthlyInterestRate,numberOfPayments).toFixed(2);
    
    
    setMonthlyPayment(parseFloat(monthlyPaymentResults) + parseFloat(extraPayment) + parseFloat(tax) + parseFloat(hoa) + parseFloat(insurance));
    
    setBreakDown(breakdownWithoutExtra(monthlyInterestRate,principal, monthlyPaymentResults,0));
    if(extraPayment != 0){
      setBreakDown(breakdownWithoutExtra(monthlyInterestRate,principal, monthlyPaymentResults,extraPayment));
      setInterestSaved(savedInInterest(parseFloat(totalInterestWithExtra),parseFloat(totalInterestWithoutExtra)));
    }else{
      setInterestSaved(0);
    }

    
    
  }

  // const worthExtraPayment = () => {
  //   setWorthDisplayText('Under Construction. Please check back later');
  // }

  return (
    <div>
      <h1>Home Loan BreakDown</h1>
      <div className='separator'></div>
    <div className='allOfIt'>
      
      <div className='inputForm'>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Home Price</label><br/>
          <div className='inputFieldArea'><input className='inputField' id = 'homePrice' type="number" name="homePrice" value = {homePrice} onChange={handlehomePriceChange}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Down Payment</label><br/>
          <div className='inputFieldArea'><input className='inputField' type="number" name="downPayment" value = {downPayment} onChange={handleDownPaymentChange}/></div>
          <div className='inputFieldArea'><input className='inputField'  type="number" name="downPaymentAmt" value = {downPaymentAmt} onChange={handleDownPaymentAmtChange}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Interest Rate</label><br/>
          <div className='inputFieldArea'><input className='inputField'  type="number" name="interestRate" value = {interestRate} onChange={handleInterestRateChange}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Loan Term</label><br/>
          <div className='inputFieldArea'><input className='inputField'  type="number" name="loanType" value = {loanType} onChange={handleLoanTypeChange}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>HOA</label><br/>
          <div className='inputFieldArea'><input className='inputField' type="number" name="hoa" value = {hoa} onChange={handlehoaChange}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Property Tax</label><br/>
          <div className='inputFieldArea'><input className='inputField' type="number" name="tax" value = {tax} onChange={handleTaxChange}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Homeowners Insurance</label><br/>
          <div className='inputFieldArea'><input className='inputField' type="number" name="insurance" value = {insurance} onChange={handleInsuranceChange}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Extra Payment</label><br/>
          <div className='inputFieldArea'><input className='inputField'  type="number" name="extraPayment" value = {extraPayment} onChange={handleExtraPayment}/></div><br/>
        </div>
        <div className = 'fieldGroup'>
          <label className='inputLabel'>Number of months to Break Down</label><br/>
          <div className='inputFieldArea'><input className='inputField' type="number" name="breakDownFor" value = {breakDownFor} onChange={handleBreakDownFor}/></div><br/>
        </div>
        <div className='buttonGroup'>
          <button className='customButton' onClick={calculate}>Calculate</button>
        </div>
      </div>
      
      <div className='breakdownTable'>
      <BreakDownResults monthlyPayment={monthlyPayment} breakDown={breakDown} interestPaid = {interestPaid} interestSaved = {interestSaved}/>
      
      </div>
      </div>
    </div>
    
  )
}
