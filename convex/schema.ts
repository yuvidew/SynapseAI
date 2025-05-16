import {v} from "convex/values";
import {defineSchema , defineTable} from "convex/server";

export default defineSchema({
    document : defineTable({
        context : v.string(),
        type : v.string(),
        format : v.string(),
        result : v.array(v.object({
            title : v.string(),
            content : v.string(),
        })),
        isFavorites : v.boolean(),
        isTrash : v.boolean(),
    })
    .searchIndex("search_title" , {
        searchField : "context"
    })
})