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
exports.id = "app/api/location/route";
exports.ids = ["app/api/location/route"];
exports.modules = {

/***/ "(rsc)/./app/api/location/route.ts":
/*!***********************************!*\
  !*** ./app/api/location/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n// app/api/location/route.ts\n\nconst dynamic = 'force-dynamic';\nasync function GET(request) {\n    // Em ambiente de desenvolvimento (localhost), os cabeçalhos da Vercel não existem.\n    // Então, retornamos uma localização padrão para testes.\n    if (true) {\n        console.log(\"Ambiente de desenvolvimento: retornando localização de São Paulo.\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            status: 'success',\n            city: 'São Paulo',\n            country: 'Brazil',\n            region: 'SP',\n            postalCode: '01310-100',\n            lat: -23.5505,\n            lon: -46.6333\n        });\n    }\n    // Em produção na Vercel, lemos os cabeçalhos que a Vercel injeta.\n    try {\n        const city = request.headers.get('x-vercel-ip-city');\n        const country = request.headers.get('x-vercel-ip-country');\n        const region = request.headers.get('x-vercel-ip-country-region');\n        const postalCode = request.headers.get('x-vercel-ip-postal-code');\n        const lat = request.headers.get('x-vercel-ip-latitude');\n        const lon = request.headers.get('x-vercel-ip-longitude');\n        // Verificação de segurança: se os headers principais estiverem faltando, retorna erro.\n        if (!city || !country || !lat || !lon) {\n            console.error(\"Cabeçalhos de geolocalização da Vercel não foram encontrados em produção.\");\n            throw new Error(\"Cabeçalhos da Vercel ausentes.\");\n        }\n        // Retorna os dados da localização lidos diretamente dos cabeçalhos.\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            status: 'success',\n            city,\n            country,\n            region: region || '',\n            postalCode: postalCode || '',\n            lat: parseFloat(lat),\n            lon: parseFloat(lon)\n        });\n    } catch (error) {\n        console.error(\"Erro ao processar cabeçalhos da Vercel:\", error.message);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erro interno ao processar a geolocalização da Vercel.'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvY2F0aW9uL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRCQUE0QjtBQUU0QjtBQUVqRCxNQUFNQyxVQUFVLGdCQUFnQjtBQUVoQyxlQUFlQyxJQUFJQyxPQUFvQjtJQUM1QyxtRkFBbUY7SUFDbkYsd0RBQXdEO0lBQ3hELElBQUlDLElBQXNDLEVBQUU7UUFDMUNDLFFBQVFDLEdBQUcsQ0FBQztRQUNaLE9BQU9OLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFDdkJDLFFBQVE7WUFDUkMsTUFBTTtZQUNOQyxTQUFTO1lBQ1RDLFFBQVE7WUFDUkMsWUFBWTtZQUNaQyxLQUFLLENBQUM7WUFDTkMsS0FBSyxDQUFDO1FBQ1I7SUFDRjtJQUVBLGtFQUFrRTtJQUNsRSxJQUFJO1FBQ0YsTUFBTUwsT0FBT04sUUFBUVksT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDakMsTUFBTU4sVUFBVVAsUUFBUVksT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDcEMsTUFBTUwsU0FBU1IsUUFBUVksT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDbkMsTUFBTUosYUFBYVQsUUFBUVksT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDdkMsTUFBTUgsTUFBTVYsUUFBUVksT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDaEMsTUFBTUYsTUFBTVgsUUFBUVksT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFFaEMsdUZBQXVGO1FBQ3ZGLElBQUksQ0FBQ1AsUUFBUSxDQUFDQyxXQUFXLENBQUNHLE9BQU8sQ0FBQ0MsS0FBSztZQUNyQ1QsUUFBUVksS0FBSyxDQUFDO1lBQ2QsTUFBTSxJQUFJQyxNQUFNO1FBQ2xCO1FBRUEsb0VBQW9FO1FBQ3BFLE9BQU9sQixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQ3ZCQyxRQUFRO1lBQ1JDO1lBQ0FDO1lBQ0FDLFFBQVFBLFVBQVU7WUFDbEJDLFlBQVlBLGNBQWM7WUFDMUJDLEtBQUtNLFdBQVdOO1lBQ2hCQyxLQUFLSyxXQUFXTDtRQUNsQjtJQUVGLEVBQUUsT0FBT0csT0FBWTtRQUNuQlosUUFBUVksS0FBSyxDQUFDLDJDQUEyQ0EsTUFBTUcsT0FBTztRQUN0RSxPQUFPcEIscURBQVlBLENBQUNPLElBQUksQ0FDdEI7WUFBRVUsT0FBTztRQUF3RCxHQUNqRTtZQUFFVCxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXHRpbmRlci16YXAtaW5zdGEtZmluYWxsbGxcXGFwcFxcYXBpXFxsb2NhdGlvblxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwL2FwaS9sb2NhdGlvbi9yb3V0ZS50c1xyXG5cclxuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSAnZm9yY2UtZHluYW1pYyc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgLy8gRW0gYW1iaWVudGUgZGUgZGVzZW52b2x2aW1lbnRvIChsb2NhbGhvc3QpLCBvcyBjYWJlw6dhbGhvcyBkYSBWZXJjZWwgbsOjbyBleGlzdGVtLlxyXG4gIC8vIEVudMOjbywgcmV0b3JuYW1vcyB1bWEgbG9jYWxpemHDp8OjbyBwYWRyw6NvIHBhcmEgdGVzdGVzLlxyXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS5sb2coXCJBbWJpZW50ZSBkZSBkZXNlbnZvbHZpbWVudG86IHJldG9ybmFuZG8gbG9jYWxpemHDp8OjbyBkZSBTw6NvIFBhdWxvLlwiKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxyXG4gICAgICBjaXR5OiAnU8OjbyBQYXVsbycsXHJcbiAgICAgIGNvdW50cnk6ICdCcmF6aWwnLFxyXG4gICAgICByZWdpb246ICdTUCcsXHJcbiAgICAgIHBvc3RhbENvZGU6ICcwMTMxMC0xMDAnLFxyXG4gICAgICBsYXQ6IC0yMy41NTA1LFxyXG4gICAgICBsb246IC00Ni42MzMzLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBFbSBwcm9kdcOnw6NvIG5hIFZlcmNlbCwgbGVtb3Mgb3MgY2FiZcOnYWxob3MgcXVlIGEgVmVyY2VsIGluamV0YS5cclxuICB0cnkge1xyXG4gICAgY29uc3QgY2l0eSA9IHJlcXVlc3QuaGVhZGVycy5nZXQoJ3gtdmVyY2VsLWlwLWNpdHknKTtcclxuICAgIGNvbnN0IGNvdW50cnkgPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KCd4LXZlcmNlbC1pcC1jb3VudHJ5Jyk7XHJcbiAgICBjb25zdCByZWdpb24gPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KCd4LXZlcmNlbC1pcC1jb3VudHJ5LXJlZ2lvbicpO1xyXG4gICAgY29uc3QgcG9zdGFsQ29kZSA9IHJlcXVlc3QuaGVhZGVycy5nZXQoJ3gtdmVyY2VsLWlwLXBvc3RhbC1jb2RlJyk7XHJcbiAgICBjb25zdCBsYXQgPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KCd4LXZlcmNlbC1pcC1sYXRpdHVkZScpO1xyXG4gICAgY29uc3QgbG9uID0gcmVxdWVzdC5oZWFkZXJzLmdldCgneC12ZXJjZWwtaXAtbG9uZ2l0dWRlJyk7XHJcblxyXG4gICAgLy8gVmVyaWZpY2HDp8OjbyBkZSBzZWd1cmFuw6dhOiBzZSBvcyBoZWFkZXJzIHByaW5jaXBhaXMgZXN0aXZlcmVtIGZhbHRhbmRvLCByZXRvcm5hIGVycm8uXHJcbiAgICBpZiAoIWNpdHkgfHwgIWNvdW50cnkgfHwgIWxhdCB8fCAhbG9uKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYWJlw6dhbGhvcyBkZSBnZW9sb2NhbGl6YcOnw6NvIGRhIFZlcmNlbCBuw6NvIGZvcmFtIGVuY29udHJhZG9zIGVtIHByb2R1w6fDo28uXCIpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYWJlw6dhbGhvcyBkYSBWZXJjZWwgYXVzZW50ZXMuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldG9ybmEgb3MgZGFkb3MgZGEgbG9jYWxpemHDp8OjbyBsaWRvcyBkaXJldGFtZW50ZSBkb3MgY2FiZcOnYWxob3MuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcclxuICAgICAgY2l0eSxcclxuICAgICAgY291bnRyeSxcclxuICAgICAgcmVnaW9uOiByZWdpb24gfHwgJycsIC8vIEVzdGFkby9yZWdpw6NvIHBvZGUgc2VyIG51bGwgZW0gYWxndW5zIGNhc29zXHJcbiAgICAgIHBvc3RhbENvZGU6IHBvc3RhbENvZGUgfHwgJycsIC8vIENFUCBwb2RlIHNlciBudWxsIGVtIGFsZ3VucyBjYXNvc1xyXG4gICAgICBsYXQ6IHBhcnNlRmxvYXQobGF0KSxcclxuICAgICAgbG9uOiBwYXJzZUZsb2F0KGxvbiksXHJcbiAgICB9KTtcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm8gYW8gcHJvY2Vzc2FyIGNhYmXDp2FsaG9zIGRhIFZlcmNlbDpcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6ICdFcnJvIGludGVybm8gYW8gcHJvY2Vzc2FyIGEgZ2VvbG9jYWxpemHDp8OjbyBkYSBWZXJjZWwuJyB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkeW5hbWljIiwiR0VUIiwicmVxdWVzdCIsInByb2Nlc3MiLCJjb25zb2xlIiwibG9nIiwianNvbiIsInN0YXR1cyIsImNpdHkiLCJjb3VudHJ5IiwicmVnaW9uIiwicG9zdGFsQ29kZSIsImxhdCIsImxvbiIsImhlYWRlcnMiLCJnZXQiLCJlcnJvciIsIkVycm9yIiwicGFyc2VGbG9hdCIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/location/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocation%2Froute&page=%2Fapi%2Flocation%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocation%2Froute.ts&appDir=C%3A%5Ctinder-zap-insta-finallll%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Ctinder-zap-insta-finallll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocation%2Froute&page=%2Fapi%2Flocation%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocation%2Froute.ts&appDir=C%3A%5Ctinder-zap-insta-finallll%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Ctinder-zap-insta-finallll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_tinder_zap_insta_finallll_app_api_location_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/location/route.ts */ \"(rsc)/./app/api/location/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/location/route\",\n        pathname: \"/api/location\",\n        filename: \"route\",\n        bundlePath: \"app/api/location/route\"\n    },\n    resolvedPagePath: \"C:\\\\tinder-zap-insta-finallll\\\\app\\\\api\\\\location\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_tinder_zap_insta_finallll_app_api_location_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsb2NhdGlvbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbG9jYXRpb24lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsb2NhdGlvbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDdGluZGVyLXphcC1pbnN0YS1maW5hbGxsbCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q3RpbmRlci16YXAtaW5zdGEtZmluYWxsbGwmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1c7QUFDeEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXHRpbmRlci16YXAtaW5zdGEtZmluYWxsbGxcXFxcYXBwXFxcXGFwaVxcXFxsb2NhdGlvblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbG9jYXRpb24vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sb2NhdGlvblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9jYXRpb24vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFx0aW5kZXItemFwLWluc3RhLWZpbmFsbGxsXFxcXGFwcFxcXFxhcGlcXFxcbG9jYXRpb25cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocation%2Froute&page=%2Fapi%2Flocation%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocation%2Froute.ts&appDir=C%3A%5Ctinder-zap-insta-finallll%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Ctinder-zap-insta-finallll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocation%2Froute&page=%2Fapi%2Flocation%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocation%2Froute.ts&appDir=C%3A%5Ctinder-zap-insta-finallll%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Ctinder-zap-insta-finallll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();