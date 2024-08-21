const NERRORS = 6;

/* ========== QUERY TYPE ========== */ 

const general_enq = document.getElementById('query-left-cont');
const support_req = document.getElementById('query-right-cont');
const lradio = document.getElementById('query-left-radio');
const rradio = document.getElementById('query-right-radio');

general_enq.addEventListener('click', function() {
    general_enq.classList.add('query-clicked');
    support_req.classList.remove('query-clicked');
    lradio.checked = true;
    rradio.checked = false;
});

support_req.addEventListener('click', function() {
    support_req.classList.add('query-clicked');
    general_enq.classList.remove('query-clicked');
    lradio.checked = false;
    rradio.checked = true;
});


/* ========== ERRORS (from SUBMIT clicked) ========== */ 

const error_msgs = [
    "This field is required",
    "This field is required",
    "Please enter a valid email address",
    "Please select a query type",
    "This field is required",
    "To submit this form, please consent to be contacted"
];

// map with html-elements (paragraphs): err0, err1,...
const dom_err_map = new Map();
for (let i = 0; i < error_msgs.length; i++) {
    dom_err_map.set(i, document.getElementById('err' + i));
}

const inputs_ids = [
    'fn-input',
    'ln-input',
    'email-input',
    'msg-input',
    'consent-check'
];

// map with the inputs' references
const inputs_map = new Map();
for (let i = 0, n = 0; i < inputs_ids.length; i++, n++) {
    if (i === 3) n++;
    inputs_map.set(n, document.getElementById(inputs_ids[i]));
}

const alert = document.getElementById('alert');
alert.classList.remove('alert-visible');

const submit_b = document.getElementById('submit-button');
submit_b.addEventListener('click', function() {
    remove_errors();
    let success = true;
    let detected_err = [];

    success = validate_inputs(detected_err);

    if (success) {
        // show success alert
        alert.classList.add('alert-visible');
        setTimeout(function() {
            alert.classList.remove('alert-visible');
        }, 2000);
    } else {
        // show errors: red borders and messages)
        for (let i = 0; i < detected_err.length; i++) {
            let n = detected_err[i];
            dom_err_map.get(n).textContent = error_msgs[n];
            if (n !== 3) // bc query-type-buttons (3) dont have this error feature
                inputs_map.get(n).classList.add('input-error');
        }
    }

    function validate_inputs(arr) {
        let b = true;
        // FIRST NAME: not empty
        if (inputs_map.get(0).value === '') {
            b = false;
            arr.push(0);
        }
        // LAST NAME: not empty
        if (inputs_map.get(1).value === '') {
            b = false;
            arr.push(1);
        }
        // EMAIL: format aaa@bbb.ccc
        const reg_ex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!reg_ex.test(inputs_map.get(2).value)) {
            b = false;
            arr.push(2);
        }
        if (inputs_map.get(2).value)
        // QUERY TYPE: one selected
        if (!lradio.checked && !rradio.checked) {
            b = false;
            arr.push(3);
        }
        // MESSAGE: not empty
        if (inputs_map.get(4).value === '') {
            b = false;
            arr.push(4);
        }
        // CONSENT: checked
        if (!inputs_map.get(5).checked) {
            b = false;
            arr.push(5);
        }

        return b;
    }
});

function remove_errors() {
    for (let i = 0; i < NERRORS; i++) {
        dom_err_map.get(i).textContent = '';
        if (i != 3)
            inputs_map.get(i).classList.remove('input-error');
    }   
}


