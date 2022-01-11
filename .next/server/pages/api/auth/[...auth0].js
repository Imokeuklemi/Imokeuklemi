"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...auth0]";
exports.ids = ["pages/api/auth/[...auth0]"];
exports.modules = {

/***/ "@auth0/nextjs-auth0":
/*!**************************************!*\
  !*** external "@auth0/nextjs-auth0" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "./pages/api/auth/[...auth0].jsx":
/*!***************************************!*\
  !*** ./pages/api/auth/[...auth0].jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ \"@auth0/nextjs-auth0\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.handleAuth)()); // import { handleAuth, handleCallback } from \"@auth0/nextjs-auth0\";\n // import { UserProvider } from \"@auth0/nextjs-auth0\";\n // //export default handleAuth();\n // import { createUser } from \"../../../utils/db\";\n // import { PrismaClient } from \"@prisma/client\";\n // const afterCallback = async (req, res, session, state) => {\n //   const prisma = new PrismaClient({\n //     log: [\n //       {\n //         emit: \"event\",\n //         level: \"query\",\n //       },\n //     ],\n //   });\n //     const getUser = await prisma.users.findUnique({\n //       where: {\n //         email: session.user.email,\n //       },\n //     });\n //    try {\n //      if (getUser === null) {\n //        const dbUser = await createUser(session.user);\n //        return { session,  localStorage.setItem(\"user_id\", dbUser.id) };\n //      } else {\n //        return { session, getUser.id };\n //      }\n //    } catch (err) {\n //      console.log(err);\n //    }\n // };\n // export default handleAuth({\n //   async callback(req, res) {\n //     try {\n //       await handleCallback(req, res, { afterCallback });\n //       console.log(session);\n //     } catch (error) {\n //       res.status(error.status || 500).end(error.message);\n //     }\n //   },\n // });\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXV0aC9bLi4uYXV0aDBdLmpzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0Q7QUFDaEQsaUVBQWVBLCtEQUFVLEVBQUUsRUFDM0IsQ0FBb0U7QUFDcEUsQ0FBc0Q7QUFDdEQsQ0FBaUM7QUFDakMsQ0FBa0Q7QUFDbEQsQ0FBaUQ7QUFFakQsQ0FBOEQ7QUFDOUQsQ0FBc0M7QUFDdEMsQ0FBYTtBQUNiLENBQVU7QUFDVixDQUF5QjtBQUN6QixDQUEwQjtBQUMxQixDQUFXO0FBQ1gsQ0FBUztBQUNULENBQVE7QUFFUixDQUFzRDtBQUN0RCxDQUFpQjtBQUNqQixDQUFxQztBQUNyQyxDQUFXO0FBQ1gsQ0FBVTtBQUNWLENBQVc7QUFDWCxDQUErQjtBQUMvQixDQUF3RDtBQUN4RCxDQUEwRTtBQUMxRSxDQUFnQjtBQUNoQixDQUF5QztBQUN6QyxDQUFTO0FBQ1QsQ0FBcUI7QUFDckIsQ0FBeUI7QUFDekIsQ0FBTztBQUVQLENBQUs7QUFFTCxDQUE4QjtBQUM5QixDQUErQjtBQUMvQixDQUFZO0FBQ1osQ0FBMkQ7QUFDM0QsQ0FBOEI7QUFDOUIsQ0FBd0I7QUFDeEIsQ0FBNEQ7QUFDNUQsQ0FBUTtBQUNSLENBQU87QUFDUCxDQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktYXBwLy4vcGFnZXMvYXBpL2F1dGgvWy4uLmF1dGgwXS5qc3g/Yzk1NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVBdXRoIH0gZnJvbSBcIkBhdXRoMC9uZXh0anMtYXV0aDBcIjtcclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQXV0aCgpO1xyXG4vLyBpbXBvcnQgeyBoYW5kbGVBdXRoLCBoYW5kbGVDYWxsYmFjayB9IGZyb20gXCJAYXV0aDAvbmV4dGpzLWF1dGgwXCI7XHJcbi8vIGltcG9ydCB7IFVzZXJQcm92aWRlciB9IGZyb20gXCJAYXV0aDAvbmV4dGpzLWF1dGgwXCI7XHJcbi8vIC8vZXhwb3J0IGRlZmF1bHQgaGFuZGxlQXV0aCgpO1xyXG4vLyBpbXBvcnQgeyBjcmVhdGVVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RiXCI7XHJcbi8vIGltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuLy8gY29uc3QgYWZ0ZXJDYWxsYmFjayA9IGFzeW5jIChyZXEsIHJlcywgc2Vzc2lvbiwgc3RhdGUpID0+IHtcclxuLy8gICBjb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KHtcclxuLy8gICAgIGxvZzogW1xyXG4vLyAgICAgICB7XHJcbi8vICAgICAgICAgZW1pdDogXCJldmVudFwiLFxyXG4vLyAgICAgICAgIGxldmVsOiBcInF1ZXJ5XCIsXHJcbi8vICAgICAgIH0sXHJcbi8vICAgICBdLFxyXG4vLyAgIH0pO1xyXG5cclxuLy8gICAgIGNvbnN0IGdldFVzZXIgPSBhd2FpdCBwcmlzbWEudXNlcnMuZmluZFVuaXF1ZSh7XHJcbi8vICAgICAgIHdoZXJlOiB7XHJcbi8vICAgICAgICAgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCxcclxuLy8gICAgICAgfSxcclxuLy8gICAgIH0pO1xyXG4vLyAgICB0cnkge1xyXG4vLyAgICAgIGlmIChnZXRVc2VyID09PSBudWxsKSB7XHJcbi8vICAgICAgICBjb25zdCBkYlVzZXIgPSBhd2FpdCBjcmVhdGVVc2VyKHNlc3Npb24udXNlcik7XHJcbi8vICAgICAgICByZXR1cm4geyBzZXNzaW9uLCAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX2lkXCIsIGRiVXNlci5pZCkgfTtcclxuLy8gICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgcmV0dXJuIHsgc2Vzc2lvbiwgZ2V0VXNlci5pZCB9O1xyXG4vLyAgICAgIH1cclxuLy8gICAgfSBjYXRjaCAoZXJyKSB7XHJcbi8vICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuLy8gICAgfVxyXG5cclxuLy8gfTtcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGhhbmRsZUF1dGgoe1xyXG4vLyAgIGFzeW5jIGNhbGxiYWNrKHJlcSwgcmVzKSB7XHJcbi8vICAgICB0cnkge1xyXG4vLyAgICAgICBhd2FpdCBoYW5kbGVDYWxsYmFjayhyZXEsIHJlcywgeyBhZnRlckNhbGxiYWNrIH0pO1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uKTtcclxuLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbi8vICAgICAgIHJlcy5zdGF0dXMoZXJyb3Iuc3RhdHVzIHx8IDUwMCkuZW5kKGVycm9yLm1lc3NhZ2UpO1xyXG4vLyAgICAgfVxyXG4vLyAgIH0sXHJcbi8vIH0pO1xyXG4iXSwibmFtZXMiOlsiaGFuZGxlQXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/auth/[...auth0].jsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/auth/[...auth0].jsx"));
module.exports = __webpack_exports__;

})();