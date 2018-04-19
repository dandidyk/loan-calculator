
document.getElementById('loan-form').addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById('loading').style.display = 'block';

    setTimeout( () => {
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        calculateLoan();
        
    }, 700)

});

function calculateLoan (e) {
    

    // UI variables 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const amountValue = +amount.value;
    const calculatedInterest = +interest.value / 100 / 12;
    const calculatedPayments = +years.value * 12; 

    // compute 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (amountValue * x * calculatedInterest)/ (x - 1);
    clearError();

    if ( isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - amountValue).toFixed(2);
    } else {
         showError('Please check your number');
         document.getElementById('results').style.display = 'none';
    }

}

function showError( error) {


    


    const errorEL = document.createElement('div');
    errorEL.className = 'alert alert-danger';
    errorEL.textContent = error;

    document.querySelector('.heading').parentElement.insertBefore(
        errorEL,
        document.querySelector('.heading'));
}

function clearError () {
    if ( document.querySelector('.alert-danger') ) {
        document.querySelector('.alert-danger').remove();
     }
}