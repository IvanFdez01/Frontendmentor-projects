
/*========== Functions for inputs-text ==========*/ 

function onfocus(inputs, n) {
    const ref = inputs.get(n);
    ref.get('input').addEventListener('focus', function() {
        ref.get('icon').classList.remove('iconerror'); /* if applies */ 
        ref.get('icon').classList.add('iconfocus');
    })
}

function onblur(inputs, n) {
    const ref = inputs.get(n);
    ref.get('input').addEventListener('blur', function() {
        ref.get('icon').classList.remove('iconfocus');
        onerror(inputs, n);
    })
}

function onerror(inputs, n) {
    const ref = inputs.get(n);
    if(ref.get('input').value === '') {
        ref.get('input').classList.add('inputerror');
        ref.get('icon').classList.add('iconerror');
        ref.get('err').classList.add('error-active');
    } else {
        ref.get('input').classList.remove('inputerror');
        ref.get('icon').classList.remove('iconerror');
        ref.get('err').classList.remove('error-active');
    }
}

/*========== Main map ==========*/ 
const inputs = new Map();

/*========== Mortgage Amount ==========*/ 
const c0 = new Map();
c0.set('input', document.getElementById('am-input'));
c0.set('icon', document.getElementById('GBP'));
c0.set('err', document.getElementById('error1'));

/*========== Mortgage Term ==========*/ 
const c1 = new Map();
c1.set('input', document.getElementById('term-input'));
c1.set('icon', document.getElementById('years'));
c1.set('err', document.getElementById('error2'));

/*========== Interest rate ==========*/ 
const c2 = new Map();
c2.set('input', document.getElementById('interest-input'));
c2.set('icon', document.getElementById('percentage'));
c2.set('err', document.getElementById('error3'));

inputs.set(0, c0);
inputs.set(1, c1);
inputs.set(2, c2);


for (let i = 0; i < 3; i++) {
    onfocus(inputs, i);
    onblur(inputs, i);
    onerror(inputs, i);
}
    

/*========== Mortgage Type Input-radios ==========*/ 

const repayment_button = document.getElementById('repayment-button');
const repayment_check = document.getElementById('repayment-check');
const interestonly_button = document.getElementById('interestonly-button');
const interestonly_check = document.getElementById('interestonly-check');

repayment_button.addEventListener('click', function() {
    activate_typebutton(repayment_button, repayment_check);
    deactivate_typebutton(interestonly_button, interestonly_check);
});

interestonly_button.addEventListener('click', function() {
    activate_typebutton(interestonly_button, interestonly_check);
    deactivate_typebutton(repayment_button, repayment_check);
});

function activate_typebutton(b, circle) {
    b.classList.add('type-button-clicked');
    circle.checked = true;
}

function deactivate_typebutton(b, circle) {
    b.classList.remove('type-button-clicked');
    circle.checked = false;
}

/*========== Clear all button ==========*/ 

const clear = document.getElementById('clearall');

clear.addEventListener('click', function() {
    for (let i = 0; i < 3; i++) {
        inputs.get(i).get('input').value = '';
        onerror(inputs, i);
    }
    deactivate_typebutton(repayment_button, repayment_check);
    deactivate_typebutton(interestonly_button, interestonly_check);
});

/*========== RIGHT SIDE ==========*/ 

const card1 = document.getElementById('waiting-container'); 
const card2 = document.getElementById('filled-container'); 

card2.classList.add('container-inactive');

const calculate_button = document.getElementById('calculate');

calculate_button.addEventListener('click', function() {
    let isN = true;
    const values = [
        inputs.get(0).get('input').value,
        inputs.get(1).get('input').value,
        inputs.get(2).get('input').value];
    // from strings to numbers on ENG-System (might be NaN)
    const amount = parseFloat(values[0].replace(/,/g, ''));
    const term = parseFloat(values[1].replace(/,/g, ''));
    const interest = parseFloat(values[2].replace(/,/g, ''));
    { // check if inputs are all numbers and there's a type selected
        isN = !isNaN(amount) && !isNaN(term) && !isNaN(interest);
        isN = isN && (repayment_check.checked || interestonly_check.checked);
    }
    if (isN) {
        card1.classList.add('container-inactive');
        card2.classList.remove('container-inactive');
        calculate_repayment(amount, term, interest);
    } else {
        alert('Select a Mortgage Type and ensure the fields are numeric.');
    }
});

function calculate_repayment(amount, term, interest) {
    const interestrate = (interest / 100) / 12;
    const npayments = term * 12;
    const monthly = (amount * interestrate * ((1 + interestrate)** npayments)) / 
                    (((1 + interestrate)** npayments) - 1);
    const total = monthly * npayments;

    // change html elements
    updatehtml(document.getElementById('monthlyval'), monthly);
    updatehtml(document.getElementById('termval'), total);

    function updatehtml(ref, val) {
        let str = ref.textContent;
        str = str.substring(1, str.length);
        { 
            // fixed: truncate decimals and returns string, 
            // parseFloat: again to number
            // toLocaleString: converts to ENG-System 
            str += parseFloat(val.toFixed(2)).toLocaleString('en-US');
        }
        ref.textContent = str;
    }
}

function calculate_interestonly(amount, term, interest) {

}
