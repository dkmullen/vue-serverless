const url = ''
const submit = document.getElementById('submit')

var app = new Vue({
    el: '#app',
    data: {
        form: {
            title: 'Contact Form',
            name: '',
            email: '',
            message: '',
            toast: ''
        } 
    },
    methods: {
        submit() {
            app.form.toast = 'Sending';
            submit.disabled; // Doesn't work
        
            const payload = {
                name: app.form.name,
                email: app.form.email,
                message: app.form.message
            }
            post(url, payload, function (err,res)  {
                if (err) { return error(err) }
                success()
            })
        }
    }
})

function post(url, body, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function() {
        if (req.status < 400) {
            callback(null, JSON.parse(req.responseText));
        } else {
            callback(new Error('Request failed: ' + req.statusText));
        }
    });
    req.send(JSON.stringify(body));
}
function success() {
    app.form.toast = 'Thanks for the message. We will get back to you shortly.'
    setTimeout(() => {
        app.form.toast = '';
        submit.disabled = false;
    }, 2000);
    app.form.name = '';
    app.form.email = '';
    app.form.message = '';
}
function error (err) {
    app.form.toast = 'There was a problem submitting your message.';
    submit.disabled = false;
    console.log(err);
}

