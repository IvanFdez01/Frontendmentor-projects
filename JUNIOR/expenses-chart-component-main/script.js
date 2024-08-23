
/* ========= CALCULATE CHART HEIGHT =========*/
// first, we need to collect the seven values from JSON
// then, obtain the larger
// finally, adapt the height to that max height + 20% for the hover info

let dom_days = []; // bars
let dom_am = [];  // amount divs
let jsonobj;
async function fetchData() {
    try {
        let response = await fetch('data.json');
        jsonobj = await response.json();
        updateUI(jsonobj);
        setListeners(jsonobj);
    } catch (error) {
        console.error('Error:', error);
    }
}
// main call
fetchData();

function updateUI(data) {
    let total = 0;
    let max_h = 0;
    // max_h (number in 0-6): day on which the amount is the highest
    // dom_days: array with the div elements of the red vertical bars
    for (let day in data) {
        let dayname = data[day].day;
        let dayamount = data[day].amount;
        max_h = dayamount > data[max_h].amount ? day : max_h;
        dom_days[day] = document.getElementById(dayname);
        total += dayamount;
        // set hover amounts
        const am = document.getElementById('amount-' + dayname); 
        am.innerHTML = "&dollar;" + dayamount;
        dom_am[day] = am;
    }
    // paint cyan and set total amount
    dom_days[max_h].classList.add('val-max-light');
    document.getElementById('highlight2').innerHTML = "&dollar;" + total;
    // now to adjust all bars height to the max one, 
    // let data[max_h].amount <-> 10rem, then by rule of three obtain the heights
    // (10rem is arbitrary, related to the chart height of 14rem)
    for (let bar in dom_days) {
        const dayval = data[bar].amount * 10 / data[max_h].amount;
        dom_days[bar].style.height = dayval + "rem";
    }
}

/* ========= CLICK/HOVER BARS -> DISPLAY VALUE  =========*/

function setListeners(data) {
    let clicked = -1; // number of dom bar clicked (-1 if no one)
    for (let bar in dom_days) {
        const b = dom_days[bar], am = dom_am[bar];
        b.addEventListener('mouseover', function() {
            visible(am, b);
        });
        b.addEventListener('mouseout', function() {
            if (clicked !== bar)
                invisible(am, b);
        });
        b.addEventListener('click', function() {
            // if it's displaying then remove, if not then display
            if (clicked === bar) {
                clicked = -1;
                invisible(am, b);
            } else {
                if (clicked !== -1)
                    invisible(dom_am[clicked], dom_days[clicked]);
                clicked = bar;
                visible(am, b);
            }
        });

    }

}

// bar: bar dom element
// am: amount dom element
// b: true if the element is being displayed because of a click
//    b is needed to protect invisible call from mouseout
function visible(am, bar) {
    am.classList.remove('amount-invisible');
    am.classList.add('amount-visible');
    bar.classList.add('bar-hover');
}

function invisible(am, bar) {
    am.classList.remove('amount-visible');
    am.classList.add('amount-invisible');
    bar.classList.remove('bar-hover');
}


/* ========= LIGHTNESS MODES ==========*/
/* ========= DARK-MODE BUTTON =========*/ 

let mode = 1; // dark: 0, light: 1
const mode_b = document.getElementById('dark-mode-button');
mode_b.addEventListener('click', function() {
    // change lightness mode
    const affected = ['body', 'attr', 'circumf' , 'circle',
        'header-cont', 'chart-cont', 'highlight1', 'highlight2', 'highlight3',
        'sep'
    ];
    const mode_text = document.getElementById('mode');

    if (mode === 1) {       // DARK MODE
        mode = 0;
        mode_text.textContent = "dark mode";
        for (let i = 0; i < affected.length; i++) {
            const name = affected[i];
            const ref = document.getElementById(name);
            ref.classList.remove(name + '-light');
            ref.classList.add(name + '-dark');
        }
        // bars
        for (let bar in dom_days) {
            let l = dom_days[bar].classList;
            if (l.contains('val-max-light')) {
                l.remove('val-max-light');
                l.add('val-max-dark');
            } else {
                l.remove('val-light');
                l.add('val-dark');
            }
            let s = dom_am[bar].classList;
            s.remove('am-light');
            s.add('am-dark');
        }
        
    } else {                // LIGHT MODE
        mode = 1;
        mode_text.textContent = "light mode";
        for (let i = 0; i < affected.length; i++) {
            const name = affected[i];
            const ref = document.getElementById(name);
            ref.classList.remove(name + '-dark');
            ref.classList.add(name + '-light');
        }
        // bars
        for (let bar in dom_days) {
            let l = dom_days[bar].classList;
            if (l.contains('val-max-dark')) {
                l.remove('val-max-dark');
                l.add('val-max-light');
            } else {
                l.remove('val-dark');
                l.add('val-light');
            }
            let s = dom_am[bar].classList;
            s.remove('am-dark');
            s.add('am-light');
        }
    }
});


