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
const ontologyAPI_1 = require("./ontologyAPI");
function getBasicCard(s) {
    return {
        component: 'BasicCard',
        data: {
            id: s.id,
            title: s.name,
            thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Deus_Coffee.png',
            textLink: '...',
            linkUrl: 'http://example.com/link',
        },
    };
}
function recommendedForYouItems(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(args.userid);
        console.log(args.topk);
        console.log(args.contextFilter);
        yield (0, ontologyAPI_1.calculateRatings)(args.contextFilter);
        return (yield (0, ontologyAPI_1.getSubservicesRecommendation)(args.userid, args.topk)).map(x => getBasicCard(x));
    });
}
exports.default = {
    ICard: {
        __resolveType(obj) {
            return obj.component;
        },
    },
    Query: {
        recommendedForYouItems
    },
};
//# sourceMappingURL=resolvers.js.map