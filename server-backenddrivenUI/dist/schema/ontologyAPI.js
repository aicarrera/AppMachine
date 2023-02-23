"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextElement = exports.getSubservicesRecommendation = exports.calculateRatings = void 0;
const _GRAPHDBSERVER = "http://localhost:7200/";
const _API_URL = 'http://localhost:8080/APIContextInteraction/api/headers/';
const fetch = require('node-fetch');
function calculateRatings(cf) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fetch(_API_URL + 'calculateRatings?isExclusive=' + false, { method: 'POST',
                headers: { "Accept": "application/json",
                    "Content-Type": "application/json",
                    "GRAPHDB_SERVER": _GRAPHDBSERVER },
                body: JSON.stringify(cf) })
                .then((response) => response.json());
        }
        catch (error) {
            console.log("calculateRatings()");
            console.log(error);
            return error;
        }
    });
}
exports.calculateRatings = calculateRatings;
function getSubservicesRecommendation(userid, topk) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fetch(_API_URL + 'getServiceRecommendations?userid=' + userid + "&topk=" + topk, { method: 'GET',
                headers: { "Accept": "application/json",
                    "Content-Type": "application/json",
                    "GRAPHDB_SERVER": _GRAPHDBSERVER } })
                .then((response) => response.json())
                .then((data) => data);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.getSubservicesRecommendation = getSubservicesRecommendation;
function getNextElement(cf, elementUI) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fetch(_API_URL + 'predictNextStepBasedonContext?isExclusive=' + false + "&elementUI=" + elementUI, { method: 'POST',
                headers: { "Accept": "application/json",
                    "Content-Type": "application/json",
                    "GRAPHDB_SERVER": _GRAPHDBSERVER },
                body: JSON.stringify(cf) })
                .then((response) => response.json());
        }
        catch (error) {
            console.log("calculateRatings()");
            console.log(error);
            return error;
        }
    });
}
exports.getNextElement = getNextElement;
//# sourceMappingURL=ontologyAPI.js.map