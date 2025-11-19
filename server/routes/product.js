const express = require('express');
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        let sql="SELECT * FROM TBL_PRODUCT"
        let [list]=await db.query(sql);
        res.json({
            result:"success",
            list:list
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

router.get("/:productId", async (req, res) => {
    let {productId}=req.params;
    try {
        let sql="SELECT * FROM TBL_PRODUCT WHERE PRODUCTID=?";
        let [list]=await db.query(sql,[productId]);
        res.json({
            result:"success",
            info:list[0]
        })
    } catch (error) {
        console.log("에러 발생!");
    }
})

router.delete("/:productId", async (req, res) => {
    let {productId}=req.params;
    try {
         let sql="DELETE FROM TBL_PRODUCT WHERE PRODUCTID=?";//把view的部分select换成delete即可
        let result=await db.query(sql,[productId]);
        res.json({
            msg:"deleted",
            result:result//把这两行也给换了
        })
        
    } catch (error) {
        console.log("에러 발생!");
    }
})



router.put("/:productId", async (req, res) => {
    let { productId } = req.params;
    let { productName, price } = req.body;
    console.log(req.body);
    console.log(req.params);
    try {
        let sql = "UPDATE TBL_PRODUCT SET "
                + "PRODUCTNAME = ?, "
                + "PRICE= ?,"
                + "WHERE PRODUCTID = ? "
        let result = await db.query(sql, [productName, price, productId]);
        // console.log("result ==> ", result);
        res.json({
            result: result,
            msg: "edited",
        });
    } catch (error) {
        console.log("에러발생!");
    }
})


router.post('/', async (req, res) => {

    let { productName, price } = req.body
    // console.log(req.body);
    console.log(productName, price);
    try {
        let sql = "INSERT INTO TBL_PRODUCT"
                 +"(PRODUCTNAME, PRICE, category, cdatetime , UDATETIME) "
                 +"VALUES(?, ?, NULL, NOW(), NOW())";
        console.log(sql);
        let result = await db.query(sql, [productName, price]);

        res.json({
            result: result,
            msg: "success",
        });
    } catch (error) {
        console.log("에러발생!");
    }
})


module.exports = router;