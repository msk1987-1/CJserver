const db = require('../db/index')

exports.fundsAdd = (req, res) => {
    const fields = {}
    if (req.body.type) fields.type = req.body.type
    if (req.body.description) fields.description = req.body.description
    if (req.body.income) fields.income = req.body.income
    if (req.body.expenditure) fields.expenditure = req.body.expenditure
    if (req.body.account) fields.account = req.body.account
    if (req.body.remark) fields.remark = req.body.remark

    const sql = `insert into funds set ?`
    db.query(sql, fields, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('添加失败')
        res.json(fields)
    })
}

exports.fundsAll = (req, res) => {
    const sql = `select * from funds order by id desc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('查无数据')
        res.json(results)
    })
}

exports.fundsEdit = (req, res) => {
    const fields = {}
    if (req.body.type) fields.type = req.body.type
    if (req.body.description) fields.description = req.body.description
    if (req.body.income) fields.income = req.body.income
    if (req.body.expenditure) fields.expenditure = req.body.expenditure
    if (req.body.account) fields.account = req.body.account
    if (req.body.remark) fields.remark = req.body.remark

    const sql = `update funds set ? where id = ?`
    db.query(sql, [fields, req.params.id], (err, results) => {
        console.log(req.params.id)
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(fields)
    })
}

exports.fundsDelete = (req, res) => {
    const sql = `delete from funds where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}