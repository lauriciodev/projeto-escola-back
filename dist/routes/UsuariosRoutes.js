"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UsuariosController = require('../controllers/UsuariosController'); var _UsuariosController2 = _interopRequireDefault(_UsuariosController);
var _Token = require('../middlewares/Token'); var _Token2 = _interopRequireDefault(_Token);

const router = new (0, _express.Router)();

router.post("/", _UsuariosController2.default.store);
// router.get("/", Token, UsuariosController.index);
router.get("/:id", _Token2.default, _UsuariosController2.default.show);
router.put("/", _Token2.default, _UsuariosController2.default.update);
router.delete("/", _Token2.default, _UsuariosController2.default.delete);

exports. default = router;
