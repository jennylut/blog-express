var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/resModel') 

router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const loginCheckResult = loginCheck(req)
        // if(req.query.isadmin){
        //     // admin auth
        //     if(loginCheckResult){
        //         // 未登录
        //         return loginCheckResult
        //     }
        //     // 查询自己的博客
        //     author = req.session.username
        // }

        // const listData = {}
        // return new SuccessModal(listData)

        const result = getList(author,keyword)
        return result.then(listData=>{
            res.json(new SuccessModal(listData)) 
        })
});
router.get('/detail', function(req, res, next) {
    res.json({
        errno:0,
        data:'detail ok'
    })
  });

module.exports = router;
