var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/resModel') 
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function(req, res, next) {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const loginCheckResult = loginCheck(req)
        if(req.query.isadmin){
            if(req.session.username === null) {
              res.json(new ErrorModal('未登录'))
              return
            }
            // 强制查询自己的博客
            author = req.session.username
        }
        const result = getList(author,keyword)
        return result.then(listData=>{
            res.json(new SuccessModal(listData)) 
        })
});
router.get('/detail',(req, res, next)=> {
        if(req.session.username === null){
            // 未登录
            res.json(new ErrorModal('未登录'))
            return
        }
        const result = getDetail(req.query.id)
        return result.then(data=>{
          res.json(new SuccessModal(data)) 
        })
  });

  router.post('/new',loginCheck, (req, res, next)=> {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      res.json(new SuccessModal(data)) 
    })
});

router.post('/update',loginCheck, (req, res, next)=> {

  req.body.author = req.session.username
  const result = updateBlog(req.query.id,req.body)
  return result.then(data => {
    res.json(new SuccessModal(data)) 
  })
});

router.post('/delete',loginCheck, (req, res, next)=> {
  
 req.body.author = req.session.username

  const result = deleteBlog(req.query.id,req.body.author)
  return result.then(data => {
    if(data) {
      res.json(new SuccessModal(data)) 
    }else{
        return res.json(new ErrorModal('delete error'))
    }
})
});

module.exports = router;
