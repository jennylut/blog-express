var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../model/resModel') 

router.post('/login', function(req, res, next) {
    const { username,password } = req.body
    const result = login(username,password)
    return result.then(data=>{
        if(data.username){
            // res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpire()}`)
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname

            console.log('req.session',req.session)

            res.json(new SuccessModal())
            return 
        }
        res.json(new ErrorModal('login error'))
    
    })
});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: '已登录'
        })
        return
    }
    res.json({
        errno: -1,
        msg: '未登录'
    })
})

module.exports = router;
