"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunosController = require('../controllers/AlunosController'); var _AlunosController2 = _interopRequireDefault(_AlunosController);
var _Token = require('../middlewares/Token'); var _Token2 = _interopRequireDefault(_Token);

const router = new (0, _express.Router)();

router.get("/", _AlunosController2.default.index);
router.get("/:id", _AlunosController2.default.show);
router.post("/", _Token2.default, _AlunosController2.default.store);
router.put("/:id", _Token2.default, _AlunosController2.default.update);
router.delete("/:id", _Token2.default, _AlunosController2.default.delete);

exports. default = router;
