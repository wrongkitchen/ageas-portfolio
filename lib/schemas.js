Schemas = {};

SimpleSchema.messages({
    "PasswordNotMatch": "Password not match"
});

Schemas.User = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email
    },
    phoneNumber: {
        type: Number,
        label: "Phone Number",
        min: 0
    },
    password: {
        type: String,
        label: "Password",
        blackbox: true,
        autoform: {
            afFieldInput: {
                type: "password"
            }
        },
        custom: function(){
            if(this.field('rePassword').value != this.value){
                return 'PasswordNotMatch'
            }
        }
    },
    rePassword: {
        type: String,
        label: "Re-enter password",
        blackbox: true,
        autoform: {
            afFieldInput: {
                type: "password"
            }
        }
    }
});