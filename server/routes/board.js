const express = require('express');
const router = express.Router();
const db = require("../db");


router.get("/:flgPop", async (req, res) => {
    let { flgPop } = req.params; // 这里拿到的是路径上的参数
    try {
        let sql = "SELECT * FROM TBL_BOARD B INNER JOIN TBL_USER U ON U.USERID=B.USERID";
        if (req.params.flgPop === "true") {       
            sql += " WHERE CNT >= 20"; 
        }
        let [list] = await db.query(sql);
        res.json({
            result: "success",
            list: list
        });
    } catch (error) {
        console.log("에러 발생!", error);
    }
});


router.get("/:boardNo", async (req, res) => {
    let { boardNo } = req.params;
    try {
        let sql = "SELECT * FROM TBL_BOARD B INNER JOIN TBL_USER U ON U.USERID=B.USERID WHERE BOARDNO=?";
        let [list] = await db.query(sql, [boardNo]);
        res.json({
            result: "success",
            board: list[0]
        })
    } catch (error) {
        console.log("에러 발생!");
    }
})

router.delete("/:boardNo", async (req, res) => {
    let { boardNo } = req.params;
    try {
        let sql = "DELETE FROM TBL_BOARD WHERE BOARDNO=?";//把view的部分select换成delete即可
        let result = await db.query(sql, [boardNo]);
        res.json({
            msg: "deleted",
            result: result//把这两行也给换了
        })

    } catch (error) {
        console.log("에러 발생!");
    }
})

router.post("/", async (req, res) => {
    let { title, contents } = req.body
    // console.log(req.body);
    try {
        let sql = "INSERT INTO TBL_BOARD "
            + "(TITLE, CONTENTS, USERID, CNT , CDATETIME, UDATETIME) "
            + "VALUES(?, ?, 'user001', 0, NOW(), NOW())";
        console.log(sql);
        let result = await db.query(sql, [title, contents]);

        res.json({
            result: result,
            msg: "success",
        });
    } catch (error) {
        console.log("에러발생!");
    }
})

router.put("/:boardNo", async (req, res) => {
    let { boardNo } = req.params;
    let { title, contents } = req.body;
    console.log(req.body);
    console.log(req.params);
    try {
        let sql = "UPDATE TBL_BOARD SET "
            + "TITLE = ?, "
            + "CONTENTS= ?, "
            + "UDATETIME=NOW() "
            + "WHERE BOARDNO = ? "
        let result = await db.query(sql, [title, contents, boardNo]);
        // console.log("result ==> ", result);
        res.json({
            result: result,
            msg: "edited",
        });
    } catch (error) {
        console.log("에러발생!");
    }
})


router.put("/cnt/:boardNo", async (req, res) => {
    let { boardNo } = req.params;
    console.log(req.params);
    try {
        let sql = "UPDATE TBL_BOARD SET "
            + "CNT= CNT+1 "
            + "WHERE BOARDNO = ? "
        let result = await db.query(sql, [boardNo]);
        // console.log("result ==> ", result);
        res.json({
            result: result,
            msg: "edited",
        });
    } catch (error) {
        console.log("에러발생!");
    }
})

module.exports = router;