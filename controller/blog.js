const xss  = require('xss')
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}' `
    return exec(sql).then(rows => {
        return rows[0]
    })
}

// add blog
const newBlog = (blogData ={}) => {

    const title = xss(blogData.title)
    const content = xss(blogData.content)
    console.log('title----',title)
    const author = blogData.author
    const createtime = Date.now()
    const sql = ` insert into blogs (title, content, createtime, author) 
    values ('${title}', '${content}', ${createtime}, '${author}');`
    return exec(sql).then(insertData =>{
        return {
            id:insertData.insertId
        }
    })
}

// update blog
const updateBlog = (id,blogData={}) => {
    const { title,content,author } = blogData
    const sql = ` update blogs set title='${title}', content='${content}' where id='${id}'`
    
    return exec(sql).then(updateData=>{
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

// delete blog

const deleteBlog = (id,author) => {
    // console.log('id---',id)
    const sql = `delete from blogs where id='${id}' and author= '${author}';`
    return exec(sql).then(delData=>{
        console.log('delData---',delData)
        if(delData.affectedRows > 0) {
            return true
        }
        return false
    })
    //return true // delete success
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}