import './BreakDownResults.css'
import PropTypes from 'prop-types';
import { formatDollarValue } from '../../utils';

export default function BreakDownResults({monthlyPayment, breakDown, interestPaid, interestSaved}){
    return(
        <div>
            <div className='details'>
                <label className='paymentDetails'>Money Saved in Interest Payments :</label> {formatDollarValue(interestSaved)}<br/>
                <label className='paymentDetails'>Interest Paid :</label> {formatDollarValue(parseFloat(interestPaid))}<br/>
                <label className='paymentDetails'>Monthly Payment :</label> {formatDollarValue(monthlyPayment)}<br/>
            </div>
            <div className='tableDiv'>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Interest</th>
                        <th>Principal</th>
                        <th>Loan Balance</th>
                    </tr>
                </thead>
                <tbody>
                {breakDown.map(data =>(
                    <tr key={data.month}>
                        <td>{data.year}</td>
                        <td>{data.month}</td>
                        <td>{formatDollarValue(parseFloat(data.interestPaid))}</td>
                        <td>{formatDollarValue(parseFloat(data.principalPaid))}</td>
                        <td>{formatDollarValue(parseFloat(data.PrincipalLeft))}</td>
                    </tr>
                )

                )}
                </tbody>
            </table>
            </div>    
        </div>
    );
}

BreakDownResults.propTypes = {
    monthlyPayment : PropTypes.number,
    interestPaid : PropTypes.number,
    interestSaved : PropTypes.number,
    breakDown : PropTypes.arrayOf(
        PropTypes.shape({
            month: PropTypes.number,
            interestPaid: PropTypes.number,
            principalPaid: PropTypes.number,
            PrincipalLeft: PropTypes.number,
          })
    ),
};

