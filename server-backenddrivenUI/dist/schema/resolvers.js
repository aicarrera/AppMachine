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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const _GRAPHDBSERVER = "http://localhost:7200/";
function getSubservicesRecommendationCD() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield (0, node_fetch_1.default)('http://localhost:8080/APIContextInteraction/api/headers/getSubserviceRecommendationCosineDist?userid=FmxgvxmU', { method: 'GET',
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
function getBasicCard() {
    return {
        component: 'BasicCard',
        data: {
            title: 'Titulo',
            thumbnailUrl: 'https://via.placeholder.com/150',
            textLink: 'ver mas',
            linkUrl: 'http://example.com/link',
        },
    };
}
function featuredItems() {
    return [
        getBasicCard(),
        getBasicCard(),
        getBasicCard(),
    ];
}
function recommendedForYouItems() {
    return __awaiter(this, void 0, void 0, function* () {
        (yield getSubservicesRecommendationCD()).forEach(element => {
            console.log(element);
        });
        return [getBasicCard(), getBasicCard(), getBasicCard(), getBasicCard()];
    });
}
exports.default = {
    ICard: {
        __resolveType(obj) {
            return obj.component;
        },
    },
    Query: {
        featuredItems,
        recommendedForYouItems,
    },
};
//# sourceMappingURL=resolvers.js.map