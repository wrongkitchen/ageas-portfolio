Schemas = {};

SimpleSchema.messages({
    "PasswordNotMatch": "Password not match"
});

Schemas.User = new SimpleSchema({
    name: {
        type: String,
        label: "英文姓名：",
        max: 200
    },
    email: {
        type: String,
        label: "登記電郵：",
        regEx: SimpleSchema.RegEx.Email
    },
    phoneNumber: {
        type: String,
        label: "登記電話號碼：",
        min: 0
    },
    password: {
        type: String,
        label: "密碼：",
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
        label: "再輸入密碼：",
        blackbox: true,
        autoform: {
            afFieldInput: {
                type: "password"
            }
        }
    }
});