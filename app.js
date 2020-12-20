//Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
    //Hide Results
    document.querySelector('#results').style.display = "none";
    
    //Show Loader
    document.querySelector('#loading').style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Function to calculate results
function calculateResults(){
    console.log('calculating...');

    //UI Vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    //Formulas for calculations
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    //To check if the monthly value is a finite number
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //Show Results
        document.querySelector('#results').style.display = "block";

        //Hide Loader
        document.querySelector('#loading').style.display = "none";
    }else{
        showError("Please check your numbers, there's a wrong input somewhere.");
    };

   
};

//Show Error Function
function showError(error){
    //Hide Results
    document.querySelector('#results').style.display = "none";

    //Hide Loader
    document.querySelector('#loading').style.display = "none";

    //Create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class 
    errorDiv.className = 'alert alert-danger';

    //Create Text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3500);
};

//Clear Error
function clearError(){
document.querySelector('.alert').remove();
};