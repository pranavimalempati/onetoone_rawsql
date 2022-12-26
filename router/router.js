const Service = require("../controller/controller");

const router = require("express").Router();

router.post("/insert", Service.add);
router.put("/updateemp", Service.updateemp);
router.put("/updatedept", Service.updatedept);
router.delete("/deletedept/:dept_id", Service.deletedept);
router.delete("/deleteemp/:emp_id", Service.deleteemp);
router.get("/findid/:dept_id", Service.findBydeptId);
router.get("/find", Service.findAll);





module.exports = router;