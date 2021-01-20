const url = '';
const submit = document.getElementById('submit')

var app = new Vue({
    el: '#app',
    data: {
        title: 'Contact Form',
        name: {
            error: false,
            errorMessage: '',
            value: ''
        },
        email: {
            error: false,
            errorMessage: '',
            value: ''
        },
        content: {
            error: false,
            errorMessage: '',
            value: ''
        },
        toast: '',
        errors: ['Required field', 'Prohibited character detected', 'Invalid email address'],
        errorCount: 0
    },
    methods: {
        checkform() {
            this.clearErrors();
            if (!this.name.value) {
                this.name.error = true;
                this.name.errorMessage = this.errors[0];
                this.errorCount++;
            } else if (!this.validName(this.name.value)) {
                this.name.error = true;
                this.name.errorMessage = this.errors[1];
                this.errorCount++;
            }
            if (!this.email.value) {
                this.email.error = true;
                this.email.errorMessage = this.errors[0];
                this.errorCount++;

            } else if (!this.validEmail(this.email.value)) {
                this.email.error = true;
                this.email.errorMessage = this.errors[2];
                this.errorCount++;
            }
            if (!this.content.value) {
                this.content.error = true;
                this.content.errorMessage = this.errors[0];
                this.errorCount++;

            }
            if (this.errorCount === 0) {
                this.submit();
            }
        },
        validName(name) {
            var re = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/; // needs refined
            return re.test(name);  
        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);  
        },
        clearErrors() {
            this.errorCount = 0;
            this.name.error = false;
            this.name.errorMessage = '';
            this.email.error = false;
            this.email.errorMessage = '';
            this.content.error = false;
            this.content.errorMessage = '';
        },
        submit() {
            app.toast = 'Sending';
            submit.disabled; // Doesn't work
        
            const payload = {
                name: app.name.value,
                email: app.email.value,
                content: app.content.value.replace(/[|&;$%@"<>()+,]/g, '') // Strips out too much
            }
            post(url, payload, function (err,res)  {
                if (err) { 
                    console.error(err)
                    return error(err) 
                }
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
    app.toast = 'Thanks for the message. We will get back to you shortly.'
    setTimeout(() => {
        app.toast = '';
        submit.disabled = false;
    }, 2000);
    app.name.value = '';
    app.email.value = '';
    app.content.value = '';
}
function error (err) {
    app.toast = 'There was a problem submitting your message.';
    submit.disabled = false;
    console.error(err);
}

